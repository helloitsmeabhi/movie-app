import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import "../../src/index.css";

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const location = useLocation();

  // Fetch genres once
  useEffect(() => {
    fetchGenres();
  }, []);

  // Fetch movies when route or genre changes
  useEffect(() => {
    if (!query.trim()) {
      fetchMovies();
    }
  }, [location.pathname]);

  // Fetch genres
  const fetchGenres = async () => {
    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_TMDB_API_KEY}`
      );
      setGenres(res.data.genres);
    } catch (err) {
      console.error("Error fetching genres:", err);
    }
  };

  // Get API endpoint based on route
  const getEndpointFromPath = () => {
    if (location.pathname.includes("top_rated")) return "top_rated";
    if (location.pathname.includes("upcoming")) return "upcoming";
    return "popular";
  };

  // Fetch movies by route or genre
  const fetchMovies = useCallback(async () => {
    setLoading(true);
    setError(null);
  
    try {
      let url;
  
      if (selectedGenre) {
        url = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&with_genres=${selectedGenre}`;
      } else {
        // Move inside fetchMovies
        const endpoint = location.pathname.includes("top_rated")
          ? "top_rated"
          : location.pathname.includes("upcoming")
          ? "upcoming"
          : "popular";
  
        url = `https://api.themoviedb.org/3/movie/${endpoint}?api_key=${process.env.REACT_APP_TMDB_API_KEY}`;
      }
  
      const res = await axios.get(url);
      setMovies(res.data.results);
    } catch (err) {
      console.error("Error fetching movies:", err);
      setError("Failed to load movies.");
    } finally {
      setLoading(false);
    }
  }, [selectedGenre, location.pathname]);
  

  // Handle genre filter
  const handleGenreChange = (e) => {
    setSelectedGenre(e.target.value);
    setQuery("");
  };

  // Watch genre change and fetch
  useEffect(() => {
    fetchMovies();
  }, [selectedGenre, fetchMovies]);

  // Handle search by title
  const handleSearch = async () => {
    if (!query.trim()) {
      fetchMovies();
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&query=${query}`
      );
      setMovies(res.data.results);
    } catch (err) {
      console.error("Error searching movies:", err);
      setError("Failed to search movies.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Search Bar */}
      <div className="searchBar">
        <input
          type="text"
          placeholder="Search movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleSearch();
            }
          }}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {/* Genre Filter */}
      <div className="filterBar">
        <select value={selectedGenre} onChange={handleGenreChange}>
          <option value="">All Genres</option>
          {genres.map((genre) => (
            <option key={genre.id} value={genre.id}>{genre.name}</option>
          ))}
        </select>
      </div>

      {/* Loading/Error */}
      {loading && <p>Loading movies...</p>}
      {error && <p className="errorText">{error}</p>}

      {/* Movie Grid */}
      <div className="movieGrid">
        {movies.map((movie) => (
          <Link to={`/movie/${movie.id}`} key={movie.id} className="movieCard">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
            <h3>{movie.title}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MovieList;
