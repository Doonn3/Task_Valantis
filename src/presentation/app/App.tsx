import "./styles/App.css";

import { StoreProvider } from "@/presentation/store";

import { ProductPage } from "@/presentation/pages/ProdutcPage/";

function App() {
  return (
    <StoreProvider>
      <ProductPage />
    </StoreProvider>
  );
}

export default App;
