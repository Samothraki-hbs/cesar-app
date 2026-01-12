import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren } from "react";

const client = new QueryClient();
// Ce code initialise et configure TanStack Query (React Query) pour gérer l'état asynchrone et le cache des données dans votre application.

// Il crée une instance unique (QueryClient) qui sert de gestionnaire central pour toutes les requêtes API, puis l'injecte via le QueryClientProvider pour qu'elle soit accessible à tous les composants enfants.
// Ce mécanisme permet de bénéficier automatiquement de fonctionnalités avancées comme la mise en cache, la synchronisation en arrière-plan et la gestion simplifiée des états de chargement.

export default function QueryProvider({ children }: PropsWithChildren) {
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
