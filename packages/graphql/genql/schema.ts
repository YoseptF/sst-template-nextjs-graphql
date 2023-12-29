// @ts-nocheck
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type Scalars = {
    String: string,
    ID: string,
    Boolean: boolean,
}

export interface Billboard {
    createdAt: Scalars['String']
    deletedAt: (Scalars['String'] | null)
    description: Scalars['String']
    id: Scalars['ID']
    title: Scalars['String']
    updatedAt: (Scalars['String'] | null)
    userId: Scalars['ID']
    __typename: 'Billboard'
}

export interface Mutation {
    createBillboard: Billboard
    __typename: 'Mutation'
}

export interface Query {
    billboard: Billboard
    billboards: Billboard[]
    __typename: 'Query'
}

export interface BillboardGenqlSelection{
    createdAt?: boolean | number
    deletedAt?: boolean | number
    description?: boolean | number
    id?: boolean | number
    title?: boolean | number
    updatedAt?: boolean | number
    userId?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface MutationGenqlSelection{
    createBillboard?: (BillboardGenqlSelection & { __args: {description: Scalars['String'], title: Scalars['String'], userID: Scalars['String']} })
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface QueryGenqlSelection{
    billboard?: (BillboardGenqlSelection & { __args: {billboardID: Scalars['String']} })
    billboards?: BillboardGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}


    const Billboard_possibleTypes: string[] = ['Billboard']
    export const isBillboard = (obj?: { __typename?: any } | null): obj is Billboard => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isBillboard"')
      return Billboard_possibleTypes.includes(obj.__typename)
    }
    


    const Mutation_possibleTypes: string[] = ['Mutation']
    export const isMutation = (obj?: { __typename?: any } | null): obj is Mutation => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isMutation"')
      return Mutation_possibleTypes.includes(obj.__typename)
    }
    


    const Query_possibleTypes: string[] = ['Query']
    export const isQuery = (obj?: { __typename?: any } | null): obj is Query => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isQuery"')
      return Query_possibleTypes.includes(obj.__typename)
    }
    