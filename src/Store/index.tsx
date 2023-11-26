import { useStore, StoreProvider } from "./useStore";

type ProviderProps = {
  children: React.ReactNode;
};

const Provider = ({ children }: ProviderProps) => {
  return <StoreProvider>{children}</StoreProvider>;
};

export { useStore, Provider };
