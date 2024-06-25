import React, { useContext, createContext, useReducer, useEffect } from "react";
import { GroupType } from "../Types";
// import { useLocation } from "react-router-dom";

type ContextObject = {
  state: State;
  dispatch: React.Dispatch<CounterAction>;
};

const StoreContext = createContext<ContextObject | null>(null);

interface State {
  groups: GroupType[] | null;
  selectedIndex: number | null;
  lolchampions: string[] | null;
  mods: number;
  valchampinos: { id: string; name: string }[] | null;
  valmaps: { id: string; name: string; imgUrl: string }[] | null;
}

type CounterAction =
  | { type: "SET_CHAMPIONS"; payload: any }
  | { type: "SET_GROUPS"; payload: any }
  | { type: "SET_GROUP"; payload: any }
  | { type: "SET_TEAM_COUNT"; payload: any }
  | { type: "SET_NAMES"; payload: any }
  | { type: "SET_NAME_POINT"; payload: any }
  | { type: "SET_BANNED"; payload: any }
  | { type: "CHANGE_GROUP_NAME"; payload: any }
  | { type: "SET_CHAMP_COUNT"; payload: any }
  | { type: "SET_TEAMS"; payload: any }
  | { type: "DELETE_GROUP"; payload: any }
  | { type: "SET_MODS"; payload: any }
  | { type: "SET_BANNED_MAPS_VALORANT"; payload: any }
  | { type: "SET_MAIN_MODS"; payload: number };

const initialState: State = {
  groups: null,
  selectedIndex: null,
  lolchampions: null,
  mods: 0,
  valchampinos: null,
  valmaps: null,
};

