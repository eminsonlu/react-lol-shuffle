import React, { useContext, createContext, useReducer, useEffect } from "react";
import { useLocation } from "react-router-dom";

type ContextObject = {
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
  | { type: "SET_GROUP"; payload: any }
  | { type: "SET_TEAM_COUNT"; payload: any }
  | { type: "SET_NAMES"; payload: any }
  | { type: "SET_NAME_POINT"; payload: any }
  | { type: "SET_BANNED"; payload: any }
  | { type: "CHANGE_GROUP_NAME"; payload: any }
  | { type: "SET_CHAMP_COUNT"; payload: any }

const initialState: State = {
  groups: null,
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
      groups: action.payload ? action.payload.groups : null,
      selectedIndex: action.payload ? action.payload.selectedIndex : null,
    };
  }
  if (action.type === "SET_GROUP") {
    if (action.payload.groups) {
      const group = [
        {
          name: "New Group",
          teams: {
            counts: [1, 1],
            champs: [[], []],
            names: [[], []],
          },
          banned: [],
          history: [],
          champCount: 0,
          names: Array.from(Array(10)).map(() => ({
            id: crypto.randomUUID(),
            name: "",
            point: 0,
          })),
        },
      ];

      const newGroups = {
        groups: group,
        selectedIndex: 0,
      };

      localStorage.setItem("heros-shuffle-app", JSON.stringify(newGroups));

      return {
        ...state,
        selectedIndex: 0,
        groups: group,
      };
    } else {
      return {
        ...state,
        selectedIndex: action.payload.index,
      };
    }
  }
  if (action.type === "SET_TEAM_COUNT") {
    const newGroups = state.groups;
    newGroups[action.payload.index].teams.counts[action.payload.team] =
      action.payload.count;
    localStorage.setItem(
      "heros-shuffle-app",
      JSON.stringify({ selectedIndex: state.selectedIndex, groups: newGroups })
    );
    return {
      ...state,
      groups: newGroups,
    };
  }
  if (action.type === "SET_NAMES") {
    const newGroups = state.groups;
    newGroups[action.payload.index].names[
      action.payload.team === 0
        ? action.payload.nameIndex
        : action.payload.nameIndex + 5
    ].name = action.payload.name;
    localStorage.setItem(
      "heros-shuffle-app",
      JSON.stringify({ selectedIndex: state.selectedIndex, groups: newGroups })
    );
    return {
      ...state,
      groups: newGroups,
    };
  }
  if (action.type === "SET_NAME_POINT") {
    const newGroups = state.groups;
    newGroups[action.payload.index].names[
      action.payload.team === 0
        ? action.payload.nameIndex
        : action.payload.nameIndex + 5
    ].point = action.payload.point;
    localStorage.setItem(
      "heros-shuffle-app",
      JSON.stringify({ selectedIndex: state.selectedIndex, groups: newGroups })
    );
    return {
      ...state,
      groups: newGroups,
    };
  }
  if (action.type === "SET_BANNED") {
    const newGroups = state.groups;
    newGroups[action.payload.index].banned = action.payload.banned;
    localStorage.setItem(
      "heros-shuffle-app",
      JSON.stringify({ selectedIndex: state.selectedIndex, groups: newGroups })
    );
    return {
      ...state,
      groups: newGroups,
    };
  }
  if (action.type === "CHANGE_GROUP_NAME") {
    const newGroups = state.groups;
    newGroups[action.payload.index].name = action.payload.name;
    localStorage.setItem(
      "heros-shuffle-app",
      JSON.stringify({ selectedIndex: state.selectedIndex, groups: newGroups })
    );
    return {
      ...state,
      groups: newGroups,
    };
  }
  if (action.type === "SET_CHAMP_COUNT") {
    const newGroups = state.groups;
    newGroups[action.payload.index].champCount = action.payload.count;
    localStorage.setItem(
      "heros-shuffle-app",
      JSON.stringify({ selectedIndex: state.selectedIndex, groups: newGroups })
    );
    return {
      ...state,
      groups: newGroups,
    };
  }
  return state;
};

interface ProviderProps {
  children: React.ReactNode;
}

export const StoreProvider = ({ children }: ProviderProps) => {
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
      payload: storage ? JSON.parse(storage) : null,
    });
  }, [location.pathname]);

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
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
