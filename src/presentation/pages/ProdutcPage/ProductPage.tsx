import { useContext, useEffect } from "react";

import { StoreContext } from "@/presentation/store";

import { Pagination } from "./components/Pagination";
import { ProductList } from "./components/ProductList";
import { Filter } from "./components/Filter";

import style from "./style.module.css";

export function ProductPage() {
  const { store } = useContext(StoreContext)!;

  useEffect(() => {
    store.init();
  }, []);

  const goToPage = (page: number) => {
    store.getProducts(page);
  };

  const onFilter = (type: string, value: string) => {
    store.searchProducts(type, value);
  };

  const cancelFilter = () => {
    store.resetSearchResult();
  };

  return (
    <main className={style.productPage}>
      <div className={style.productPage__products}>
        <ProductList
          products={store.products.products}
          isLoading={store.products.isLoading}
        />
      </div>

      <div className={style.productPage__control}>
        <Filter
          filterType={store.searchByFilter.fields}
          emit={onFilter}
          emitClear={cancelFilter}
        />

        <Pagination
          totalItem={store.pages.totalPageCount}
          maxShowItem={5}
          goToPage={goToPage}
          isLoading={store.products.isLoading}
        />
      </div>
    </main>
  );
}
