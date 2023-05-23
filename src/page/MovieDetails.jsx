import { Link, Outlet } from 'react-router-dom';
import { Suspense } from 'react';

const MovieDetails = () => {
  return (
    <main>
      <div>
        <h2>movie - movie.name - id</h2>
      </div>
      <ul>
        <li>
          <Link to="cast">Read about our mission</Link>
        </li>
        <li>
          <Link to="reviews">Get to know the team</Link>
        </li>
      </ul>
      <Suspense fallback={<div>Loading subpage...</div>}>
        <Outlet />
      </Suspense>
    </main>
  );
};

export default MovieDetails;
