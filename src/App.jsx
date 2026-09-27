import React, { useState, useEffect } from 'react';
import Search from './components/Search';

const API_BASE_URL = 'https://api.themoviedb.org/3';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`,
  },
};

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [movieList, setMovieList] = useState([]);
  const [loadingState, setLoadingState] = useState(false);

  const fetchMovies = async () => {
    setLoadingState(true);
    setErrorMessage('');
    try {
      const endpoint = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
      const response = await fetch(endpoint, API_OPTIONS);

      if (!response.ok) {
        throw new Error(`Failed to fetch movies`);
      }

      const data = await response.json();
      setMovieList(data.results || []);
    } catch (error) {
      console.error(`Error fetching the movies: ${error}`);
      setErrorMessage('Error fetching movies. Please try again later');
    } finally {
      setLoadingState(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);
  return (
    <main>
      <div className="pattern">
        <div className="wrapper">
          <header>
            <img src="./hero.png" alt="logo" />

            <h1>
              Find <span className="text-gradient">Movies</span> You'll enjoy without the Hassle
            </h1>
            <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          </header>
          <section className="all-movies">
            <h2>All Movies</h2>
            {loadingState ? (
              <p className="text-white">Loading...</p>
            ) : errorMessage ? (
              <p className="text-red-500">{errorMessage}</p>
            ) : (
              <ul>
                {movieList.map((movie) => (
                  <li key={movie.id} className="text-white">{movie.title}</li>
                ))}
              </ul>
            )}
          </section>
          <h1 className="text-white">{searchTerm}</h1>
        </div>
      </div>
    </main>
  );
};

export default App;
