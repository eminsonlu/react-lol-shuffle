import { useEffect, useState } from "react";
import { useStore } from "../Store";

type Group = {
  name: string | null;
  teams: {
    counts: [number, number];
    champs: [string[], string[]];
    names: [string[], string[]];
  } | null;
  names: string[];
  banned: string[];
  history: object[];
};

const Group = () => {
  const { state, dispatch } = useStore();
  const [group, setGroup] = useState<Group | null>(null);

  const [isBannedModalOpen, setIsBannedModalOpen] = useState<Boolean>(false);

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
            <h2 className="text-2xl">{group.name}</h2>
            <div className="flex flex-col gap-4">
              <p className="text-lg">Takım Sayıları</p>
              <div className="flex gap-2">
                <div className="flex flex-col gap-2">
                  <label htmlFor="number-input-1">1. Takım</label>
                  <input
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      let count = +e.target.value;
                      if (+e.target.value > 5 || +e.target.value < 1) {
                        e.target.value = "1";
                        count = 1;
                      }
                      dispatch({
                        type: "SET_TEAM_COUNT",
                        payload: {
                          index: state.selectedIndex,
                          team: 1,
                          count: count,
                        },
                      });
                    }}
                    step={1}
                    value={(group.teams && group.teams.counts[0]) || 1}
                    min={1}
                    max={5}
                    type="number"
                    id="number-input-1"
                    aria-describedby="helper-text-explanation"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-16"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="number-input-1">2. Takım</label>
                  <input
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      let count = +e.target.value;
                      if (+e.target.value > 5 || +e.target.value < 1) {
                        e.target.value = "1";
                        count = 1;
                      }
                      dispatch({
                        type: "SET_TEAM_COUNT",
                        payload: {
                          index: state.selectedIndex,
                          team: 2,
                          count: count,
                        },
                      });
                    }}
                    placeholder="1"
                    value={(group.teams && group.teams.counts[1]) || 1}
                    step={1}
                    min={1}
                    max={5}
                    type="number"
                    id="number-input-1"
                    aria-describedby="helper-text-explanation"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-16"
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4 h-[16rem]">
              <p className="text-lg">İsimler</p>
              <div className="grid grid-cols-2 gap-1">
                {group.teams &&
                  group.teams.counts.map((_, index) => (
                    <div className="flex flex-col gap-1" key={"team-" + index}>
                      {group.teams &&
                        Array.from(Array(group.teams.counts[index])).map(
                          (_, indexb) => (
                            <input
                              key={
                                "team-" +
                                (index === 1 ? indexb + 6 : indexb + 1) +
                                "-name"
                              }
                              type="text"
                              value={group.names[index === 1 ? indexb + 5 : indexb]}
                              onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                              ) => {
                                dispatch({
                                  type: "SET_NAMES",
                                  payload: {
                                    index: state.selectedIndex,
                                    team: index,
                                    name: e.target.value,
                                    nameIndex: indexb,
                                  },
                                });
                              }}
                              placeholder={
                                (index === 1 ? indexb + 6 : indexb + 1) +
                                ". isim"
                              }
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-full"
                            />
                          )
                        )}
                    </div>
                  ))}
              </div>
            </div>
            <div>
                <button className="text-lg px-3 py-1 border rounded-lg underline">Banlanmalar</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Group;
