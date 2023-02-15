export const Movies = ({ movies }) => {
  const hasMovies = movies?.length > 0;
  return (
    <ul className="responsive-grid">
      {hasMovies ? (
        movies.map((item) => {
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
      ) : (
        <p>No search found.</p>
      )}
    </ul>
  );
};
