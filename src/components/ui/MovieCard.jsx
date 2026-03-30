import React, { useState } from "react";
import { Link } from "react-router-dom";

const MovieCard = ({ movie, skeleton }) => {
  const [imageError, setImageError] = useState(false);
  
  if (skeleton) {
    return (
      <div className="movie-card movie-card--skeleton">
        <div className="movie-card__img--skeleton"></div>
        <div className="movie-card__title--skeleton"></div>
        <div className="movie-card__year--skeleton"></div>
      </div>
    );
  }
  
  const poster = movie.Poster !== "N/A" ? movie.Poster : "";
  const showPlaceholder = !poster || imageError;

  return (
    <div className="movie-card">
      <Link to={`/${movie.imdbID}`}>
        {!showPlaceholder ? (
          <img
            src={poster}
            alt={movie.Title}
            className="movie-card__img"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="movie-card__poster-placeholder">
            Movie Poster
            <br />
            Not Available
          </div>
        )}
        <h2 className="movie-card__title">{movie.Title}</h2>
        <p className="movie-card__year">{movie.Year}</p>
      </Link>
    </div>
  );
};

export default MovieCard;
