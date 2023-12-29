import {
  useQuery,
  useClient,
  createRequest,
  RequestPolicy,
  OperationResult,
  UseMutationState,
  OperationContext,
  UseMutationResponse,
} from "urql";
import { useEffect, useState, useCallback, useRef } from "react";
import {
  QueryResult,
  MutationResult,
  generateQueryOp,
  generateMutationOp,
  QueryGenqlSelection,
  MutationGenqlSelection,
  BillboardGenqlSelection,
} from "./genql";
import { pipe, toPromise } from "wonka";



type PossibleQueries = Omit<QueryGenqlSelection, '__typename' | '__scalar'>;
type QueryNames = keyof PossibleQueries;

type QueryVariables<T> = T extends { __args: infer A } ? A : undefined;
type QuerySelector<T extends QueryNames> = NonNullable<PossibleQueries[T]>
type QuerySelection<T extends QueryNames> = Omit<NonNullable<PossibleQueries[T]>, '__scalar' | '__args' | '__typename'>

export const useTypedQuery = <QueryName extends QueryNames, Query extends QueryGenqlSelection>(
  queryName: QueryName,
  opts?: {
    variables?: QueryVariables<QuerySelector<QueryName>>;
    selection?: QuerySelection<QueryNames>;
    lazy?: boolean;
    requestPolicy?: RequestPolicy;
    context?: Partial<OperationContext>;
  }
) => {
  const client = useClient();
  const [pause, setPause] = useState(opts?.lazy);

  let q = {
    [queryName]: {
      ...(opts?.variables ? { __args: opts.variables } : {}),
      ...opts?.selection,
    },
  } as QueryGenqlSelection;

  const { query, variables } = generateQueryOp(q);
  const [data] = useQuery<QueryResult<Query>>({
    ...opts,
    query,
    variables,
    pause,
  });


  const executeQuery = async ({
    variables,
    context
  }: {
    variables?: QueryVariables<QuerySelector<QueryName>>;
    context?: Partial<OperationContext>;
  } | undefined = {}): Promise<OperationResult<QueryResult<Query>, QueryVariables<QuerySelector<QueryName>>>> => {
    setPause(false);
    q = {
      [queryName]: {
        ...((variables || opts?.variables) ? { __args: (variables || opts?.variables) } : {}),
        ...opts?.selection,
      },
    } as QueryGenqlSelection;

    const { query, variables: v } = generateQueryOp(q);

    const result = await pipe(
      client.executeQuery<QueryResult<Query>, QueryVariables<QuerySelector<QueryName>>>(
        createRequest(query, v as QueryVariables<QuerySelector<QueryName>>),
        { ...opts, ...context }
      ),
      toPromise
    );

    return result;

  }

  return [data, executeQuery] as const;
}

const initialState = {
  stale: false,
  fetching: false,
  data: undefined,
  error: undefined,
  operation: undefined,
  extensions: undefined,
};

type PossibleMutations = Omit<MutationGenqlSelection, '__typename' | '__scalar'>;
type MutationNames = keyof PossibleMutations;

type MutationArgs<T extends MutationNames> = NonNullable<PossibleMutations[T]>['__args'];
type MutationSelection<T extends MutationNames> = Omit<NonNullable<PossibleMutations[T]>, '__scalar' | '__args' | '__typename'>

export const useTypedMutation = <T extends MutationNames>(
  mutationName: T,
  opts: {
    variables: MutationArgs<T>,
    selection: MutationSelection<T>,
    context?: Partial<OperationContext>,
  }
) => {
  const client = useClient();
  const isMounted = useRef(true);

  let mutation = {
    [mutationName]: {
      __args: opts.variables,
      ...opts.selection,
    },
  } as MutationGenqlSelection;

  type Data = MutationResult<typeof mutation>;
  type Variables = typeof opts.variables;

  const [state, setState] =
    useState<UseMutationState<Data, Variables>>(initialState);

  const executeMutation = useCallback(
    async ({
      variables,
      context
    }: {
      variables?: Variables,
      context?: Partial<OperationContext>
    } | undefined = {}): Promise<OperationResult<Data, Variables>> => {

      mutation = {
        [mutationName]: {
          __args: variables || opts.variables,
          ...opts.selection,
        },
      } as MutationGenqlSelection;

      setState({ ...initialState, fetching: true });

      const { query, variables: v } = generateMutationOp(mutation);

      const result = await pipe(
        client.executeMutation<Data, Variables>(
          createRequest(query, v as Variables),
          { ...opts, ...context }
        ),
        toPromise
      );

      if (isMounted.current) {
        setState({
          fetching: false,
          stale: !!result.stale,
          data: result.data,
          error: result.error,
          extensions: result.extensions,
          operation: result.operation,
        });
      }
      return result;

    },
    [state, setState]
  );

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  return [state, executeMutation] as const;
}
