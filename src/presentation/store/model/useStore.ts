import { useSearchByFilter } from "../hooks/useSearchByFilter";
import { usePages } from "../hooks/usePages";
import { useProducts } from "../hooks/useProducts";

export function useStore() {
  const products = useProducts();
  const searchByFilter = useSearchByFilter();
  const pages = usePages();

  const init = () => {
    searchByFilter.initFields();
    products.initProducts();
    pages.initAmountPages();
  };

  const getProducts = (pageNumber: number = 1) => {
    if (searchByFilter.searchResult.length > 0) {
      products.getProductsByIds(searchByFilter.searchResult[pageNumber - 1]);
    } else {
      products.initProducts(pageNumber);
    }
  };

  const searchProducts = async (type: string, value: string) => {
    const resultSearch = await searchByFilter.search(type, value); // Возвращает массив айдишек в виду [][]
    if (!resultSearch) return;

    pages.setTotalPageCount(resultSearch.length);

    products.getProductsByIds(resultSearch[0]);
  };

  const resetSearchResult = async () => {
    searchByFilter.resetSearchResult();
    pages.initAmountPages();
    products.initProducts();
  };

  return {
    products,
    searchByFilter,
    pages,
    getProducts,
    searchProducts,
    resetSearchResult,
    init,
  };
}
