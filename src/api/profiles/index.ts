// dossier où je vais écrire mes queries en lien avec la table profil de mon application
import { supabase } from "@/lib/supabase";
import { useQuery } from "@tanstack/react-query";

// fonction qui va fetch tous les utilisateurs de mon application
export const useProfiles = () => {
  return useQuery({
    queryKey: ["profiles"],
    queryFn: async () => {
      const { data, error } = await supabase.from("profiles").select("*");
      if (error) {
        throw new Error(error.message);
      }
      console.log(data);
      return data;
    },
  });
};

// attention à ne pas oublier de générer les types pour que cela boucle avec Supabase
export const fetchProfileById = async (id: string) => {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    throw new Error(error.message);
  }
};

// hook spécialisé qui va me permettre d'aller chercher un utilisateur en particulier dans ma base de données

export function useOtherProfile(id: string) {
  return useQuery({
    queryKey: ["profile", id],
    queryFn: () => fetchProfileById(id),
    enabled: !!id, // à quoi correspond cette ligne ?
  });
}

export const useUserProfile = (userId: string) => {
  return useQuery({
    queryKey: ["profile", userId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId);

      if (error) {
        throw new Error(error.message);
      }
      console.log(data);
      return data;
    },
  });
};
