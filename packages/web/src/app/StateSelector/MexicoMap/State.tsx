import { FC } from "react";
import MexicanStates from "./mexicanStates";

interface StateProps {
  state: keyof typeof MexicanStates;
  id?: string;
  onClick?: (state: keyof typeof MexicanStates) => void;
}

const State: FC<StateProps> = ({ state, id, onClick }) => {
  const statePath = MexicanStates[state];
  return (
    <>
      {statePath instanceof Array
        ? (
          statePath.map(({ d, id: stateId, name }, index) => (
            <path
              key={`state-${state}-${index}-${id}-${stateId}`}
              d={d}
              id={stateId}
              name={name}
              onClick={() => onClick && onClick(state)}
            />
          )
          )
        )
        : (
          <path
            key={`state-${state}-${id}`}
            d={statePath.d}
            id={statePath.id}
            name={statePath.name}
            onClick={() => onClick && onClick(state)}
          />
        )}
    </>
  )
}

export default State;