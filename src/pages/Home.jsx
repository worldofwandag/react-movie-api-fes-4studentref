import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import MovieCard from "../components/ui/MovieCard";

const Home = () => {
  const { searchData, loading } = useOutletContext();
  const [sortOption, setSortOption] = useState("default");

  function sortMovies(movies, option) {
    const sorted = [...movies];

    if (option === "oldest") {
      sorted.sort((a, b) => parseInt(a.Year) - parseInt(b.Year));
    } else if (option === "newest") {
      sorted.sort((a, b) => parseInt(b.Year) - parseInt(a.Year));
    } else if (option === "a-z") {
      sorted.sort((a, b) => a.Title.localeCompare(b.Title));
    } else if (option === "z-a") {
      sorted.sort((a, b) => b.Title.localeCompare(a.Title));
    }

    return sorted;
  }

  const sortedMovies = sortMovies(searchData.results, sortOption);

  return (
    <div className="main">
      <div className="controls">
        <p id="resultsInfo" className="resultsInfo">
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
