export const Movies = ({ movies }) => {
  const hasMovies = movies?.length > 0;
  return (
    <ul className="responsive-grid">
      {hasMovies ? (
        movies.map((item) => {
          return (
            <div className="card">
              <h5 className="title">{item.title}</h5>
              <li className="card-info" key={item.id}>
                <img className="img" src={item.image} alt={item.title} />
                <p>Year of Release: {item.year}</p>
              </li>
            </div>
          );
        })
      ) : (
        <p>No search found.</p>
      )}
    </ul>
  );
};
