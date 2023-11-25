/* eslint-disable react/prop-types */
import React, { useContext, createContext, useReducer } from "react";

type ContextObject = {
  children: React.ReactNode;
  state: State;
  dispatch: React.Dispatch<CounterAction>;
};

const TeamsContext = createContext<ContextObject | null>(null);

interface State {
  name: string | null;
  champCount: number | null;
  teamCount1: number | null;
  teamCount2: number | null;
  team1: string[] | null;
  team2: string[] | null;
  names: string[] | null;
}

type CounterAction = { type: "SET_NAME"; payload: string };

const initialState = {
  name: null,
  champCount: null,
  teamCount1: null,
  teamCount2: null,
  team1: null,
  team2: null,
  names: null,
};

const reducer = (state: State, action: CounterAction) => {
  if (action.type === "SET_NAME") {
    return {
      ...state,
      name: action.payload,
    };
  }
  return state;
};

export const useTeams = () => useContext(TeamsContext);

interface ProviderProps {
  children: React.ReactNode;
}

export const TeamsProvider: React.FC<ProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <TeamsContext.Provider value={{ children, state, dispatch }}>
      {children}
    </TeamsContext.Provider>
  );
};
