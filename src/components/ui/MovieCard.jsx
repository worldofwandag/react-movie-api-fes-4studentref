import React, { useState } from "react";

const MovieCard = ({ movie }) => {
  const [imageError, setImageError] = useState(false);
  const poster = movie.Poster !== 'N/A' ? movie.Poster : '';
  const showPlaceholder = !poster || imageError;

  return (
    <div className="movie-card">
      {!showPlaceholder ? (
        <img
          src={poster}
          alt={movie.Title}
          className="movie-card__img"
          onError={() => setImageError(true)}
        />
      ) : (
        <div className="movie-card__poster-placeholder">
          Movie Poster<br />Not Available
        </div>
      )}
      <h2 className="movie-card__title">{movie.Title}</h2>
      <p className="movie-card__year">{movie.Year}</p>
    </div>
  );
};

export default MovieCard;
