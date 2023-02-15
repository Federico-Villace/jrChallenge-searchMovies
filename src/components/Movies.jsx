import withResults from "../mocks/with-results.json";

export const Movies = ({ movies }) => {
  const hasMovies = movies?.length > 0;
  return (
    <ul className="responsive-grid">
      {hasMovies
        ? movies.map((item) => {
            return (
              <div className="card" key={item.id}>
                <h5 className="title">{item.title}</h5>
                <li className="card-info">
                  <img className="img" src={item.image} alt={item.title} />
                  <p>Year of Release: {item.year}</p>
                </li>
              </div>
            );
          })
        : withResults.Search.map((item) => {
            return (
              <div className="card" key={item.imdbID}>
                <h5 className="title">{item.Title}</h5>
                <li className="card-info">
                  <img className="img" src={item.Poster} alt={item.Title} />
                  <p>Year of Release: {item.Year}</p>
                </li>
              </div>
            );
          })}
    </ul>
  );
};
