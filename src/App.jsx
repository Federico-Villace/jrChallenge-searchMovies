import { useState, useRef, useEffect } from "react";
import { Movies } from "./components/Movies";
import { useMovies } from "./hooks/useMovies";

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
    if (search.length < 3) {
      setError("searches with less than 3 characters are not allowed.");
      return;
    }
    setError(null);
  }, [search]);

  return { search, setSearch, error };
}

function App() {
  const { search, setSearch, error } = useSearch();

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
        {error && <p style={{ color: "red" }}>{error}</p>}
        <div>
          <Movies movies={movies} />
        </div>
      </main>
    </div>
  );
}

export default App;
