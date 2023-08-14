import React, { createContext, useContext, useReducer } from "react";

import { reducer, initialState, UserState, UserActions } from "./reducer";
const UserStateContext = createContext<UserState | undefined>(undefined);

type UserDispatch = React.Dispatch<UserActions>;
const UserDispatchContext = createContext<UserDispatch | undefined>(undefined);

export const UserProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
};

export const useUserState = () => useContext(UserStateContext);

export const useUserDispatch = () => useContext(UserDispatchContext);
