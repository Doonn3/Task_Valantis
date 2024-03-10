import { ResponseError, apiService } from "@/infrastructure";
import { useState } from "react";

export function useFilter() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [fields, setFields] = useState<string[]>([]);
  const [filterResult, setFilterResult] = useState<string[][]>([]);

  const initFields = async () => {
    setIsLoading(true);

    const data = await apiService.apiGetFields();

    if (data instanceof ResponseError) {
      setIsLoading(false);
      return;
    }

    setFields(data);

    setIsLoading(false);
  };

  const search = async (type: string, value: string) => {
    setIsLoading(true);

    const result = await apiService.apiSearchIds({ [type]: value });

    if (result instanceof ResponseError) {
      setIsLoading(false);
      console.error(result.status, result.errorText);
      return;
    }

    setFilterResult(result);
    setIsLoading(false);
    return result;
  };

  const resetSearchResult = () => {
    setFilterResult([]);
  };

  return {
    isLoading,
    fields,
    filterResult,
    initFields,
    search,
    resetSearchResult
  };
}
