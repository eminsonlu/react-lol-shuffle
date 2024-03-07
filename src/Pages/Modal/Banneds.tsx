import { useEffect, useState } from "react";
import { useStore } from "../../Store/useStore";

const BannedModal = () => {
  const { state, dispatch } = useStore();
  const [banned, setBanned] = useState<string[]>([]);
  const [val, setVal] = useState<string>("");

  const [filtered, setFiltered] = useState<string[]>([]);

  useEffect(() => {
    if (state.groups && state.selectedIndex !== null) {
      setBanned(state.groups[state.selectedIndex].banned);
    }
  }, [state.groups, state.selectedIndex]);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVal(e.target.value);
    if (e.target.value.length < 2) return setFiltered([]);
    if (state.champions === null) return;
    const filtered = state.champions.filter(
      (champion) =>
        champion.toLowerCase().includes(e.target.value.toLowerCase()) &&
        !banned.includes(champion)
    );
    setFiltered(filtered);
  };

  const onBanClick = (champion: string) => {
    dispatch({
      type: "SET_BANNED",
      payload: {
        banned: [...banned, champion],
        index: state.selectedIndex,
      },
    });
    setBanned(prev => [...prev, champion]);
    setFiltered(prev => prev.filter(ban => ban !== champion));
    setVal("");
  };

  const onRemoveClick = (champion: string) => {
    dispatch({
      type: "SET_BANNED",
      payload: {
        banned: banned.filter((ban) => ban !== champion),
        index: state.selectedIndex,
      },
    });
    setBanned(prev => prev.filter(ban => ban !== champion));
  }

  return (
    <div className="md:min-w-[48rem] min-w-[24rem] lg:min-w-[64rem] flex md:flex-row flex-col bg-slate-800 rounded-lg shadow-lg p-3 gap-4">
      <div className="w-1/2">
        <h2 className="text-2xl">Yasaklar</h2>
        <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 pt-2 gap-2 max-h-[14rem] overflow-y-auto pr-2">
          {banned.map((champion, index) => (
            <div
              key={index}
              className="flex justify-center gap-2 items-center bg-gray-500 border border-gray-500 cursor-pointer rounded-lg py-2"
              onClick={() => {
                if (!banned.includes(champion)) return;
                onRemoveClick(champion);
              }}
            >
              <p>{champion}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="w-1/2 min-h-[16rem]">
        <input
          className="bg-slate-700 rounded-lg w-full h-10 px-4"
          placeholder="Şampiyon Adı"
          value={val}
          onChange={onInputChange}
        />
        <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 py-2 gap-2">
          {filtered.map((champion, index) => (
            <div
              key={index}
              className="flex justify-center gap-2 items-center bg-gray-500 border border-gray-500 cursor-pointer rounded-lg py-2"
              onClick={() => {
                if (banned.includes(champion)) return;
                onBanClick(champion);
              }}
            >
              <p>{champion}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BannedModal;
