import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import MovieDetails from "./components/MovieDetails";
import MovieList from "./components/MovieList";
import Header from "./components/Header";
import Error from "./components/Error";
import './index.css';

const App = () => {
  return (
    <div className='App'>
      <Router>
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="movie/:id" element={<MovieDetails />} />
          <Route path="movies/:type" element={<MovieList />} />
          <Route path="/*" element={<Error />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
