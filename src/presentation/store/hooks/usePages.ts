import { ResponseError, apiService } from "@/infrastructure";
import { useState } from "react";

export function usePages() {
  const [totalPageCount, setTotalPageCount] = useState(0);

  const [isLoading, setIsLoading] = useState(false);

  const initAmountPages = async () => {
    setIsLoading(true);
    const result = await apiService.apiGetAmountPages();

    if (result instanceof ResponseError) {
      console.error(result.status);
      setIsLoading(false);
      return;
    }

    setTotalPageCount(result);
    setIsLoading(false);
  };

  return {
    isLoading,
    totalPageCount,
    initAmountPages,
    setTotalPageCount
  };
}
