import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';

const Reviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=010a12c35498ee121131bb88bb81731c&language=en-US&page=1`
      )
      .then(res => {
        setReviews(res.data.results);
        console.log(res);
      })
      .catch(error => error());
  }, []);

  if (reviews.length === 0) {
    return <p>We dont have any reviews for this movie</p>;
  }

  if (reviews.length > 0) {
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
// const Reviews = () => {
//   return <div>information 2</div>;
// };

export default Reviews;
