import React, {useState} from 'react';
import styles from './Paginated.module.css';
import Logo from './previous.png';
import Logo2 from "./next.png";

export default function Paginated ({page, setPage, maxPage}) {
  const [input, setInput] = useState (1);

  const nextPage = () => {
    setInput (parseInt(input) + 1);
    setPage (parseInt(page) + 1);
  };

  const previousPage = () => {
    setInput (parseInt(input) - 1);
    setPage (parseInt(page) - 1);
  };

  const onKeyDown = e => {
    if (e.keyCode == 13) {
      setPage (parseInt (e.target.value));
      if (
        parseInt (e.target.value < 1) ||
        parseInt (e.target.value) > Math.ceil (maxPage) ||
        isNaN (parseInt (e.target.value))
      ) {
        setPage (1);
        setInput (1);
      } else {
        setPage (parseInt (e.target.value));
      }
    }
  };

  const onChange = e => {
    setInput (e.target.value);
  };

  return (
    <div className={styles.containerPag}>
      <button  className={styles.botonAnterior} disabled={page === 1 || page < 1} onClick={previousPage}>
      <img className={styles.logo} src={Logo} alt="" />
      </button>
      <input className={styles.countPag} 
        onChange={e => onChange (e)}
        onKeyDown={e => onKeyDown (e)}
        name="page"
        autoComplete="off"
        value={input}
      />
      <p className={styles.countPag2}> de {maxPage} </p>
      <button className={styles.botonSiguiente}
        disabled={page === Math.ceil (maxPage) || page > Math.ceil (maxPage)}
        onClick={nextPage}
      >   <img className={styles.logo} src={Logo2} alt="" /> 
      </button> 
    </div>
  );
};