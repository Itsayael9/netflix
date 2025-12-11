import {useNavigate} from "react-router-dom";

function MovieList({ movies }) {
  const navigate = useNavigate();

  const handleMovieClick = (movieId) => {
    navigate(`/movie/${movieId}`)
  };
  
  return (
    <div className="movie-list">
      {movies.map((movie) => (
        <div 
          key={movie.id} 
          className="movie-card"
          onClick={() => handleMovieClick(movie.id)}
        >
          {movie.poster_path ? (
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
          ) : (
            <p>Image non disponible</p>
          )}
          <h4>{movie.title}</h4>
        </div>
      ))}
    </div>
  );
}

export default MovieList;