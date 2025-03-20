import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}`)
      .then(res => setMovie(res.data));
  }, [id]);

  if (!movie) return <div>Loading...</div>;

  return (
    <div className="movieDetails">
      <img src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`} alt={movie.title} />
      <h1>{movie.title}</h1>
      <p>{movie.overview}</p>
      <p><strong>Rating:</strong> {movie.vote_average}</p>
      <p><strong>Release Date:</strong> {movie.release_date}</p>
    </div>
  );
};

export default MovieDetails;
