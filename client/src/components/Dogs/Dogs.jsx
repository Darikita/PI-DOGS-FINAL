import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDogs, fetchTemperaments } from "../../Redux/actions";
import Dog from "../Dog/Dog";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import styles from "./Dogs.module.css";

export default function Dogs() {
  let dogs = useSelector((state) => state.filteredDogs);
  console.log(dogs);
  const [page, setPage] = useState(1);
  const [PostPage, setPostPage] = useState(8);

  const PostPagOne = page * PostPage;
  const firstPostPage = PostPagOne - PostPage;
  const PostByPage = dogs.slice(firstPostPage, PostPagOne);
  const maxPages = Math.ceil(dogs.length / 8);
  console.log(PostByPage);

  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchDogs());
    dispatch(fetchTemperaments());
  }, []);

  function pageNum(e) {
    alert(page);
    document.getElementById("paginas").innerText = `${page}`;
    setPage(page);
  }

  function anterior() {
    if (page > 1) {
      document.getElementById("paginas").innerText = `Página ${page - 1}`;
      setPage(page - 1);
    }
  }
  function siguiente() {
    if (page * PostPage <= dogs.length) {
      document.getElementById("paginas").innerText = `Página ${page + 1}`;
      setPage(page + 1);
    }
  }
  console.log(page);

  const handlePageChange = (e) => {
    document.getElementById("paginas").innerText = `Página ${e.target.value}`;
    document.getElementById("unadetantas").innerText = ` /${maxPages}`;
    e.target.value ? setPage(e.target.value) : setPage(1);
  };
  console.log(dogs);
  return (
    <div className={styles.padre}>
      <div className={styles.carDog}>
        {PostByPage.map((e) => {
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
        <span className={styles.countPag} id="paginas">
          Page 1
        </span>
        <button className={styles.botonAnterior} onClick={(e) => anterior(e)}>
          {AiOutlineArrowLeft()} Previous
        </button>
        <button className={styles.botonSiguiente} onClick={(e) => siguiente(e)}>
          Next {AiOutlineArrowRight()}
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
        <span className="countPag" id="unadetantas">
          {" "}
          de {maxPages}
        </span>
      </div>
    </div>
  );
}
