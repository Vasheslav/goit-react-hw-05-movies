import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';

const Movies = () => {
  const location = useLocation();
  const [movieName, setMovieName] = useState('');
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios
      .get('https://api.themoviedb.org/3/search/movie', {
        params: {
          api_key: '010a12c35498ee121131bb88bb81731c',
          query: movieName,
          include_adult: false,
          language: 'en-US',
          page: 1,
        },
      })
      .then(res => {
        setMovies(res.data.results);
        console.log(res.data.results);
      })
      .catch(error => error());
  }, [movieName]);

  const handleNameChange = ev => {
    setMovieName(ev.currentTarget.value.toLowerCase());
  };

  return (
    <main>
      <form>
        <input
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search movies"
          value={movieName}
          onChange={handleNameChange}
        />
      </form>

      <ul>
        {movies.map(movie => (
          <li key={movie.id}>
            <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default Movies;
