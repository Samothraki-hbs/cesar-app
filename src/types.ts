import { Database } from "./database.types";

// écrire l'ensemble des exports depuis les types automatiquement générés

export type Tables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Row"];

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
  film: string;
};

export type Profile = {
  id: string;
  email: string;
  username: string;
  avatar_url: string | null;
  full_name: string | null;
  website: string | null;
  group: string | null;
};
