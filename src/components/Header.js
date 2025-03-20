import { Link } from 'react-router-dom';
import '../index.css';

const Header = () => {
  return (
    <div className='header'>
      <div className='headerLeft'>
        <Link to="/">
        <img src="https://upload.wikimedia.org/wikipedia/commons/6/67/Breezeicons-apps-48-smplayer.svg" className="header__icon" alt="Movie Icon" />
        </Link>
        <Link to="movies/popular"><span>Popular</span></Link>
        <Link to="movies/top_rated"><span>Top Rated</span></Link>
        <Link to="movies/upcoming"><span>Upcoming</span></Link>
      </div>
    </div>
  );
};

export default Header;
