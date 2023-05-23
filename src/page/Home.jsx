import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

const Home = () => {
  const [listMovie, setListMovie] = useState([]);
  useEffect(() => {
    axios
      .get(
        'https://api.themoviedb.org/3/trending/movie/day?api_key=010a12c35498ee121131bb88bb81731c&language=en-US'
      )
      .then(res => {
        console.log(res);
      })
      .catch(error => error());
    console.log();
  });

  return (
    <main>
      <h1>Home list</h1>
    </main>
  );
};

export default Home;
