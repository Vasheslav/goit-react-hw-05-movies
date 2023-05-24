import { Link, Outlet } from 'react-router-dom';
import { useParams, useLocation } from 'react-router-dom';
import { Suspense, useState, useEffect } from 'react';
import axios from 'axios';

const MovieDetails = () => {
  const { movieId } = useParams();
  const [movieInfo, setMovieInfo] = useState({});
  // const location = useLocation();
  // const backLinkHref = location.state?.from ?? '/movies';

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=010a12c35498ee121131bb88bb81731c&language=en-US`
      )
      .then(res => {
        setMovieInfo(res.data);
        console.log(res.data);
      })
      .catch(error => error());
  }, []);

  // console.log(movieInfo.release_date.split('-')[0]);
  const genres = movieInfo.genres;

  return (
    <main>
      {/* <div to={backLinkHref}>Back to search</div> */}
      <div>
        <img src={movieInfo.poster_path} alt="" />
        <h2>
          {/* {movieInfo.title} ({movieInfo.release_date.split('-')[0]}) */}
        </h2>
        <p>User Score: {Math.floor(movieInfo.vote_average * 10)}%</p>
        <h3>Overview</h3>
        <p>{movieInfo.overview}</p>
        <h3>Genres</h3>
        <ul>
          {/* {genres.map(item => (
            <li key={item.id}>{item.name}</li>
          ))} */}
        </ul>
      </div>
      <p>Additional information</p>
      <ul>
        <li>
          <Link to="cast">Cast</Link>
        </li>
        <li>
          <Link to="reviews">Reviews</Link>
        </li>
      </ul>
      <Suspense fallback={<div>Loading subpage...</div>}>
        <Outlet />
      </Suspense>
    </main>
  );
};

export default MovieDetails;
