import { useState } from "react";
import {
  apiGetFields,
  apiSearchIds,
  ResponseError,
} from "@/infrastructure";

export function useFilterFields() {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [fields, setFields] = useState<string[]>([]);
  const [filterResult, setFilter] = useState<string[]>([]);

  const getFields = async () => {
    setLoading(true);

    const data = await apiGetFields();

    if (data instanceof ResponseError) {
      setLoading(false);
      return;
    }

    setFields(data);

    setLoading(false);
  };

  const search = async (type: string, value: string) => {
    setLoading(true);

    const result = await apiSearchIds({[type]: value});

    if (result instanceof ResponseError) {
      setLoading(false);
      console.error(result.status, result.errorText);
      return;
    }

    setFilter(result);
    setLoading(false);
  };

  return {
    isLoading,
    fields,
    filterResult,
    getFields,
    search,
  };
}
