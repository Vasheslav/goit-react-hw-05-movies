import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const [listMovie, setListMovie] = useState([]);

  useEffect(() => {
    axios
      .get(
        'https://api.themoviedb.org/3/trending/movie/day?api_key=010a12c35498ee121131bb88bb81731c&language=en-US'
      )
      .then(res => {
        setListMovie(res.data.results);
      })
      .catch(error => console.error(error));
  }, []);

  return (
    <main>
      <ul>
        {listMovie.map(movie => (
          <li key={movie.id}>
            <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default Home;
