import { useState, useEffect } from "react";
import Search from "./components/Search";
import MovieList from "./components/MovieList";
import MovieDetails from './components/MovieDetails';
import { Routes, Route } from "react-router-dom"; // only Routes & Route
import './App.css'

function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (query === "") {
      setMovies([]);
      setError("");
      return;
    }

    const fetchMovies = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=dc1d05a48335662a49f759b8bff9693e&query=${query}`
        );
        const data = await response.json();
        if (data.results.length > 0) {
          setMovies(data.results);
          setError("");
        } else {
          setMovies([]);
          setError("Aucun film trouvé !");
        }
      } catch (err) {
        setMovies([]);
        setError("Erreur lors de la recherche");
      }
    };

    fetchMovies();
  }, [query]);

  return (
    <div>
      <h1>Netflix</h1>
      <Routes>
        <Route 
          path="/"
          element={
            <>
              <Search query={query} setQuery={setQuery} />
              {error && <p>{error}</p>}
              <MovieList movies={movies} />
            </>
          }
        />
        <Route 
          path="/movie/:id"
          element={<MovieDetails />}
        />
      </Routes>
    </div>
  );
}

export default App;
