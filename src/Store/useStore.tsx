import React, { useContext, createContext, useReducer, useEffect } from "react";
import { useLocation } from "react-router-dom";

type ContextObject = {
  children: React.ReactNode;
  state: State;
  dispatch: React.Dispatch<CounterAction>;
};

const StoreContext = createContext<ContextObject | null>(null);

interface State {
  groups: any;
  selectedIndex: number | null;
  champions: string[] | null;
}

type CounterAction =
  | { type: "SET_CHAMPIONS"; payload: string[] }
  | { type: "SET_GROUPS"; payload: any }
  | { type: "SET_GROUP"; payload: any };

const initialState: State = {
  groups: {},
  selectedIndex: null,
  champions: null,
};

const reducer = (state: State, action: CounterAction) => {
  if (action.type === "SET_CHAMPIONS") {
    return {
      ...state,
      champions: action.payload,
    };
  }
  if (action.type === "SET_GROUPS") {
    return {
      ...state,
      groups: action.payload,
    };
  }
  if (action.type === "SET_GROUP") {
    if (action.payload.groups) {
      const newGroups = {
        groups: [{ name: "New Group" }],
      };

      localStorage.setItem("heros-shuffle-app", JSON.stringify(newGroups));

      return {
        ...state,
        selectedIndex: 0,
        groups: { groups: [{ name: "New Group" }] },
      };
    }
  }
  return state;
};

interface ProviderProps {
  children: React.ReactNode;
}

export const StoreProvider = ({
  children,
}: ProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const location = useLocation();

  useEffect(() => {
    const func = async () => {
      const fetched = await fetch(
        "https://ddragon.leagueoflegends.com/cdn/13.22.1/data/en_US/champion.json"
      );
      const json = await fetched.json();
      const data = json.data;
      const champions = Object.keys(data);
      dispatch({ type: "SET_CHAMPIONS", payload: champions });
    };
    func();
  }, []);

  useEffect(() => {
    const storage = localStorage.getItem("heros-shuffle-app");
    dispatch({
      type: "SET_GROUPS",
      payload: storage ? JSON.parse(storage) : {},
    });
  }, [location.pathname]);

  return (
    <StoreContext.Provider value={{ children, state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const object = useContext(StoreContext);
  if (!object) {
    throw new Error("useStore must be used within a Provider");
  }
  return object;
};
