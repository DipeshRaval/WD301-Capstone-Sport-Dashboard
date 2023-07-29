import React, { createContext, useContext, useReducer } from "react";

import { reducer, initialState, NewsState, NewsActions } from "./reducer";
const NewsStateContext = createContext<NewsState | undefined>(undefined);

type NewsDispatch = React.Dispatch<NewsActions>;
const NewsDispatchContext = createContext<NewsDispatch | undefined>(undefined);

export const NewsProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <NewsStateContext.Provider value={state}>
      <NewsDispatchContext.Provider value={dispatch}>
        {children}
      </NewsDispatchContext.Provider>
    </NewsStateContext.Provider>
  );
};

export const useNewsState = () => useContext(NewsStateContext);

export const useNewsDispatch = () => useContext(NewsDispatchContext);
