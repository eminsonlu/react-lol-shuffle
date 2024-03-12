import { useStore, StoreProvider } from "./useStore";
import { useModal, ModalProvider } from "./useModal";

type ProviderProps = {
  children: React.ReactNode;
};

const Provider = ({ children }: ProviderProps) => {
  return (
    <StoreProvider>
      <ModalProvider>{children}</ModalProvider>
    </StoreProvider>
  );
};

export { useStore, Provider, useModal };
