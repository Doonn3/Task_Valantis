import { ReactNode, useMemo } from "react";
import { StoreContext } from "./StoreContext";

import { useStore } from "./model/useStore";

interface StoreProviderProps {
  children: ReactNode;
}

export const StoreProvider: React.FC<StoreProviderProps> = ({ children }) => {
  const store = useStore();

  const storeMemo = useMemo(
    () => ({
      store,
    }),
    [store]
  );

  return (
    <StoreContext.Provider value={storeMemo}>{children}</StoreContext.Provider>
  );
};
