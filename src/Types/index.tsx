export type GroupType = {
  name: string | null;
  champCount: number;
  mods: number;
  teams: {
    counts: [number, number];
    priority: [number, number];
    champs: [string[], string[]];
    map: {
      id: string;
      name: string;
      imgUrl: string;
    };

    names: [
      { id: string; name: string; point: number }[],
      { id: string; name: string; point: number }[]
    ];
  };
  names: { id: string; name: string; point: number }[];
  banned: string[];
  bannedMapsValorant: {
    id: string;
    name: string;
    imgUrl: string;
  }[];
  history: object[];
};
