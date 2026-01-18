// dossier où je vais écrire mes queries en lien avec la table profil de mon application
import { supabase } from "@/lib/supabase";
import { useQuery } from "@tanstack/react-query";

// fonction qui va fetch tous les utilisateurs de mon application, hormis l'utilisateur connecté
export const useProfiles = () => {
  return useQuery({
    queryKey: ["profiles", "excluding-me"],
    queryFn: async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return [];
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .neq("id", user.id)
        .order("points", { ascending: true });
      if (error) {
        throw new Error(error.message);
      }
      console.log(data);
      return data;
    },
  });
};

export const useOtherProfile = (id: string) => {
  return useQuery({
    queryKey: ["profile", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", id)
        .single();
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
  });
};
