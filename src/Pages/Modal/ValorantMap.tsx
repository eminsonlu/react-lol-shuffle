import { useEffect, useState } from "react";
import { useStore } from "../../Store/useStore";

const BannedModal = () => {
  const { state, dispatch } = useStore();
  const [banned, setBanned] = useState<
    { id: string; name: string; imgUrl: string }[]
  >([]);
  const [openMaps, setOpenMaps] = useState<
    { id: string; name: string; imgUrl: string }[]
  >([]);

  useEffect(() => {
    if (
      state.groups != null &&
      state.selectedIndex != null &&
      state.valmaps != null
    ) {
      setBanned(state.groups[state.selectedIndex].bannedMapsValorant);

      const filtered = state.valmaps.filter((map) => {
        if (state.selectedIndex != null && state.groups != null) {
          return !state.groups[state.selectedIndex].bannedMapsValorant.some(
            (banned: { id: string; name: string; imgUrl: string }) =>
              banned.id === map.id
          );
        }
      });
      setOpenMaps(filtered);
    }
  }, [state.groups, state.selectedIndex, state.valmaps, state]);

  const onBanClick = (map: { id: string; name: string; imgUrl: string }) => {
    if (state.selectedIndex != null && state.groups != null) {
      let newMaps = state.groups[state.selectedIndex].bannedMapsValorant;

      newMaps.push(map);

      dispatch({
        type: "SET_BANNED_MAPS_VALORANT",
        payload: {
          maps: newMaps,
          index: state.selectedIndex,
        },
      });
    }
  };

  const onRemoveClick = (map: { id: string; name: string; imgUrl: string }) => {
    if (state.selectedIndex != null && state.groups != null) {
      let newMaps = state.groups[state.selectedIndex].bannedMapsValorant;

      newMaps = newMaps.filter((banned) => banned.id !== map.id);

      dispatch({
        type: "SET_BANNED_MAPS_VALORANT",
        payload: {
          maps: newMaps,
          index: state.selectedIndex,
        },
      });
    }
  };

  return (
    <div className="md:min-w-[48rem] min-w-[24rem] lg:min-w-[64rem] flex md:flex-row flex-col bg-[#111] rounded-lg shadow-lg p-3 gap-4 h-[16rem]">
      <div className="w-1/2 flex flex-col gap-3 h-full relative">
        <p>Banlananlar</p>
        <div className="grid grid-cols-3 gap-2 overflow-auto pr-3">
          {banned.map((map, index) => (
            <div onClick={() => onRemoveClick(map)} key={index}>
              <p className="px-2 py-1 bg-[#cecece] text-[#333] cursor-pointer hover:bg-[#cecece]/70">
                {map.name}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="w-1/2 relative h-full flex flex-col gap-3">
        <p>Açıklar</p>
        <div className="grid grid-cols-3 gap-2 overflow-auto pr-3">
          {openMaps.map((map, index) => (
            <div onClick={() => onBanClick(map)} key={index}>
              <p className="px-2 py-1 bg-[#cecece] text-[#333] cursor-pointer hover:bg-[#cecece]/70">
                {map.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BannedModal;
