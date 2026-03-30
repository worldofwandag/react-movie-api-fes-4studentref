import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

const MovieDetails = () => {
  const { imdbID } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  async function getMovieDetails() {
    try {
      setLoading(true);
      const movieData = await axios.get(
        `https://www.omdbapi.com/?apikey=${API_KEY}&i=${imdbID}`,
      );
      setMovie(movieData.data);
    } catch (error) {
      console.error("Error fetching movie details:", error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  }

  useEffect(() => {
    getMovieDetails();
  }, [imdbID]);

  if (loading) {
    return (
      <div className="main">
        <div className="movie-details__container">
          <div className="movie-details__back">
            <Link to="/" className="movie-details__back-link">
              ← Back
            </Link>
          </div>

          <div className="movie-details__content">
            <div className="movie-details__poster--wrapper">
              <div className="movie-details__poster--skeleton"></div>

              <div className="movie-details__info--skeleton">
                <div className="movie-details__title--skeleton"></div>
                <div className="movie-details__info-line--skeleton"></div>
                <div className="movie-details__info-line--skeleton"></div>
                <div className="movie-details__info-line--skeleton"></div>
              </div>
            </div>

            <div className="movie-details__text--wrapper">
              <div className="movie-details__detail--skeleton">
                <div className="movie-details__detail-title--skeleton"></div>
                <div className="movie-details__detail-text--skeleton"></div>
              </div>

              <div className="movie-details__detail--skeleton">
                <div className="movie-details__detail-title--skeleton"></div>
                <div className="movie-details__detail-text--skeleton"></div>
                <div className="movie-details__detail-text--skeleton"></div>
              </div>

              <div className="movie-details__detail--skeleton">
                <div className="movie-details__detail-title--skeleton"></div>
                <div className="movie-details__detail-text--skeleton"></div>
              </div>

              <div className="movie-details__detail--skeleton">
                <div className="movie-details__detail-title--skeleton"></div>
                <div className="movie-details__detail-text--skeleton"></div>
                <div className="movie-details__detail-text--skeleton"></div>
                <div className="movie-details__detail-text--skeleton"></div>
              </div>

              <div className="movie-details__detail--skeleton">
                <div className="movie-details__detail-title--skeleton"></div>
                <div className="movie-details__detail-text--skeleton"></div>
              </div>

              <div className="movie-details__detail--skeleton">
                <div className="movie-details__detail-title--skeleton"></div>
                <div className="movie-details__detail-text--skeleton"></div>
                <div className="movie-details__detail-text--skeleton"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!movie || movie.Response === "False") {
    return (
      <div className="main">
        <div className="movie-details__container">
          <p>Movie not found.</p>
          <Link to="/" className="movie-details__back-link">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const poster = movie.Poster !== "N/A" ? movie.Poster : "";
  const showPlaceholder = !poster || imageError;

  return (
    <div className="main">
      <div className="movie-details__container">
        <div className="movie-details__back">
          <Link to="/" className="movie-details__back-link">
            ← Back
          </Link>
        </div>

        <div className="movie-details__content">
          <div className="movie-details__poster--wrapper">
            {!showPlaceholder ? (
              <img
                src={poster}
                alt={movie.Title}
                className="movie-details__poster"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="movie-details__poster-placeholder">
                Movie Poster
                <br />
                Not Available
              </div>
            )}

            <div className="movie-details__info">
              <h1 className="movie-details__title">{movie.Title}</h1>
              <p className="movie-details__year">
                <strong>Year:</strong> {movie.Year}
              </p>
              <p className="movie-details__rating">
                <strong>Rating:</strong>{" "}
                {movie.imdbRating !== "N/A" ? `${movie.imdbRating}/10` : "N/A"}
              </p>
              <p className="movie-details__released">
                <strong>Released:</strong> {movie.Released}
              </p>
            </div>
          </div>

          <div className="movie-details__text--wrapper">
            <div className="movie-details__detail">
              <h3>Genre</h3>
              <p>{movie.Genre !== "N/A" ? movie.Genre : "N/A"}</p>
            </div>

            <div className="movie-details__detail">
              <h3>Writer</h3>
              <p>{movie.Writer !== "N/A" ? movie.Writer : "N/A"}</p>
            </div>

            <div className="movie-details__detail">
              <h3>Actors</h3>
              <p>{movie.Actors !== "N/A" ? movie.Actors : "N/A"}</p>
            </div>

            <div className="movie-details__detail">
              <h3>Plot</h3>
              <p>{movie.Plot !== "N/A" ? movie.Plot : "N/A"}</p>
            </div>

            <div className="movie-details__detail">
              <h3>Language</h3>
              <p>{movie.Language !== "N/A" ? movie.Language : "N/A"}</p>
            </div>

            <div className="movie-details__detail">
              <h3>Awards</h3>
              <p>{movie.Awards !== "N/A" ? movie.Awards : "N/A"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
