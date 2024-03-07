import { useState } from "react";

import {
  apiGetProducts,
  apiGetProductsByIds,
  ResponseError,
  IProductType,
} from "@/infrastructure";

export function useProducts() {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [products, setProducts] = useState<IProductType[]>([]);

  const getProducts = async (pageNumber: number = 1) => {
    setLoading(true);
    const data = await apiGetProducts(pageNumber);

    if (data instanceof ResponseError) {
      setLoading(false);
      return;
    }

    setProducts(data);
    setLoading(false);
  };

  const getProductsByIds = async (ids: string[]) => {
    setLoading(true);
    const data = await apiGetProductsByIds(ids);

    if (data instanceof ResponseError) {
      setLoading(false);
      return;
    }

    console.log(data);

    setProducts(data);
    setLoading(false);
  };

  return {
    isLoading,
    products,
    getProducts,
    getProductsByIds,
  };
}
