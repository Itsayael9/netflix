import React from "react";
import { useParams, useNavigate } from 'react-router-dom';

export default function MovieDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState("");
    const [movie, setMovie] = React.useState('')
    
    React.useEffect(() => {
      const fetchMovieDetail = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=dc1d05a48335662a49f759b8bff9693e&language=fr-FR`
        );
        const data = await response.json();
        
        console.log("Movie data:", data); 
        
        // console.log("Available keys:", Object.keys(data));  
        
        setMovie(data);
        setLoading(false);
      } catch (err) {
        setError("Erreur lors du chargement du film !");
        setLoading(false);
      }
    };

    fetchMovieDetail();
  }, [id]);

  if (loading) return <div>Chargement ...</div>
  if (error) return <div>{error}</div>

  return (
    <div className="movie-detail">
      <button onClick={() => navigate(-1)} className="back-button">
        Retour
      </button>

      {/* Backdrop Image */}
      {movie.backdrop_path && (
        <div 
          className="backdrop"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`
          }}
        />
      )}

      <div className="movie-detail-content">

        {/* Poster */}
        {movie.poster_path && (
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="poster"
          />
        )}

        <div className="movie-info">
          {/* Title */}
          <h1>{movie.title}</h1>

          {/* Tagline */}
          {movie.tagline && (
            <p className="tagline">"{movie.tagline}"</p>
          )}

          {/* Basic Info */}
          <div className="meta-info">
            {movie.release_date && (
              <span>{movie.release_date}</span>
            )}
            {movie.runtime && (
              <span>{movie.runtime} min</span>
            )}
            {movie.vote_average > 0 && (
              <span>{movie.vote_average.toFixed(1)}/10</span>
            )}
            {movie.status && (
              <span>{movie.status}</span>
            )}
          </div>

          {/* Genres */}
          {movie.genres && movie.genres.length > 0 && (
            <div className="genres">
              {movie.genres.map((genre) => (
                <span key={genre.id} className="genre-tag">
                  {genre.name}
                </span>
              ))}
            </div>
          )}

          {/* Overview */}
          {movie.overview && (
            <div className="overview">
              <h3>Synopsis</h3>
              <p>{movie.overview}</p>
            </div>
          )}

          {/* Original Title (if different) */}
          {movie.original_title !== movie.title && (
            <p><strong>Titre original:</strong> {movie.original_title}</p>
          )}

          {/* Languages */}
          {movie.spoken_languages && movie.spoken_languages.length > 0 && (
            <p>
              <strong>Langues:</strong>{" "}
              {movie.spoken_languages.map(lang => lang.english_name).join(", ")}
            </p>
          )}

          {/* Budget & Revenue */}
          <div className="financial-info">
            {movie.budget > 0 && (
              <p><strong>Budget:</strong> ${movie.budget.toLocaleString()}</p>
            )}
            {movie.revenue > 0 && (
              <p><strong>Revenus:</strong> ${movie.revenue.toLocaleString()}</p>
            )}
          </div>

          {/* Production Companies */}
          {movie.production_companies && movie.production_companies.length > 0 && (
            <div className="production">
              <h3>Production</h3>
              <div className="companies">
                {movie.production_companies.map((company) => (
                  <div key={company.id} className="company">
                    {company.logo_path && (
                      <img
                        src={`https://image.tmdb.org/t/p/w200${company.logo_path}`}
                        alt={company.name}
                      />
                    )}
                    <span>{company.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Vote Count */}
          {movie.vote_count > 0 && (
            <p className="vote-count">
              Basé sur {movie.vote_count.toLocaleString()} votes
            </p>
          )}
        </div>
      </div>
    </div>
  );

}