import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Loader } from '../components/Loader';

const Reviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    setStatus('pending');

    axios
      .get(
        `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=010a12c35498ee121131bb88bb81731c&language=en-US&page=1`
      )
      .then(res => {
        setReviews(res.data.results);
        setStatus('resolved');
      })
      .catch(error => console.error(error));
  }, [movieId]);

  if (status === 'pending') {
    return <Loader />;
  }

  if (status === 'resolved' && reviews.length === 0) {
    return <p>We dont have any reviews for this movie</p>;
  }

  if (status === 'resolved' && reviews.length > 0) {
    return (
      <ul>
        {reviews.map(item => (
          <li key={item.id}>
            <h3>Autor: {item.author}</h3>
            <p>{item.content}</p>
          </li>
        ))}
      </ul>
    );
  }
};

export default Reviews;
