import { useEffect, useState,useCallback } from "react";
import { useFetch } from "./useFetch";

export function usePagination(url) {
  const [filters, setFilters] = useState({
    page: 1,
    last: 0,
  });

  const fetcher = useFetch(url, {
    params: filters,
  });

  useEffect(() => {
    if (fetcher.response == null) return;
    const {
      response: { data },
    } = fetcher;
    const pageMax = data["page_max"];
    setFilters((old) => ({ ...old, last: pageMax }));
  }, [fetcher.response]);

  const goPrev = useCallback(() => {
    if (filters.page == 1) return;
    setFilters((old) => ({ ...old, page: old["page"] - 1 }));
  }, [filters]);

  const goNext = useCallback(() => {
    if (filters.page + 1 > filters.last) return;
    setFilters((old) => ({ ...old, page: old["page"] + 1 }));
  }, [filters]);

  const goFirst = useCallback(() => {
    setFilters((old) => ({ ...old, page: 1 }));
  }, [filters]);

  const goLast = useCallback(() => {
    setFilters((old) => ({ ...old, page: filters.last }));
  }, [filters]);

  return {
    ...fetcher,
    setFilters,
    goFirst,
    goPrev,
    goNext,
    goLast
  };
}
