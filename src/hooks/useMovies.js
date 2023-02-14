import { useState } from "react";

const URL = "https://www.omdbapi.com/";
import { setSearch } from "../services/movies";

export function useMovies({ search }) {
  const [movies, setMovies] = useState([]);

  const getMovies = async () => {
    try {
      const newMovies = await setSearch({ search });
      setMovies(newMovies);
    } catch (e) {
      throw new Error(e);
    }
  };

  return { movies, getMovies };
}
