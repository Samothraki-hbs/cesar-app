// à écrire !!
import { supabase } from "@/lib/supabase";
import { useQuery } from "@tanstack/react-query";

export const useCategoryList = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data, error } = await supabase.from("categories").select("*");
      if (error) {
        throw new Error(error.message);
      }
      console.log(data);
      return data;
    },
  });
};
