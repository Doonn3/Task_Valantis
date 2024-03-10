import { useFilter } from "../hooks/useFilter";
import { usePageCount } from "../hooks/usePageCount";
import { useProducts } from "../hooks/useProducts";

export function useStore() {
  const products = useProducts();
  const filter = useFilter();
  const pageCount = usePageCount();

  const init = () => {
    filter.initFields();
    products.initProducts();
    pageCount.initAmountPages();
  };

  const getProducts = (pageNumber: number = 1) => {
    if (filter.filterResult.length > 0) {
      products.getProductsByIds(filter.filterResult[pageNumber - 1]);
    } else {
      products.initProducts(pageNumber);
    }
  };

  const searchProducts = async (type: string, value: string) => {
    const resultSearch = await filter.search(type, value); // Возвращает массив айдишек в виду [][]
    if (!resultSearch) return;

    pageCount.setPageCount(resultSearch.length);

    products.getProductsByIds(resultSearch[0]);
  };

  const resetSearchResult = async () => {
    filter.resetSearchResult();
    pageCount.initAmountPages();
    products.initProducts();
  };

  return {
    products,
    filter,
    pageCount,
    getProducts,
    searchProducts,
    resetSearchResult,
    init,
  };
}
