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


// export default class Searchbar extends Component {
//   state = {
//     search: "",
//   }

  // handleChange = (e) => {
  //   const { value, name } = e.target;
  //   this.setState({
  //     [name]: value
  //   });
  // }

  // handleSubmit = (e) => {
  //   e.preventDefault();
  //   const { onSubmit } = this.props;
  //   onSubmit({ ...this.state });
  //  }

  

    
//   render() {
//     const { search } = this.state;
//     const { handleSubmit, handleChange } = this;

//     return (
//     <header className={style.searchbar}>
//       <form className={style.searchform} onSubmit={handleSubmit}>
//           <button
//             type="submit"
//             className={style.button}
//             onClick={handleSubmit}>
//             <IconContext.Provider value={{ style: { verticalAlign: 'middle' } }}>
//                 <div>
//                     <FaSearch />
//                 </div>
//             </IconContext.Provider>
//           </button>

//           <input
//             className={style.input}
//             value={search}
//             autoFocus
//             onChange={handleChange}
//             {...this.searchField} />
//       </form>
//     </header>
//     )
//   }
// }

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
   };