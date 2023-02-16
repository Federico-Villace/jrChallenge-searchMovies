import { useState, useRef, useEffect, useId } from "react";
import { Movies } from "./components/Movies";
import { useMovies } from "./hooks/useMovies";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
    setError(null);
  }, [search]);

  return { search, setSearch, error };
}

function App() {
  const [sort, setSort] = useState(false);
  const { search, setSearch, error } = useSearch();
  const toastId = useId();

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

  const toastError = () =>
    toast.error(error, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
      toastId: toastId,
    });

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
            {error ? (
              <>
                <ToastContainer>{toastError(error)}</ToastContainer>
              </>
            ) : (
              ""
            )}
            <div className="sortedMovies">
              <p>Sort by alphabetical order</p>
              <input type="checkbox" onChange={handleSort} checked={sort} />
            </div>
          </form>
        </header>
        <div style={{ width: "100%" }}>
          {loading ? <p>Loading... ...</p> : <Movies movies={movies} />}
        </div>
      </main>
    </div>
  );
}

export default App;
