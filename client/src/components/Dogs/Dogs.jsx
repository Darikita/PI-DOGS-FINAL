import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDogs, fetchTemperaments } from "../../Redux/actions";
import Dog from "../Dog/Dog";
import styles from "./Dogs.module.css";
import Logo from "./previous.png";
import Logo2 from "./next.png";

export default function Dogs() {
  let dogs = useSelector((state) => state.filteredDogs);
  // console.log(dogs);
  const [page, setPage] = useState(1);
  const [dogsPerPage] = useState(8);
  const postPagOne = page * dogsPerPage;
  const firstPostPage = postPagOne - dogsPerPage;
  const postByPage = dogs.slice(firstPostPage, postPagOne);
  const maxPages = Math.ceil(dogs.length / 8);
  // console.log(postByPage);

  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchDogs());
    dispatch(fetchTemperaments());
  }, []);

  function anterior() {
    if (page > 1) {
      document.getElementById("paginas").innerText = ` ${page - 1}`;
      setPage(page - 1);
    }
  }
  function siguiente() {
    if (page * dogsPerPage <= dogs.length) {
      document.getElementById("paginas").innerText = ` ${page + 1}`;
      setPage(page + 1);
    }
  }
  // console.log(page);

  const handlePageChange = (e) => {
    document.getElementById("paginas").innerText = ` ${e.target.value}`;
    document.getElementById("unadetantas").innerText = `/${maxPages}`;
    e.target.value ? setPage(e.target.value) : setPage(1);

  };
  // console.log(dogs);

  return (
    <div className={styles.padre}>
      <div className={styles.carDog}>
      {
        postByPage.map((e) => {
          return (
            <Dog
              key={e.id}
              id={e.id}
              img={e.img}
              name={e.name}
              temperaments={e.temperaments}
              temperament={e.temperament}
              weight={e.weight}
              weightMin={e.weightMin}
              weightMax={e.weightMax}
            />
          );
        })}
      </div>
      <div className={styles.containerPag}>
        <button className={styles.botonAnterior} onClick={(e) => anterior(e)}>
          <img className={styles.logo} src={Logo} alt="" />
        </button>
        <span className={styles.countPag} id="paginas">
           1
        </span>
           <span className={styles.countPag2} id="unadetantas">
          {" "}
          / {maxPages}
        </span>
        <button className={styles.botonSiguiente} onClick={(e) => siguiente(e)}>
          <img className={styles.logo} src={Logo2} alt="" /> 
        </button>
        <input
          className={styles.input}
          id="paginadoNumerico"
          placeholder="Page"
          type="number"
          min="1"
          max={maxPages}
          onChange={(e) => handlePageChange(e)}
        />
      </div>
    </div>
  );
}
