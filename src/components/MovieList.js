import React, { useEffect, useState } from "react";
import axios from "axios";
import "./MovieList.css"; // Add styles here

const MovieList = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchPopular = async () => {
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_TMDB_API_KEY}`
        );
        setMovies(res.data.results);
      } catch (err) {
        console.error("Error fetching movies:", err);
      }
    };

    fetchPopular();
  }, []);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);

    useEffect(() => {
    const fetchGenres = async () => {
        const res = await axios.get(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_TMDB_API_KEY}`
        );
        setGenres(res.data.genres);
    };
    fetchGenres();
    }, []);

    const handleGenreChange = async (e) => {
    const genreId = e.target.value;
    setSelectedGenre(genreId);

    const res = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&with_genres=${genreId}`
    );
    setMovies(res.data.results);
    };
    
  return (
    
    <div className="movieGrid">
      {movies.map((movie) => (
        <div className="movieCard" key={movie.id}>
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
          />
          <h3>{movie.title}</h3>
        </div>
      ))}
    </div>
  );
};

export default MovieList;
