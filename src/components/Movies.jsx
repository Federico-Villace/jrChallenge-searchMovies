export const Movies = ({ movies }) => {
  const hasMovies = movies?.length > 0;
  console.log(movies);
  return (
    <ul className="responsive-grid">
      {hasMovies ? (
        movies.map((item) => {
          return (
            <li key={item.id}>
              <p>title: {item.title}</p>
              <p>year: {item.year}</p>
              <img src={item.image} alt={item.title} />
            </li>
          );
        })
      ) : (
        <p>No search found.</p>
      )}
    </ul>
  );
};
