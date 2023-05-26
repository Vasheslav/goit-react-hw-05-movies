import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Loader } from '../components/Loader';

const Cast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    setStatus('pending');

    axios
      .get(
        `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=010a12c35498ee121131bb88bb81731c&language=en-US`
      )
      .then(res => {
        setCast(res.data.cast);
        setStatus('resolved');
      })
      .catch(error => console.error(error));
  }, [movieId]);

  const posterBaseUrl = 'https://image.tmdb.org/t/p/';

  if (status === 'pending') {
    return <Loader />;
  }

  if (status === 'resolved' && cast.length === 0) {
    return <p>We dont have information about cast</p>;
  }

  if (status === 'resolved' && cast.length > 0) {
    return (
      <ul>
        {cast.map(item => (
          <li key={item.cast_id}>
            {item.profile_path && (
              <img
                src={`${posterBaseUrl}w200${item.profile_path}`}
                alt=""
                width={90}
              />
            )}

            <p>{item.name}</p>
            <p>{item.character}</p>
          </li>
        ))}
      </ul>
    );
  }
};

export default Cast;
