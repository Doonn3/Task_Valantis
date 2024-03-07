import { apiGetAmountPages, ResponseError } from "@/infrastructure";

import { useState } from "react";

export function usePageCount() {
  const [pageCount, setPageCount] = useState(0);

  const [isLoading, setLoading] = useState(false);

  const getAmountPages = async () => {
    setLoading(true);
    const result = await apiGetAmountPages();

    if (result instanceof ResponseError) {
      console.error(result.status);
      setLoading(false);
      return;
    }

    setPageCount(result);
    setLoading(false);
  };

  return {
    isLoading,
    pageCount,
    getAmountPages,
  };
}
