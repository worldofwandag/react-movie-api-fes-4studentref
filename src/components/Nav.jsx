import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

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
    fetchMovies("Marvel");
  }, []);

  return (
    <div className="nav">
      <div className="logo">FES Movies</div>

      <form
        action={handleSubmit}
        className="search-form"
        id="searchForm"
        name="searchForm"
      >
        <label htmlFor="searchInput"></label>
        <input
          className="search-form__input"
          type="text"
          name="searchInput" //for formData
          id="searchInput"
          placeholder="Search movies..."
          required
        />
        <button className="search-form__button">Search</button>
      </form>
    </div>
  );
};

export default Nav;
