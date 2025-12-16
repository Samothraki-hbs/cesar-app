export type Category = {
  id: string | number;
  title: string;
  choices: readonly PossibleChoice[];
};

export type PossibleChoice = {
  id: string | number;
  image: string | null;
  name: string;
  cote: number;
};
