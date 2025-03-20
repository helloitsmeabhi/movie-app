import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import '../../src/index.css';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);

  // Fetch movie details and cast
  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const movieRes = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}`
        );
        const castRes = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.REACT_APP_TMDB_API_KEY}`
        );

        setMovie(movieRes.data);
        setCast(castRes.data.cast.slice(0, 10)); // Show top 10 cast
        checkFavorite(movieRes.data.id);
      } catch (err) {
        console.error('Error fetching movie data:', err);
      }
    };

    fetchMovieData();
  }, [id]);

  // Check if movie is in localStorage favorites
  const checkFavorite = (movieId) => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setIsFavorite(favorites.some((fav) => fav.id === movieId));
  };

  // Toggle favorite status
  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    if (isFavorite) {
      const updated = favorites.filter((fav) => fav.id !== movie.id);
      localStorage.setItem('favorites', JSON.stringify(updated));
      setIsFavorite(false);
    } else {
      favorites.push({ id: movie.id, title: movie.title, poster: movie.poster_path });
      localStorage.setItem('favorites', JSON.stringify(favorites));
      setIsFavorite(true);
    }
  };

  if (!movie) return <div className="loading">Loading...</div>;

  return (
    <div className="movieDetailsContainer">
      <div className="movieDetailsCard">
        <img
          src={`https://image.tmdb.org/t/p/w780${movie.backdrop_path}`}
          alt={movie.title}
          className="movieDetailsImage"
        />
        <div className="movieDetailsContent">
          <h1>{movie.title}</h1>
          <p className="tagline">{movie.tagline}</p>
          <p>{movie.overview}</p>
          <p><strong>Genres:</strong> {movie.genres.map(g => g.name).join(', ')}</p>
          <p><strong>Rating:</strong> {movie.vote_average}</p>
          <p><strong>Release Date:</strong> {movie.release_date}</p>
          <p><strong>Runtime:</strong> {movie.runtime} min</p>

          {/* Favorite Button */}
          <button className="favoriteBtn" onClick={toggleFavorite}>
            {isFavorite ? '❤️ Remove Favorite' : '🤍 Add to Favorites'}
          </button>

          {/* Cast List */}
          <h3 style={{ marginTop: '20px' }}>Cast:</h3>
          <div className="castGrid">
            {cast.map((actor) => (
            <div key={actor.cast_id} className="castCard">
            <img
                src={
                actor.profile_path
                    ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                    : 'https://via.placeholder.com/150x225?text=No+Image'
                }
                alt={actor.name}
                className="castImage"
            />
            <p className="castName">{actor.name}</p>
            <p className="castCharacter">as <em>{actor.character}</em></p>
            </div>
        ))}
        </div>

        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
