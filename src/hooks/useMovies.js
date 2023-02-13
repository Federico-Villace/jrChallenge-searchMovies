import noResults from "../mocks/no-results.json";
import { useState } from "react";

const URL = "https://www.omdbapi.com/";
const API_KEY = "f425c4f9";

export async function setSearch({ search }) {
  if (search === "") return null;

  try {
    const response = await fetch(
      `https://www.omdbapi.com/?apikey=${API_KEY}&s=${search}`
    );
    const json = await response.json();

    const movies = json.Search;

    return movies?.map((movie) => ({
      id: movie.imdbID,
      title: movie.Title,
      year: movie.Year,
      image: movie.Poster,
    }));
  } catch (e) {
    throw new Error("Error searching movies");
  }
}

export function useMovies({ search }) {
  const [movies, setMovies] = useState([]);

  const getMovies = async () => {
    try {
      const newMovies = await setSearch({ search });
      setMovies(newMovies);
      console.log("movies", movies);
    } catch (e) {
      throw new Error(e);
    }
  };

  return { movies, getMovies };
}
