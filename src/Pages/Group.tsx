import { useEffect, useState } from "react";
import NumberInput from "../Components/Inputs/Number";
import NameInput from "../Components/Inputs/Name";
import { useStore, useModal } from "../Store";
import { GroupType } from "../Types";
import Teams from "../Components/Teams";

import BannedModal from "./Modal/Banneds";
import ValorantBannedMaps from "./Modal/ValorantMap";
import { Link, useNavigate } from "react-router-dom";

let mods = ["LOL", "VALO"];

type Name =
  | {
      id: string;
      name: string;
      point: number;
    }
  | undefined;

type Team = {
  names: Name[];
  champs: string[];
} | null;

const Group = () => {
  const { state, dispatch } = useStore();
  const { openModal } = useModal() as any;
  const [group, setGroup] = useState<GroupType | null>(null);
  const redirect = useNavigate();

  useEffect(() => {
    if (state.groups && state.selectedIndex !== null) {
      setGroup(state.groups[state.selectedIndex]);
    }
  }, [state.selectedIndex, state.groups]);

  useEffect(() => {
    if (state.selectedIndex === null) {
      redirect("/");
    }
  }, [state.selectedIndex]);

  const Shuffle = () => {
    let indexes = [];
    let teamCount1 = group?.teams?.counts[0];
    let teamCount2 = group?.teams?.counts[1];
    let champCount = group?.champCount || 5;

    if (teamCount1 && teamCount2) {
      for (let i = 0; i < teamCount1; i++) {
        indexes.push(i);
      }
      for (let i = 5; i < 5 + teamCount2; i++) {
        indexes.push(i);
      }
    }

    let isTemp = false;

    for (let i = 0; i < indexes.length; i++) {
      if (group?.names[indexes[i]].name === "") {
        isTemp = true;
        break;
      }
    }

    if (isTemp) {
      alert("İsimler boş olamaz.");
      return;
    }

    let teamOne: Team = {
      names: [],
      champs: [],
    };

    let teamTwo: Team = {
      names: [],
      champs: [],
    };

    let champs =
      state.mods === 0
        ? state?.lolchampions?.filter(
            (champ) => !group?.banned.includes(champ)
          ) || []
        : state?.valchampinos
            ?.filter((champ) => {
              return !group?.banned.includes(champ.name);
            })
            .map((c) => c.name) || [];

    let names: Name[] = [];

    for (let i = 0; i < indexes.length; i++) {
      names.push(group?.names[indexes[i]]);
    }

    for (let i = names.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * i);
      const temp = names[i];
      names[i] = names[j];
      names[j] = temp;
    }

    teamOne.names = names.slice(0, teamCount1);
    teamTwo.names = names.slice(teamCount1, names.length);

    for (let i = champs?.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * i);
      const temp = champs[i];
      champs[i] = champs[j];
      champs[j] = temp;
    }

    teamOne.champs = champs.slice(0, champCount);
    teamTwo.champs = champs.slice(champCount, champCount * 2);

    // valorant map
    let map = {};
    if (
      state.mods === 1 &&
      state.valmaps != null &&
      state.valmaps.length > 0 &&
      state.groups != null
    ) {
      let maps = state.valmaps.filter((map) => {
        if (state.selectedIndex != null && state.groups != null) {
          return !state.groups[state.selectedIndex].bannedMapsValorant.some(
            (banned: { id: string; name: string; imgUrl: string }) =>
              banned.id === map.id
          );
        }
      });

      if (maps.length > 0) {
        let randomIndex = Math.floor(Math.random() * maps.length);

        map = maps[randomIndex];
      } else {
        map = state.valmaps[0];
      }
    }

    // priorities
    let teamOneP = Math.floor(Math.random() * 2);
    let teamTwoP = teamOneP === 0 ? 1 : 0;
    let priority = [teamOneP, teamTwoP];

    dispatch({
      type: "SET_TEAMS",
      payload: {
        index: state.selectedIndex,
        teamOne,
        teamTwo,
        map,
        priority,
      },
    });
  };

  const Delete = () => {
    if (window.confirm("Bu takımı silmek istediğinize emin misiniz?")) {
      dispatch({
        type: "DELETE_GROUP",
        payload: {
          index: state.selectedIndex,
        },
      });
      redirect("/");
    }
  };

  return (
    <div className="flex md:flex-row flex-col justify-between gap-8 px-24 w-full">
      <Link
        className="absolute top-4 right-4 px-3 py-1 rounded-lg bg-white text-black"
        to="/"
      >
        Geri
      </Link>
      {group && (
        <>
          <div className="flex flex-col justify-between w-1/3 h-full gap-2">
            <input
              className="text-2xl bg-transparent"
              value={group.name || ""}
              onChange={(e) => {
                dispatch({
                  type: "CHANGE_GROUP_NAME",
                  payload: {
                    index: state.selectedIndex,
                    name: e.target.value,
                  },
                });
              }}
            />
            <div className="flex gap-3">
              {mods.map((mod, index) => (
                <div
                  key={index}
                  onClick={() => {
                    dispatch({
                      type: "SET_MODS",
                      payload: index,
                    });
                  }}
                  className={`px-2 py-1 cursor-pointer rounded ${
                    state.mods === index
                      ? "bg-red-800 text-white underline"
                      : "bg-gray-900 text-gray-500"
                  }`}
                >
                  {mod}
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-4">
              <p className="text-lg">Takım Sayıları</p>
              <div className="flex gap-2">
                {group.teams &&
                  group.teams.counts.map((count, index) => (
                    <NumberInput
                      key={index}
                      label={"Takım " + (index + 1)}
                      value={count}
                      min={1}
                      max={5}
                      step={1}
                      onChange={(value: number) => {
                        dispatch({
                          type: "SET_TEAM_COUNT",
                          payload: {
                            index: state.selectedIndex,
                            team: index,
                            count: value,
                          },
                        });
                      }}
                    />
                  ))}
              </div>
            </div>
            <div className="flex">
              <NumberInput
                label="Champ"
                value={group.champCount || 1}
                min={1}
                max={10}
                step={1}
                onChange={(value: number) => {
                  dispatch({
                    type: "SET_CHAMP_COUNT",
                    payload: {
                      index: state.selectedIndex,
                      count: value,
                    },
                  });
                }}
              />
            </div>
            <div className="flex flex-col gap-4 h-[21rem]">
              <p className="text-lg">İsimler</p>
              <div className="grid grid-cols-2 gap-1">
                {group.teams &&
                  group.teams.counts.map((_, index) => (
                    <div className="flex flex-col gap-1" key={"team-" + index}>
                      {group.teams &&
                        Array.from(Array(group.teams.counts[index])).map(
                          (_, indexb) => (
                            <NameInput
                              key={indexb}
                              text={{
                                placeholder:
                                  (index === 1
                                    ? indexb +
                                      (group.teams
                                        ? group.teams.counts[0] + 1
                                        : 5)
                                    : indexb + 1) + ". isim",
                                maxCharacters: 20,
                                value:
                                  group.names[index === 1 ? indexb + 5 : indexb]
                                    .name,
                                onChange: (value: string) => {
                                  dispatch({
                                    type: "SET_NAMES",
                                    payload: {
                                      index: state.selectedIndex,
                                      team: index,
                                      nameIndex: indexb,
                                      name: value,
                                    },
                                  });
                                },
                              }}
                              number={{
                                min: 0,
                                max: 1000,
                                step: 1,
                                value:
                                  group.names[index === 1 ? indexb + 5 : indexb]
                                    .point,
                                onChange: (value: number) => {
                                  dispatch({
                                    type: "SET_NAME_POINT",
                                    payload: {
                                      index: state.selectedIndex,
                                      team: index,
                                      nameIndex: indexb,
                                      point: value,
                                    },
                                  });
                                },
                              }}
                            />
                          )
                        )}
                    </div>
                  ))}
              </div>
            </div>
            <div className="flex gap-4">
              {state.mods === 0 && (
                <button
                  onClick={() => openModal(<BannedModal />)}
                  className="text-lg px-3 py-1 border rounded-lg underline"
                >
                  Banlanmalar
                </button>
              )}
              {state.mods === 1 && (
                <button
                  onClick={() => openModal(<ValorantBannedMaps />)}
                  className="text-lg px-3 py-1 border rounded-lg underline"
                >
                  Val Map Ban
                </button>
              )}
              {/* <button
                onClick={() => openModal(<BannedModal />)}
                className="text-lg px-3 py-1 border rounded-lg underline"
              >
                Geçmiş
              </button> */}
              <button
                onClick={() => Shuffle()}
                className="text-lg px-3 py-1 border border-purple-700 hover:text-purple-700 text-white bg-purple-700 hover:bg-transparent transition-all rounded-lg ml-auto animate-pulse"
              >
                Shuffle
              </button>
              <button
                onClick={() => {
                  Delete();
                }}
                className="px-3 py-1 text-lg border border-red-500 rounded-lg transition-all bg-red-500 text-white"
              >
                Sil
              </button>
            </div>
          </div>
          <div className="w-2/3 items-center justify-center flex">
            {group?.teams?.champs[0].length > 0 && <Teams group={group} />}
          </div>
        </>
      )}
    </div>
  );
};

export default Group;
