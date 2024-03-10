import { useState } from "react";

import { apiService, ResponseError, IProductType } from "@/infrastructure";

export function useProducts() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [products, setProducts] = useState<IProductType[]>([]);

  const initProducts = async (pageNumber: number = 1) => {
    setIsLoading(true);
    const data = await apiService.apiGetProducts(pageNumber);
    if (data instanceof ResponseError) {
      setIsLoading(false);
      return;
    }

    console.log(data);

    setProducts(data);
    setIsLoading(false);
  };

  const getProductsByIds = async (ids: string[]) => {
    setIsLoading(true);
    const data = await apiService.apiGetProductsByIds(ids);

    if (data instanceof ResponseError) {
      setIsLoading(false);
      return;
    }

    console.log(data);

    setProducts(data);
    setIsLoading(false);
  };

  return {
    isLoading,
    products,
    initProducts,
    getProductsByIds,
  };
}
