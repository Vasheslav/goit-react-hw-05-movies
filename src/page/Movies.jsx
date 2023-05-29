import { useEffect, useState } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import axios from 'axios';

const Movies = () => {
  const [movieName, setMovieName] = useState('');
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') ?? '';
  const location = useLocation();

  useEffect(() => {
    if (query === '') {
      return;
    }

    axios
      .get(
        'https://api.themoviedb.org/3/search/movie?api_key=010a12c35498ee121131bb88bb81731c&include_adult=false&language=en-US&page=1',
        {
          params: {
            api_key: '010a12c35498ee121131bb88bb81731c',
            query: query,
            include_adult: false,
            language: 'en-US',
            page: 1,
          },
        }
      )
      .then(res => {
        setMovies(res.data.results);

        // if (query !== '' && movieName === '') {
        //   setMovieName(query);
        // }
      })
      .catch(error => console.error(error));
  }, [query]);

  const handleSearhValue = e => {
    setMovieName(e.currentTarget.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    setSearchParams({ query: movieName });
  };

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search movies"
          value={movieName}
          onChange={handleSearhValue}
        />
        <button type="submit">Searh</button>
      </form>

      {movies.length === 0 && query !== '' ? (
        <p>Nothing found</p>
      ) : (
        <ul>
          {movies.map(movie => (
            <li key={movie.id}>
              <Link to={`/movies/${movie.id}`} state={{ from: location }}>
                {movie.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
};

export default Movies;
