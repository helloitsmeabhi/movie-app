import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

const MovieList = ({ type }) => {
  const [movies, setMovies] = useState([]);
  const params = useParams();
  const movieType = params.type || type || 'popular';

  useEffect(() => {
    console.log(process.env.REACT_APP_TMDB_API_KEY); 
    axios.get(`https://api.themoviedb.org/3/movie/${movieType}?api_key=${process.env.REACT_APP_TMDB_API_KEY}`)
      .then(res => setMovies(res.data.results))
      .catch(err => {
        console.error('Error fetching movies:', err);
      });
  }, [movieType]);

  return (
    <div className="movieList">
      {movies.map(movie => (
        <Link key={movie.id} to={`/movie/${movie.id}`} className="movieCard">
          <img src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} alt={movie.title} />
          <p>{movie.title}</p>
        </Link>
      ))}
    </div>
  );
};

export default MovieList;