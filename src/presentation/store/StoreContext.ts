import React from "react";

import { usePageCount } from "./hooks/usePageCount";
import { useProducts } from "./hooks/useProducts";
import { useFilterFields } from "./hooks/useFilterFields";

type StoreContextType = {
  storePageAmount: ReturnType<typeof usePageCount>;
  storeProducts: ReturnType<typeof useProducts>;
  storeFilter: ReturnType<typeof useFilterFields>;
};

export const StoreContext = React.createContext<StoreContextType | null>(null);
