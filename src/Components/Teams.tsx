import { GroupType } from "../Types";
import { useStore } from "../Store";

type TeamsProps = {
  group: GroupType;
};

const CapitalizeFirstLetter = (word: string) => {
  return word.charAt(0).toUpperCase() + word.slice(1);
};

const Teams = (props: TeamsProps) => {
  const { state, dispatch } = useStore();

  const giveForMod = (champion: string) => {
    if (state.mods === 0) {
      return (
        "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/" +
        CapitalizeFirstLetter(champion) +
        "_0.jpg"
      );
    } else {
      let cid = state?.valchampinos?.find(
        (champ) => champ.name === champion
      )?.id;

      return (
        "https://media.valorant-api.com/agents/" + cid + "/displayicon.png"
      );
    }
  };

  const randomMap = () => {
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
    dispatch({
      type: "SET_MAP",
      payload: {
        map: map,
        index: state.selectedIndex,
      },
    })
  };

  return (
    <div className="flex flex-col gap-4">
      {Array.from(Array(2)).map((_, index) => (
        <div key={index} className="flex flex-col gap-2">
          <div className="flex flex-wrap">
            {props.group.teams.champs[index].map((champion) => (
              <img
                key={champion + Math.random()}
                src={giveForMod(champion)}
                alt={champion}
                className={`${
                  state.mods === 0 ? "h-32 w-48" : "h-32 w-32"
                } object-cover`}
              />
            ))}
          </div>
          <div className="flex gap-3">
            {props.group.teams.names[index].map((name) => (
              <div key={name.id} className="flex gap-1">
                <p>{name.name}</p>
                {/* <p>{name.point}</p> */}
              </div>
            ))}
            <span className="underline font-bold">

            {props.group.teams.priority[index] === 0 ? "Attack" : "Defense"}

            </span>
          </div>
        </div>
      ))}
      {state.mods === 1 && (
        <>
          <div className="flex gap-4">
            <span>
              Harita:{" "}
              <span className="underline">{props.group.teams.map.name}</span>
            </span>
            <button
              onClick={() => randomMap()}
              className="px-1 bg-white rounded text-black"
            >
              Shuffle
            </button>
          </div>
          <img
            src={props.group.teams.map.imgUrl}
            className="h-32 aspect-[45/10] object-cover"
          />
        </>
      )}
      <button
        onClick={() => {
          let text = "1.Takım\n";

          props.group.teams.names[0].forEach((name) => {
            // text += name.name + "-" + name.point + " ";
            text += name.name + " ";
          });
          text += "\n";
          props.group.teams.champs[0].forEach((champion) => {
            text += champion + " ";
          });
          text += "\n\n2.Takım\n";
          props.group.teams.names[1].forEach((name) => {
            // text += name.name + "-" + name.point + " ";
            text += name.name + " ";
          });
          text += "\n";
          props.group.teams.champs[1].forEach((champion) => {
            text += champion + " ";
          });

          if (state.mods === 1) {
            text += "\n\nHarita: " + props.group.teams.map.name;
          }

          navigator.clipboard.writeText(text);
        }}
        className="p-2 border rounded bg-slate-800 text-white"
      >
        Copy
      </button>
    </div>
  );
};

export default Teams;
