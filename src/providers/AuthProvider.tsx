import { supabase } from "@/lib/supabase";
import { Profile } from "@/types";
import { Session } from "@supabase/supabase-js";
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

// Définit la structure stricte des données d'authentification (AuthData) et initialise le contexte React avec des valeurs par défaut.
// Cela permet de partager l'état de la session, du profil et des droits administrateur dans toute l'application avec une sécurité de typage complète.
type AuthData = {
  session: Session | null;
  loading: boolean;
  profile: Profile | null;
  isAdmin: boolean;
};

const AuthContext = createContext<AuthData>({
  session: null,
  loading: true,
  profile: null,
  isAdmin: false,
});

export default function AuthProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    // hook supabase tout fait pour aller chercher la session
    const fetchSession = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      setSession(session);
      // si la session existe, je vais chercher le profil dans ma base supabase qui correspond à ma session, et je donne à setProfile la valeur de ce profil
      if (session) {
        const { data } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", session.user.id)
          .single();
        setProfile(data || null);
      }
      setLoading(false);
    };
    // je vais appeler la fonction que j'ai défini au dessus
    fetchSession();
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  console.log(profile);
  // dans mon return, j'entoure mon {children} qui est en réalité mon application avec mon AuthContextProvider, c'est à dire que tout ce qui sera en {children} de ce AuthContextProvider pourra utiliser les différentes valeurs
  return (
    <AuthContext.Provider
      value={{ session, loading, profile, isAdmin: profile?.group === "ADMIN" }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
