import React, { useState } from "react"
import style from "./Searchbar.module.css"
import { FaSearch } from 'react-icons/fa';
import { IconContext } from "react-icons";
import PropTypes from 'prop-types';

export default function Searchbar({onSubmit}) {
  const [search, setSearch] = useState("");

    const handleChange = (e) => {
      const { value } = e.target;
      setSearch(value);
   }

    const handleSubmit = (e) => {
      e.preventDefault();
      onSubmit(search);
   }

    const searchField = {
    type: "text",
    name: "search",
    placeholder: "Search images and photos",
    required: true,
    autoComplete:"off",
  }

  return (
    <header className={style.searchbar}>
      <form className={style.searchform} onSubmit={handleSubmit}>
          <button
            type="submit"
            className={style.button}
            onClick={handleSubmit}>
            <IconContext.Provider value={{ style: { verticalAlign: 'middle' } }}>
                <div>
                    <FaSearch />
                </div>
            </IconContext.Provider>
          </button>

          <input
            className={style.input}
            value={search}
            autoFocus
            onChange={handleChange}
            {...searchField} />
      </form>
    </header>
  )
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
   };