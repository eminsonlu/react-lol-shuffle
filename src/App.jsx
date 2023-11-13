import { useEffect, useState } from "react";

function App() {
  const [champions, setChampions] = useState(null);

  const [champCount, setChampCount] = useState(null);

  const [teamCount1, setTeamCount1] = useState(null);
  const [teamCount2, setTeamCount2] = useState(null);

  const [team1, setTeam1] = useState(null);
  const [team2, setTeam2] = useState(null);

  const [names, setNames] = useState(null);

  useEffect(() => {
    const func = async () => {
      const fetched = await fetch(
        "https://ddragon.leagueoflegends.com/cdn/13.22.1/data/en_US/champion.json"
      );
      const json = await fetched.json();
      const data = json.data;
      const champions = Object.keys(data);
      setChampions(champions);
    };
    func();
  }, []);

  const shuffle = () => {
    const team1 = [];
    const team2 = [];

    const shuffledNames = names.sort(() => Math.random() - 0.5);

    team1[0] = shuffledNames.slice(0, teamCount1);
    team2[0] = shuffledNames.slice(teamCount1, teamCount1 + teamCount2);

    const shuffledChamps = champions.sort(() => Math.random() - 0.5);
    const team1Champs = shuffledChamps.slice(0, champCount);
    const team2Champs = shuffledChamps.slice(champCount, champCount * 2);

    team1[1] = team1Champs;
    team2[1] = team2Champs;

    setTeam1(team1);
    setTeam2(team2);
  };

  return (
    <div className="h-screen bg-slate-900 flex justify-center items-center text-white gap-6">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <p>Champ sayisi</p>
          <input
            type="number"
            max={champions?.length}
            step={1}
            min={1}
            className="rounded-md p-2 bg-transparent border border-gray-300"
            onChange={(e) => {
              if (e.target.value > champions?.length) {
                e.target.value = champions?.length;
              }
              setChampCount(e.target.value);
            }}
          />
        </div>
        <div className="flex gap-4">
          <div className="flex flex-col gap-2">
            <p>1. Takim Sayi</p>
            <input
              type="number"
              max={5}
              step={1}
              min={1}
              className="rounded-md p-2 bg-transparent border border-gray-300"
              onChange={(e) => {
                if (e.target.value > 5) {
                  e.target.value = 5;
                }
                setTeamCount1(e.target.value);
              }}
            />
          </div>
          <div className="flex flex-col gap-2">
            <p>2. Takim Sayi</p>
            <input
              type="number"
              max={5}
              step={1}
              min={1}
              className="rounded-md p-2 bg-transparent border border-gray-300 "
              onChange={(e) => {
                if (e.target.value > 5) {
                  e.target.value = 5;
                }
                setTeamCount2(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="flex gap-3">
          <div className="flex flex-col gap-1">
            {teamCount1 &&
              Array.from(Array(+teamCount1 + +teamCount2)).map((_, i) => (
                <input
                  type="text"
                  className="rounded-md p-2 bg-transparent border border-gray-300"
                  key={i}
                  placeholder={`${i + 1}. Isim`}
                  onChange={(e) => {
                    if (!names) {
                      setNames([e.target.value]);
                      return;
                    }
                    const arr = [...names];
                    arr[i] = e.target.value;
                    setNames(arr);
                  }}
                />
              ))}
          </div>
        </div>
        <button
          onClick={() => shuffle()}
          className="border-purple-400 border p-2 bg-purple-400 hover:bg-transparent"
        >
          yaP
        </button>
      </div>
      {team1 && team2 && (
        <div className="flex gap-4">
          <div className="flex flex-col gap-2">
            <p>1. Takim</p>
            {team1[0].map((name, i) => (
              <p key={i}>{name}</p>
            ))}
            {team1[1].map((champ, i) => (
              <p key={i}>{champ}</p>
            ))}
          </div>
          <div className="flex flex-col gap-2">
            <p>2. Takim</p>
            {team2[0].map((name, i) => (
              <p key={i}>{name}</p>
            ))}
            {team2[1].map((champ, i) => (
              <p key={i}>{champ}</p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
