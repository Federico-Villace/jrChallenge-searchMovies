import { useRef, useState } from "react";

const URL = "https://www.omdbapi.com/";
import { setSearch } from "../services/movies";

export function useMovies({ search }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const previousSearch = useRef(search);

  const getMovies = async () => {
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
  };

  return { movies, getMovies, loading };
}
