import React, { useState, useEffect } from "react";
import MovieCard from "../components/ui/MovieCard";

const Home = ({ searchData, loading }) => {
  const [sortOption, setSortOption] = useState("default");
  const [sortedMovies, setSortedMovies] = useState([]);

  function sortMovies(movies, option) {
    const sorted = [...movies];

    if (option === "oldest") {
      sorted.sort((a, b) => a.Year - b.Year);
    } else if (option === "newest") {
      sorted.sort((a, b) => b.Year - a.Year);
    } else if (option === "a-z") {
      sorted.sort((a, b) => a.Title.localeCompare(b.Title));
    } else if (option === "z-a") {
      sorted.sort((a, b) => b.Title.localeCompare(a.Title));
    }

    return sorted;
  }

  useEffect(() => {
    const currentMovies = sortMovies(searchData.results, sortOption);
    setSortedMovies(currentMovies);
  }, [searchData.results, sortOption]);
  //putting sortOption in the dependency array will make it run everytime you choose a new sorting option.
  //searchData.results in the dependancy array will make it run everytime you search for new movies.

  return (
    <div className="main">
      <div className="controls">
        <p id="resultsInfo">
          {searchData.results.length > 0 
            ? `Showing: ${searchData.query}` 
            : searchData.query 
              ? 'No Movies Found' 
              : 'Search for a movie'}
        </p>
        <div className="sort__container">
          <label htmlFor="sortSelect">Sort:</label>
          <select 
            id="sortSelect" 
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="default">Default</option>
            <option value="a-z">A - Z</option>
            <option value="z-a">Z - A</option>
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
          </select>
        </div>
      </div>

      <div className="movies-grid" id="moviesGrid">
        {loading ? (
          Array(10).fill(0).map((_, index) => (
            <MovieCard key={index} skeleton={true} />
          ))
        ) : (
          sortedMovies.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
