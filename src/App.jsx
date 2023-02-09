import { useState } from "react";
import "./App.css";
import resultMovies from "./mocks/with-results.json";
import noResultMovies from "./mocks/no-results.json";

function App() {
  const movies = resultMovies.Search;
  const hasMovies = movies?.length > 0;

  console.log(movies);

  return (
    <div className="App">
      <main>
        <header>
          <form className="form">
            <input type={"text"} placeholder="Avengers, The Simpsons, etc..." />
            <button type="submit">Search</button>
          </form>
        </header>
        <div>
          {hasMovies ? (
            movies.map((item) => {
              return (
                <ul key={item.imdbID}>
                  <p>title: {item.Title}</p>
                  <p>year: {item.Year}</p>
                  <img src={item.Poster} />
                </ul>
              );
            })
          ) : (
            <p>No search found.</p>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
