import { useRef, useState, useMemo, useCallback } from "react";

const URL = "https://www.omdbapi.com/";
import { setSearch } from "../services/movies";

export function useMovies({ search, sort }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const previousSearch = useRef(search);

  const getMovies = useCallback(async ({ search }) => {
    if (previousSearch.current === search) return;
    try {
      setLoading(true);
      previousSearch.current = search;
      const newMovies = await setSearch({ search });
      setMovies(newMovies);
    } catch (e) {
      throw new Error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  const sortedMovies = useMemo(() => {
    return sort
      ? [...movies].sort((a, b) => a.title.localeCompare(b.title))
      : movies;
  }, [movies, sort]);

  return { movies: sortedMovies, getMovies, loading };
}
