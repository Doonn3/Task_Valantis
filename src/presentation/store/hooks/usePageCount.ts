import { ResponseError, apiService } from "@/infrastructure";
import { useState } from "react";

export function usePageCount() {
  const [pageCount, setPageCount] = useState(0);

  const [isLoading, setIsLoading] = useState(false);

  const initAmountPages = async () => {
    setIsLoading(true);
    const result = await apiService.apiGetAmountPages();

    if (result instanceof ResponseError) {
      console.error(result.status);
      setIsLoading(false);
      return;
    }

    setPageCount(result);
    setIsLoading(false);
  };

  return {
    isLoading,
    pageCount,
    initAmountPages,
    setPageCount
  };
}
