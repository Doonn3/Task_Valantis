import { ReactNode, useMemo } from "react";
import { StoreContext } from "./StoreContext";
import { usePageCount } from "./hooks/usePageCount";
import { useProducts } from "./hooks/useProducts";
import { useFilterFields } from "./hooks/useFilterFields";

interface StoreProviderProps {
  children: ReactNode;
}

export const StoreProvider: React.FC<StoreProviderProps> = ({ children }) => {
  const storeProducts = useProducts();
  const storePageAmount = usePageCount();
  const storeFilter = useFilterFields();

  const store = useMemo(
    () => ({
      storePageAmount,
      storeProducts,
      storeFilter,
    }),
    [storePageAmount, storeProducts, storeFilter]
  );

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};
