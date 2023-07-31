import React, { createContext, useContext, useReducer } from "react";

import { reducer, initialState, TeamState, TeamActions } from "./reducer";
const TeamStateContext = createContext<TeamState | undefined>(undefined);

type TeamDispatch = React.Dispatch<TeamActions>;
const TeamDispatchContext = createContext<TeamDispatch | undefined>(undefined);

export const TeamProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <TeamStateContext.Provider value={state}>
      <TeamDispatchContext.Provider value={dispatch}>
        {children}
      </TeamDispatchContext.Provider>
    </TeamStateContext.Provider>
  );
};

export const useTeamState = () => useContext(TeamStateContext);

export const useTeamDispatch = () => useContext(TeamDispatchContext);
