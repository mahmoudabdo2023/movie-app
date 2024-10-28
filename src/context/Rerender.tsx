"use client";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

type RerenderContextType = {
  rerender: boolean;
  setRerender: Dispatch<SetStateAction<boolean>>;
};

export const RerenderContext = createContext<RerenderContextType | undefined>(
  undefined,
);

export const RerenderProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [rerender, setRerender] = useState(false);

  return (
    <RerenderContext.Provider value={{ rerender, setRerender }}>
      {children}
    </RerenderContext.Provider>
  );
};

export const useRerender = () => {
  const context = useContext(RerenderContext);
  if (context === undefined) {
    throw new Error("useRerender must be used within a RerenderProvider");
  }
  return context;
};
