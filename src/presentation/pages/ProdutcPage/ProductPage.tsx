import style from "./style.module.css";

import { useContext, useEffect } from "react";
import { StoreContext } from "@/presentation/store";

import { Pagination } from "./components/Pagination";
import { ProductList } from "./components/ProductList";
import { Filter } from "./components/Filter";

export function ProductPage() {
  const { storeFilter, storePageAmount, storeProducts } =
    useContext(StoreContext)!;

  useEffect(() => {
    storePageAmount.getAmountPages();
    storeProducts.getProducts();
    storeFilter.getFields();
  }, []);

  const onPagination = (page: number) => {
    console.log(page, "CURR PAGE NUMBER");
    storeProducts.getProducts(page);
  };

  const onFilter = (type: string, value: string) => {
    console.log(type, value);
    storeFilter.search(type, value).then(() => storeProducts.getProductsByIds(storeFilter.filterResult));
  };

  return (
    <main className={style.productPage}>
      <ProductList
        products={storeProducts.products}
        isLoading={storeProducts.isLoading}
      />

      <div className={style.productPage__control}>
        <Filter filterType={storeFilter.fields} emit={onFilter} />

        <Pagination
          min={1}
          max={storePageAmount.pageCount}
          isLoading={storePageAmount.isLoading}
          onPageChange={onPagination}
        />
      </div>
    </main>
  );
}
