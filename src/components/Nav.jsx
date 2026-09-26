import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/fes-logo.png";

const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

const Nav = ({ setSearchData, setLoading }) => {
  const navigate = useNavigate();
  const location = useLocation();

  async function handleSubmit(formData) {
    const query = formData.get("searchInput");
    fetchMovies(query);
    if (location.pathname !== "/") { //this is for when doing a search from somewhere other than the homepage
      navigate("/");
    }
  }

  async function fetchMovies(query) {
    setLoading(true);
    const { data } = await axios.get(
      `https://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`,
    );

    setSearchData({
      results: data.Search || [], //empty array needed in case no movies found
      query: query,
    });
    
    // Simulate 1 second delay to show skeleton loading state
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }

  useEffect(() => {
    //will load Marvel movies on mount by passing Marvel through fetchMovies
    fetchMovies("Avengers");
  }, []);

  return (
    <nav className="nav">
      <div className="logo">
        <img src={logo} alt="" className="logo__img" />
        <div className="logo__title">
          <span>Simplified</span> Flix
        </div>
      </div>

      <form
        action={handleSubmit}
        className="search-form"
        id="searchForm"
        name="searchForm"
      >
        <div className="search-form__group">
          <label htmlFor="searchInput"></label>
          <input
            className="search-form__input"
            type="text"
            name="searchInput" //for formData
            id="searchInput"
            placeholder="Search movies..."
            required
          />
          <button
            className="search-form__button"
            type="submit"
            aria-label="Search"
          >
            <svg
              className="search-form__icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="7"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>
        </div>
      </form>
    </nav>
  );
};

export default Nav;
