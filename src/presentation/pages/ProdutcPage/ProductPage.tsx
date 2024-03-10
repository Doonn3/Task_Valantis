import style from "./style.module.css";

import { useContext, useEffect } from "react";
import { StoreContext } from "@/presentation/store";

import { Pagination } from "./components/Pagination";
import { ProductList } from "./components/ProductList";
import { Filter } from "./components/Filter";

export function ProductPage() {
  const { store } = useContext(StoreContext)!;

  useEffect(() => {
    store.init();
  }, []);

  const goToPage = (page: number) => {
    console.log(page, "CURR PAGE NUMBER");
    store.getProducts(page);
  };

  const onFilter = (type: string, value: string) => {
    console.log(type, value);
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
          filterType={store.filter.fields}
          emit={onFilter}
          emitClear={cancelFilter}
        />

        <Pagination
          totalItem={store.pageCount.pageCount}
          maxShowItem={5}
          goToPage={goToPage}
          isLoading={store.pageCount.isLoading}
        />
      </div>
    </main>
  );
}
