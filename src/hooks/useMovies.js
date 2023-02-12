import noResults from "../mocks/no-results.json";
import { useState } from "react";

const URL = "https://www.omdbapi.com/";

export function useMovies({ search }) {
  async function getMovies() {
    if (search === "") return null;

    try {
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=${API_KEY}&s=${search}`
      );
      const json = await response.json();

      const movies = json.Search;

      console.log(movies);
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
  const mappedMovies = getMovies();

  return { movies: mappedMovies, getMovies };
}
