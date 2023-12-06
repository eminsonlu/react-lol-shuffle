/* eslint-disable react/prop-types */
import React from "react";
import { useContext, createContext } from "react";

type ContextObject = {
  isOpen: Boolean;
  openModal: (component: React.ReactNode) => void;
  closeModal: () => void;
  component: React.ReactNode | null;
};

const ModalContext = createContext<ContextObject | null>(null);

interface ProviderProps {
  children: React.ReactNode;
}

const ModalProvider = ({ children }: ProviderProps) => {
  const [isOpen, setIsOpen] = React.useState<Boolean>(false);
  const [component, setComponent] = React.useState<React.ReactNode | null>(
    null
  );

  const openModal = (component: React.ReactNode) => {
    setIsOpen(true);
    setComponent(component);
  };
  const closeModal = () => {
    setIsOpen(false);
    setComponent(null);
  };

  return (
    <ModalContext.Provider value={{ isOpen, openModal, closeModal, component }}>
      {children}
    </ModalContext.Provider>
  );
};

const useModal = () => {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};

export { ModalProvider, useModal };
