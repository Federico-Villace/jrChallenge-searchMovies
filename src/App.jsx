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
  const [sort, setSort] = useState(false);
  const { search, setSearch, error } = useSearch();

  const { movies, getMovies, loading } = useMovies({ search, sort });

  const handleChange = (e) => {
    const search = e.target.value;
    setSearch(search);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getMovies({ search });
  };

  const handleSort = () => {
    setSort(!sort);
  };

  return (
    <div className="App">
      <main>
        <header>
          <h1 className="mainTitle">
            {" "}
            Find the movie or serie you're looking for!{" "}
          </h1>
          <form className="form" onSubmit={handleSubmit}>
            <div className="searchMovies">
              <input
                type={"text"}
                onChange={handleChange}
                value={search}
                placeholder="Avengers, Harry Potter, Etc..."
              />
              <button type="submit">Search</button>
            </div>
            <div className="sortedMovies">
              <p>Sort by alphabetical order</p>
              <input type="checkbox" onChange={handleSort} checked={sort} />
            </div>
          </form>
        </header>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <div style={{ width: "100%" }}>
          {loading ? <p>Loading... ...</p> : <Movies movies={movies} />}
        </div>
      </main>
    </div>
  );
}

export default App;
