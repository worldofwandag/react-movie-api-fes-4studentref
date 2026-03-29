import React, { useEffect } from "react";
import axios from "axios";

const Nav = ({ setSearchData }) => {
  async function fetchMovies(query) {
    const { data } = await axios.get(
      `https://www.omdbapi.com/?s=${query}&apikey=e11ddac9`,
    );

    setSearchData({
      results: data.Search || [],
      query: query,
    });
  }

  async function handleSubmit(formData) {
    const query = formData.get("searchInput");
    fetchMovies(query);
  }

  useEffect(() => {
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
