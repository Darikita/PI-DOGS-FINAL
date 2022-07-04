import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchDogs } from "../../Redux/actions";
import styles from "./SearchBar.module.css";


export default function SearchBar() {
  const [search, setSearch] = useState("");
  let dispatch = useDispatch();
  
  function onSubmit(e) {
    e.preventDefault();
    setSearch("");
    dispatch(searchDogs(search));
  }

  function onInputChange(e) {
    e.preventDefault();
    setSearch(e.target.value);
  }
  return (
    <div className={styles.nav}>
        <form className={styles.form} onSubmit={onSubmit}>
        <input className={styles.input} type='text' placeholder="Search dog..." value={search} onChange={onInputChange}></input>
        <input className={styles.btn} type='submit' value='🔍'></input>
        </form>
    </div>
)
} 
