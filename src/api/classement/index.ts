// à écrire !!
import { supabase } from "@/lib/supabase";
import { useQuery } from "@tanstack/react-query";

// fonction qui va fetch tous les utilisateurs de mon application
export const useClassement = () => {
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
