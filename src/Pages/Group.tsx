import { useEffect, useState } from "react";
import NumberInput from "../Components/Inputs/Number";
import NameInput from "../Components/Inputs/Name";
import { useStore, useModal } from "../Store";

import BannedModal from "./Modal/Banneds";

type Group = {
  name: string | null;
  teams: {
    counts: [number, number];
    champs: [string[], string[]];
    names: [
      { id: string; name: string; point: number }[],
      { id: string; name: string; point: number }[]
    ];
  } | null;
  names: { id: string; name: string; point: number }[];
  banned: string[];
  history: object[];
};

const Group = () => {
  const { state, dispatch } = useStore();
  const { openModal } = useModal() as any;
  const [group, setGroup] = useState<Group | null>(null);

  useEffect(() => {
    if (state.groups && state.selectedIndex !== null) {
      setGroup(state.groups[state.selectedIndex]);
    }
  }, [state.selectedIndex, state.groups]);

  return (
    <div className="flex md:flex-row flex-col justify-between px-24 w-full">
      {group && (
        <>
          <div className="flex flex-col gap-8">
            <input className="text-2xl bg-transparent" 
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
            <div>
              <button
                onClick={() => openModal(<BannedModal />)}
                className="text-lg px-3 py-1 border rounded-lg underline"
              >
                Banlanmalar
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Group;
