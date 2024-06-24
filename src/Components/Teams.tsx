import { useEffect, useState } from "react";
import { GroupType } from "../Types";
import { useStore } from "../Store";

type TeamsProps = {
  group: GroupType;
};

const CapitalizeFirstLetter = (word: string) => {
  return word.charAt(0).toUpperCase() + word.slice(1);
};

const Teams = (props: TeamsProps) => {
  const { state } = useStore();
  const [baseUrl, setBaseUrl] = useState<string>("");

  const giveForMod = (champion: string) => {
    if (state.mods === 0) {
      return "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/" + CapitalizeFirstLetter(champion) + "_0.jpg";
    } else {
      let cid = state?.valchampinos?.find((champ) => champ.name === champion)?.id;

      return "https://media.valorant-api.com/agents/" + cid + "/displayicon.png";
    }
  }

  return (
    <div className="flex flex-col gap-4">
      {Array.from(Array(2)).map((_, index) => (
        <div key={index} className="flex flex-col gap-2">
          <div className="flex flex-wrap">
            {props.group.teams.champs[index].map((champion) => (
              <img
                src={giveForMod(champion)}
                alt={champion}
                className={`${state.mods === 0 ? "h-32 w-48" : "h-32 w-32"} object-cover`}
              />
            ))}
          </div>
          <div className="flex gap-3">
            {props.group.teams.names[index].map((name) => (
              <div className="flex gap-1">
                <p>{name.name}</p>
                <p>{name.point}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
      <button
        onClick={() => {
          let text = "1.Takım\n\n";

          props.group.teams.names[0].forEach((name) => {
            text += name.name + "-" + name.point + " ";
          });
          text += "\n\n";
          props.group.teams.champs[0].forEach((champion) => {
            text += champion + " ";
          });
          text += "\n\n2.Takım\n\n";
          props.group.teams.names[1].forEach((name) => {
            text += name.name + "-" + name.point + " ";
          });
          text += "\n\n";
          props.group.teams.champs[1].forEach((champion) => {
            text += champion + " ";
          });
          navigator.clipboard.writeText(text);
          console.log(text);
        }}
        className="p-2 border rounded bg-slate-800 text-white"
      >
        Copy
      </button>
    </div>
  );
};

export default Teams;
