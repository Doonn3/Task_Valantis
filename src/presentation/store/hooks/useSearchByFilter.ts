import { ResponseError, apiService } from "@/infrastructure";
import { useState } from "react";

export function useSearchByFilter() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [fields, setFields] = useState<string[]>([]);
  const [searchResult, setSearchResult] = useState<string[][]>([]);

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

    setSearchResult(result);
    setIsLoading(false);
    return result;
  };

  const resetSearchResult = () => {
    setSearchResult([]);
  };

  return {
    isLoading,
    fields,
    searchResult,
    initFields,
    search,
    resetSearchResult
  };
}
