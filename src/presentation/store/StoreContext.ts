import React from "react";

import { useStore } from "./model/useStore";

type StoreContextType = {
  store: ReturnType<typeof useStore>;
};

export const StoreContext = React.createContext<StoreContextType | null>(null);
