import { useState } from "react";
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
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getMovies({ search });
  };

  return (
    <div className="App">
      <main>
        <header>
          <h1 className="title"> Movies Finder </h1>
          <form className="form" onSubmit={handleSubmit}>
            <input
              type={"text"}
              onChange={handleChange}
              value={search}
              placeholder="Avengers, Harry Potter, etc..."
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
