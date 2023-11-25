import { useStore, StoreProvider } from "./useStore";
import { useTeams, TeamsProvider } from "./useTeams";

type ProviderProps = {
  children: React.ReactNode;
};

const Provider = ({ children }: ProviderProps) => {
  return (
    <StoreProvider>
      <TeamsProvider>{children}</TeamsProvider>
    </StoreProvider>
  );
};

export { useStore, useTeams, Provider };
