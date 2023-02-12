import { useState } from "react";
import "./App.css";
import { Movies } from "./components/Movies";
import { useMovies } from "./hooks/useMovies";

export function useSearch() {
  const [search, setSearch] = useState("");

  return { search, setSearch };
}

function App() {
  const { search, setSearch } = useSearch();

  const { movies, getMovies } = useMovies({ search });

  const handleChange = (e) => {
    const search = e.target.value;
    setSearch(search);
    console.log({ search });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getMovies({ search });
  };
  console.log(movies);

  return (
    <div className="App">
      <main>
        <header>
          <form className="form" onSubmit={handleSubmit}>
            <input
              type={"text"}
              onChange={handleChange}
              value={search}
              placeholder="Avengers, The Simpsons, etc..."
            />
            <button type="submit">Search</button>
          </form>
        </header>
        <div>
          <Movies movies={movies} />
        </div>
      </main>
    </div>
  );
}

export default App;
