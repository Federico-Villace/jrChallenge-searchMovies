import { useState, useRef, useEffect } from "react";

export function useSearch() {
  const [search, setSearch] = useState("");
  const [error, setError] = useState(null);
  const isFirstInput = useRef(true);

  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = search === "";
      return;
    }
    if (search === "") {
      setError("Empty search not allowed!");
      return;
    }
    setError(null);
  }, [search]);

  return { search, setSearch, error };
}
