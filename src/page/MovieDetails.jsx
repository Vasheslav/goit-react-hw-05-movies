import { Link, Outlet } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { Suspense, useState, useEffect } from 'react';
import { Loader } from '../components/Loader';
import axios from 'axios';
import {
  FlexConteiner,
  Title,
  Text,
  Subtitle,
  List,
  BorderConteiner,
  ListInformation,
} from './MovieDetails.styled';

const MovieDetails = () => {
  const { movieId } = useParams();
  const [movieInfo, setMovieInfo] = useState({});
  const [status, setStatus] = useState('idle');
  // const location = useLocation();
  // const backLinkHref = location.state?.from ?? '/movies';

  useEffect(() => {
    setStatus('pending');

    axios
      .get(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=010a12c35498ee121131bb88bb81731c&language=en-US`
      )
      .then(res => {
        setMovieInfo(res.data);
        console.log(res.data);
        setStatus('resolved');
      })
      .catch(error => error());
  }, [movieId]);

  const posterBaseUrl = 'https://image.tmdb.org/t/p/';
  const posterPath = movieInfo.poster_path;
  const fullPosterUrl = `${posterBaseUrl}w200${posterPath}`;

  if (status === 'idle') {
    return null;
  }

  if (status === 'pending') {
    return <Loader />;
  }

  if (status === 'resolved') {
    return (
      <main>
        {/* <div to={backLinkHref}>Back to search</div> */}
        <FlexConteiner>
          <div>
            <img src={fullPosterUrl} alt="" />
          </div>
          <div>
            <Title>
              {movieInfo.title} ({movieInfo.release_date?.split('-')[0]})
            </Title>
            <Text>User Score: {Math.floor(movieInfo.vote_average * 10)}%</Text>
            <Subtitle>Overview</Subtitle>
            <Text>{movieInfo.overview}</Text>
            <Subtitle>Genres</Subtitle>
            <List>
              {movieInfo.genres?.map(item => (
                <li key={item.id}>{item.name}</li>
              ))}
            </List>
          </div>
        </FlexConteiner>
        <BorderConteiner>
          <Text>Additional information</Text>
          <ListInformation>
            <li>
              <Link to="cast">Cast</Link>
            </li>
            <li>
              <Link to="reviews">Reviews</Link>
            </li>
          </ListInformation>
        </BorderConteiner>
        <Suspense fallback={<div>Loading subpage...</div>}>
          <Outlet />
        </Suspense>
      </main>
    );
  }
};

export default MovieDetails;
