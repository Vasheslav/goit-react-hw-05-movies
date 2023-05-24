import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';

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
  }, []);

  return (
    <ul>
      {cast.map(item => (
        <li key={item.cast_id}>
          <img src={item.profile_path} alt="" />
          <p>{item.name}</p>
          <p>{item.character}</p>
        </li>
      ))}
    </ul>
  );
};

export default Cast;
