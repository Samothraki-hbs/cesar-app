import { supabase } from "@/lib/supabase";
import { useAuth } from "@/providers/AuthProvider";
import { UserChoiceWithRelations } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// écrire les différentes queries en lien avec la table user_choices de ma base de données Supabase

// à écrire pour mutate !
export const useNewUserChoice = () => {
  const queryClient = useQueryClient();
  return useMutation({
    async mutationFn(data: any) {
      const { error, data: newUserChoice } = await supabase
        .from("user_choices")
        .insert({
          profile_id: data.profile_id,
          category_id: data.category_id,
          choice_id: data.choice_id,
        })
        .single();

      if (error) {
        throw new Error(error.message);
      }
      return newUserChoice;
    },
    async onSuccess() {
      await queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError(error) {},
  });
};

// à écrire pour fetch !

export const useChoicesOtherProfile = (id: string) => {
  return useQuery({
    queryKey: ["user_choices", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("user_choices")
        .select("*")
        .eq("profile_id", id)
        .single();
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
  });
};

// ce code est bien trop verbeux, il faut que je le simplifie
// exporter les choix de l'utilisateur connecté
export const useUserChoices = () => {
  const { session } = useAuth();
  const userId = session?.user?.id;
  return useQuery<UserChoiceWithRelations[] | null, Error>({
    queryKey: ["user_choices", userId],
    enabled: !!userId,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("user_choices")
        .select(
          "id, category_id, choice_id, choices:choice_id(id, name, film_title, image, points), categories: category_id(id, title)"
        )
        .eq("profile_id", userId);
      if (error) {
        throw new Error(error.message);
      }
      // Supabase returns relation fields as arrays; normalize to single-object relations
      // je ne comprends pas du tout ce code, à élucider donc
      const normalized =
        (data as any[] | null)?.map((row) => ({
          id: row.id,
          category_id: row.category_id ?? null,
          choice_id: row.choice_id ?? null,
          choices:
            Array.isArray(row.choices) && row.choices.length > 0
              ? row.choices[0]
              : row.choices ?? null,
          categories:
            Array.isArray(row.categories) && row.categories.length > 0
              ? row.categories[0]
              : row.categories ?? null,
        })) ?? null;
      return normalized as UserChoiceWithRelations[] | null;
    },
  });
};

const fetchUserChoices = async (userId: string) => {
  const { data, error } = await supabase
    .from("user_choices")
    .select(
      "id, category_id, choice_id, choices:choice_id(id, name, film_title, image, points), categories:category_id(id,title)"
    )
    .eq("profile_id", userId);

  if (error) throw new Error(error.message);

  return (data as any[]).map((row) => ({
    ...row,
    choices: Array.isArray(row.choices) ? row.choices[0] : row.choices,
    categories: Array.isArray(row.categories)
      ? row.categories[0]
      : row.categories,
  })) as UserChoiceWithRelations[];
};

export const useUserChoices2 = (explicitId?: string) => {
  const { session } = useAuth();

  const targetId = explicitId ?? session?.user?.id;

  return useQuery({
    queryKey: ["user_choices", targetId],
    enabled: !!targetId,
    queryFn: () => fetchUserChoices(targetId!),
  });
};