const reducer = (state: State, action: CounterAction) => {
  if (action.type === "SET_CHAMPIONS") {
    return {
      ...state,
      lolchampions: action.payload.lol,
      valchampinos: action.payload.val,
      valmaps: action.payload.maps,
    };
  }
  if (action.type === "SET_GROUPS") {
    return {
      ...state,
      groups: action.payload ? action.payload : null,
      selectedIndex: null,
    };
  }
  if (action.type === "SET_GROUP") {
    if (action.payload.groups) {
      let oldGroupsCon: string | null =
        localStorage.getItem("heros-shuffle-app");
      let oldGroups: any[] = oldGroupsCon ? JSON.parse(oldGroupsCon) : [];
      const group = {
        name: "New Group",
        teams: {
          counts: [1, 1],
          champs: [[], []],
          names: [[], []],
        },
        mods: 0,
        bannedMapsValorant: [],
        banned: [],
        history: [],
        champCount: 0,
        names: Array.from(Array(10)).map(() => ({
          id: crypto.randomUUID(),
          name: "",
          point: 0,
        })),
      };
      oldGroups.push(group);
      return {
        ...state,
        selectedIndex: oldGroups.length - 1,
        groups: oldGroups,
      };
    } else {
      return {
        ...state,
        selectedIndex: action.payload.index,
        mods: state.groups ? state.groups[action.payload.index].mods : 0,
      };
    }
  }
  if (action.type === "SET_TEAM_COUNT") {
    const newGroups = state.groups;
    if (newGroups) {
      newGroups[action.payload.index].teams.counts[action.payload.team] =
        action.payload.count;
    }
    localStorage.setItem("heros-shuffle-app", JSON.stringify(newGroups));
    return {
      ...state,
      groups: newGroups,
    };
  }
  if (action.type === "SET_NAMES") {
    let newGroups = state.groups;
    if (newGroups) {
      newGroups[action.payload.index].names[
        action.payload.team === 0
          ? action.payload.nameIndex
          : action.payload.nameIndex + 5
      ].name = action.payload.name;
    }
    localStorage.setItem("heros-shuffle-app", JSON.stringify(newGroups));
    return {
      ...state,
      groups: newGroups,
    };
  }
  if (action.type === "SET_NAME_POINT") {
    let newGroups = state.groups;
    if (newGroups) {
      newGroups[action.payload.index].names[
        action.payload.team === 0
          ? action.payload.nameIndex
          : action.payload.nameIndex + 5
      ].point = action.payload.point;
    }
    localStorage.setItem("heros-shuffle-app", JSON.stringify(newGroups));
    return {
      ...state,
      groups: newGroups,
    };
  }
  if (action.type === "SET_BANNED") {
    let newGroups = state.groups;
    if (newGroups) {
      newGroups[action.payload.index].banned = action.payload.banned;
    }
    localStorage.setItem("heros-shuffle-app", JSON.stringify(newGroups));
    return {
      ...state,
      groups: newGroups,
    };
  }
  if (action.type === "CHANGE_GROUP_NAME") {
    let newGroups = state.groups;
    if (newGroups) {
      newGroups[action.payload.index].name = action.payload.name;
    }
    localStorage.setItem("heros-shuffle-app", JSON.stringify(newGroups));
    return {
      ...state,
      groups: newGroups,
    };
  }
  if (action.type === "SET_CHAMP_COUNT") {
    let newGroups = state.groups;
    if (newGroups) {
      newGroups[action.payload.index].champCount = action.payload.count;
    }
    localStorage.setItem("heros-shuffle-app", JSON.stringify(newGroups));
    return {
      ...state,
      groups: newGroups,
    };
  }
  if (action.type === "SET_TEAMS") {
    let newGroups = state.groups;
    if (newGroups) {
      newGroups[action.payload.index].teams.champs[0] =
        action.payload.teamOne.champs;
      newGroups[action.payload.index].teams.champs[1] =
        action.payload.teamTwo.champs;

      newGroups[action.payload.index].teams.names[0] =
        action.payload.teamOne.names;
      newGroups[action.payload.index].teams.names[1] =
        action.payload.teamTwo.names;

      newGroups[action.payload.index].teams.map = action.payload.map;
    }

    localStorage.setItem("heros-shuffle-app", JSON.stringify(newGroups));

    return {
      ...state,
      groups: newGroups,
    };
  }
  if (action.type === "DELETE_GROUP") {
    console.log("delete group");

    let oldGroups = state.groups;
    let newGroups = [];

    if (oldGroups) {
      for (let i = 0; i < oldGroups.length; i++) {
        if (i !== action.payload.index) {
          newGroups.push(oldGroups[i]);
        }
      }
    }

    localStorage.setItem("heros-shuffle-app", JSON.stringify(newGroups));

    return {
      ...state,
      groups: newGroups,
      selectedIndex: null,
    };
  }
  if (action.type === "SET_MODS") {
    let newGroups = state.groups;

    if (newGroups != null && state.selectedIndex != null) {
    newGroups[state.selectedIndex].mods = action.payload;
    }

    localStorage.setItem("heros-shuffle-app", JSON.stringify(newGroups));

    return {
      ...state,
      mods: action.payload,
      groups: newGroups,
    };
  }
  if (action.type === "SET_BANNED_MAPS_VALORANT") {
    const newGroups = state.groups;
    if (newGroups) {
      newGroups[action.payload.index].bannedMapsValorant = action.payload.maps;
    }

    localStorage.setItem("heros-shuffle-app", JSON.stringify(newGroups));

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
  // const location = useLocation();

  useEffect(() => {
    const func = async () => {
      let fetched = await fetch(
        "https://ddragon.leagueoflegends.com/cdn/13.22.1/data/en_US/champion.json"
      );
      let json = await fetched.json();
      let data = json.data;
      let lolchampions = Object.keys(data);

      fetched = await fetch("https://valorant-api.com/v1/agents");

      json = await fetched.json();

      let valchampinos = json.data.map((champ: any) => {
        return { id: champ.uuid, name: champ.displayName };
      });

      fetched = await fetch("https://valorant-api.com/v1/maps");

      json = await fetched.json();

      let valmaps = json.data.map((map: any) => {
        return {
          id: map.uuid,
          name: map.displayName,
          imgUrl: map.listViewIcon,
        };
      });

      dispatch({
        type: "SET_CHAMPIONS",
        payload: { lol: lolchampions, val: valchampinos, maps: valmaps },
      });
    };
    func();
  }, []);

  useEffect(() => {
    if (state.groups) {
      localStorage.setItem("heros-shuffle-app", JSON.stringify(state.groups));
    }
  }, [state.groups]);

  useEffect(() => {
    const storage = localStorage.getItem("heros-shuffle-app");
    dispatch({
      type: "SET_GROUPS",
      payload: storage ? JSON.parse(storage) : null,
    });
  }, []);

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
