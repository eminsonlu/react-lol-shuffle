export type GroupType = {
  name: string | null;
  champCount: number;
  teams: {
    counts: [number, number];
    champs: [string[], string[]];
    names: [
      { id: string; name: string; point: number }[],
      { id: string; name: string; point: number }[]
    ];
  };
  names: { id: string; name: string; point: number }[];
  banned: string[];
  history: object[];
};
