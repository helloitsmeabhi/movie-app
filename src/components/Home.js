import MovieList from './MovieList';

const Home = () => {
  return (
    <div className='home'>
      <h2>Popular Movies</h2>
      <MovieList type="popular" />
    </div>
  );
};

export default Home;
