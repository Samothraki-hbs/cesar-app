// dossier où je vais écrire mes queries en lien avec les choix à disposition de l'utilisateur
import { supabase } from "@/lib/supabase";
import { useQuery } from "@tanstack/react-query";

export const useChoices = (category_id: number) => {
  return useQuery({
    queryKey: ["choices", category_id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("choices")
        .select("*")
        .eq("category_id", category_id)
        .order("position", { ascending: true });
      if (error) {
        throw new Error(error.message);
      }
      console.log(data);
      return data;
    },
  });
};
