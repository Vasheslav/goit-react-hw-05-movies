import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Cast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=010a12c35498ee121131bb88bb81731c&language=en-US`
      )
      .then(res => {
        setCast(res.data.cast);
      })
      .catch(error => error());
  }, [movieId]);

  const posterBaseUrl = 'https://image.tmdb.org/t/p/';

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
};

export default Cast;
