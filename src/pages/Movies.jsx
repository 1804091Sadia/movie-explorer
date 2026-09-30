
import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import MovieModal from "../components/MovieModal";

function Movies() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch all shows when the page loads
  useEffect(() => {
    fetchShows();
  }, []);

  async function fetchShows() {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        "https://api.tvmaze.com/shows"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch shows.");
      }

      const data = await response.json();

      setMovies(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  // Search shows
  useEffect(() => {
    if (!searchTerm.trim()) {
      fetchShows();
      return;
    }

    const delaySearch = setTimeout(() => {
      searchShows(searchTerm);
    }, 500);

    return () => clearTimeout(delaySearch);
  }, [searchTerm]);

  async function searchShows(query) {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `https://api.tvmaze.com/search/shows?q=${encodeURIComponent(
          query
        )}`
      );

      if (!response.ok) {
        throw new Error("Search failed.");
      }

      const data = await response.json();

      // Search endpoint returns objects like:
      // { score: 1, show: {...} }

      const results = data.map((item) => item.show);

      setMovies(results);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="movies-page">
      <div className="movies-header">
        <p className="section-label">MOVIE LIBRARY</p>

        <h1>Explore Movies & Shows</h1>

        <p>
          Search for your favorite movies and TV shows.
        </p>

        <div className="search-container">
          <span>🔍</span>

          <input
            type="text"
            placeholder="Search for a movie..."
            value={searchTerm}
            onChange={(event) =>
              setSearchTerm(event.target.value)
            }
          />
        </div>
      </div>

      {loading && (
        <div className="status-message">
          <div className="spinner"></div>
          <p>Loading movies...</p>
        </div>
      )}

      {error && (
        <div className="error-message">
          <p>{error}</p>

          <button onClick={fetchShows}>
            Try Again
          </button>
        </div>
      )}

      {!loading && !error && movies.length === 0 && (
        <div className="status-message">
          <h2>No shows found</h2>
          <p>Try searching for another title.</p>
        </div>
      )}

      {!loading && !error && movies.length > 0 && (
        <div className="movie-grid">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onDetails={setSelectedMovie}
            />
          ))}
        </div>
      )}

      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </main>
  );
}

export default Movies;
