import axios from "axios";
import {useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Create from "./create.gif";
import { postDog, fetchTemperaments } from "../../Redux/actions";
import NavBar from "../NavBar/NavBar";
import styles from "./AddDog.module.css";

/* Esta es una función que exporta el componente AddDog. */

export default function AddDog() {
  let temperaments = useSelector((state) => state.temperaments);
  // console.log(temperaments);
/* Creando un estado para el objeto perro. */
  const [dog, setDog] = useState({
    name: "",
    heightMin: "",
    heightMax: "",
    weightMin: "",
    weightMax: "",
    lifeSpanMin: "",
    lifeSpanMax: "",
    temperament: [],
    img: "",
  });

  const [error, setError] = useState({
    error: "You must type a name",
  });
  /* Un gancho que nos permite usar el historial del navegador y el envío de la tienda redux. */
  let history = useHistory();
  let dispatch = useDispatch();
/* Este es un gancho que nos permite usar el envío de la tienda redux. */
  useEffect(() => {
    dispatch(fetchTemperaments());
  }, [dispatch]);

  function validationForm(value) {
    let errors = {};
    if (!value.name) errors.value = "🔺Name is required";
   else if (!/^([A-ZÁÉÍÓÚ]{1}[a-zñáéíóú]+[\s]*)+$/.test(value.name)) {
      errors.name = "❌ The first letter must be uppercase";
    }
  /* Esta es una validación que verifica si el valor máximo es menor que el valor mínimo. */
    if (parseInt(value.heightMax) <= parseInt(value.heightMin)) {
      errors.heightMax = "❌ Min value cannot be greater than the max";
    }
    if (parseInt(value.weightMax) <= parseInt(value.weightMin)) {
      errors.weightMax = "❌ Min value cannot be greater than the max";
    }
    if (parseInt(value.lifeSpanMax) <= parseInt(value.lifeSpanMin)) {
      errors.lifeSpanMax =
        "❌ Min value cannot be greater than the max";
    }
 /* Esta es una validación que comprueba si el valor es menor que 1. */
    if (value.temperament.length < 1) {
      // console.log(value.temperament);
      errors.temperament = "❌Must select at least one temperament";
    }
    return errors;
  }
/* Agregar el temperamento al objeto del perro. */
const handleSelect = (e) => {
  setDog({
    ...dog,
    temperament: [...dog.temperament, e.target.value],
  });
  setError(
    validationForm({
      [e.target.name]: e.target.value,
    })
  );
};
/* Esta función está cambiando el estado del objeto perro. */
  function onInputChange(e) {
    e.preventDefault();
    setDog({
      ...dog,
      [e.target.name]: e.target.value,
    });

    setError(
      validationForm({
        ...dog,
        [e.target.name]: e.target.value,
      })
    );
  }
  function handleDelete(el) {
    setDog({
      ...dog,
      temperament: dog.temperament.filter((e) => e !== el),
    });
    console.log(dog);
  }
/* Esta función está enviando los datos al servidor. */
function handleSubmit(e) {
  e.preventDefault();
  if (
    dog.name !== "" &&
    dog.heightMin !== "" &&
    dog.heightMax > dog.heightMin &&
    dog.weightMin !== "" &&
    dog.weightMax > dog.weightMin &&
    dog.lifeSpanMin !== "" &&
    dog.weightMax > dog.weightMin &&
    dog.temperament.length !== 0
  ){
    dispatch(postDog(dog));
    alert("🐶Dog created successfully");
    setDog({
      name: "",
      heightMin: "",
      heightMax: "",
      weightMin: "",
      weightMax: "",
      lifeSpanMin: "",
      lifeSpanMax: "",
      image: "",
      temperaments: [],
    });
    history.push("/home")
    } else {
        alert("🚫Required elements are missing!")
    };
  }
  return (
    <div className={styles.containerPadre}>
      <NavBar />
      <div className={styles.padre}>
        <div className={styles.container}>
        <img className={styles.create} src={Create} alt="" />
          <form onSubmit={(e) => { handleSubmit(e);  
            }}
          >
            <p tag="name"> </p>
            <input
              onChange={(e) => onInputChange(e)}
              name="name"
              id="name"
              type="text"
              value={dog.name}
              className={styles.input}
              placeholder="Name"
            />
            {error.name ? <p className={styles.letter}> {error.name} </p> : null}

            <p tag="heightMin"> </p>
            <input
              onChange={(e) => onInputChange(e)}
              name="heightMin"
              id="heightMin"
              type="number"
              min="1"
              max="99"
              value={dog.height}
              className={styles.input}
              placeholder="Min-Height"
            />
            <p tag="heightMax"></p>
            <input
              onChange={(e) => onInputChange(e)}
              name="heightMax"
              id="heightMax"
              type="number"
              min="1"
              max="99"
              value={dog.height}
              className={styles.input}
              placeholder="Max-Height"
            />
            {error.heightMax ? (
              <p className={styles.letter}> {error.heightMax} </p>
            ) : null}
            <p tag=""></p>
            <input
              onChange={(e) => onInputChange(e)}
              name="weightMin"
              type="number"
              min="1"
              max="99"
              value={dog.weight}
              className={styles.input}
              placeholder="Min-Weight"
            />
            <p tag=""></p>
            <input
              onChange={(e) => onInputChange(e)}
              name="weightMax"
              type="number"
              min="1"
              max="99"
              value={dog.weight}
              className={styles.input}
              placeholder="Max-Weight"
            />
            {error.weightMax ? (
              <p className={styles.letter}> {error.weightMax} </p>
            ) : null}
            <p tag=""></p>
            <input
              onChange={(e) => onInputChange(e)}
              name="lifeSpanMin"
              type="number"
              min="1"
              max="20"
              value={dog.lifeSpan}
              className={styles.input}
              placeholder="Min-Life-Span"
            />
            <p tag=""></p>
            <input
              onChange={(e) => onInputChange(e)}
              name="lifeSpanMax"
              type="number"
              min="1"
              max="20"
              value={dog.lifeSpan}
              className={styles.input}
              placeholder="Max-Life-Span"
            />
            {error.lifeSpanMax ? (
              <p className={styles.letter}> {error.lifeSpanMax} </p>
            ) : null}

            <p className={styles.letter}>✔️Select Temperaments: </p>
            <select
              className={styles.selectT}
              onChange={(e) => handleSelect(e)}
              name="temperament"
            >
              {temperaments.map((e, i) => (
                <option value={e} key={i}>
                  {e}
                </option>
              ))}
            </select>
            <ul className={styles.ul}>
            <li className={styles.li} key={"key"}>
              {dog.temperament.map((el) => (
                <button
                  className={styles.botonTemp}
                  type="button"
                  key={el.id}
                  onClick={() => handleDelete(el)}
                >
                  {el} X
                </button>
              ))}
            </li>
          </ul>
            {error.temperament ? (
              <p className={styles.letter}> {error.temperament} </p>
            ) : null}
            <p tag=""></p>
            <input
              onChange={(e) => onInputChange(e)}
              name="img"
              type="text"
              value={dog.img}
              className={styles.input}
              placeholder="Image URL"S
            />
            <br />
            <div className={styles.but}>
            <button type="submit">
            <span class="text">CREATE</span>
        </button>
        {/* <Link to="/home">
        <button> Back to home</button>
      </Link> */}
      </div>
            {Object.keys(error).length === 0 ? null : (
              <p className={styles.danger}>
                ⚠️To create you must complete all the fields without errors.
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}