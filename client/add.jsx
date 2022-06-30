import axios from "axios";
import {useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Create from "./create.png";
import { fetchTemperaments } from "../../Redux/actions";
import NavBar from "../NavBar/NavBar";
import styles from "./AddDog.module.css";

/* Esta es una función que exporta el componente AddDog. */

export default function AddDog() {
  let temperaments = useSelector((state) => state.temperaments);
  // console.log(temperaments);
/* Creando un estado para el objeto perro. */
  const [dog, setDog] = useState({
    temperament: [],
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
    if (!value.name) errors.name = "🔺Name is required";
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
      console.log(value.temperament);
      errors.temperament = "❌Must select at least one temperament";
    }

    return errors;
  }
/* Agregar el temperamento al objeto del perro. */
  const onSelectChange = (e) => {
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

/* Esta función está enviando los datos al servidor. */
  function onSubmit(e) {
    e.preventDefault();
    axios.post("http://localhost:3001/dogs/new", dog).then(() => {
      history.push("/");
    }); 
    dog
      ? alert("🐶Dog created successfully")
      : alert("You must fill in all the values.");
    console.log(dog);
  }
  return (
    <div className={styles.containerPadre}>
      <NavBar />
      <div className={styles.padre}>
        <div className={styles.container}>
        <img className={styles.create} src={Create} alt="" />
        
          <form
            onSubmit={(e) => {
              onSubmit(e);  
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
            {error.name ? <p style={{ color: "red" }}> {error.name} </p> : null}

            <p tag="heightMin"> </p>
            <input
              onChange={(e) => onInputChange(e)}
              name="heightMin"
              id="heightMin"
              type="number"
              min="1"
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
              value={dog.height}
              className={styles.input}
              placeholder="Max-Height"
            />
            {error.heightMax ? (
              <p style={{ color: "red" }}> {error.heightMax} </p>
            ) : null}
            <p tag=""></p>
            <input
              onChange={(e) => onInputChange(e)}
              name="weightMin"
              type="number"
              min="1"
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
              value={dog.weight}
              className={styles.input}
              placeholder="Max-Weight"
            />
            {error.weightMax ? (
              <p style={{ color: "red" }}> {error.weightMax} </p>
            ) : null}
            <p tag=""></p>
            <input
              onChange={(e) => onInputChange(e)}
              name="lifeSpanMin"
              type="number"
              min="1"
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
              value={dog.lifeSpan}
              className={styles.input}
              placeholder="Max-Life-Span"
            />
            {error.lifeSpanMax ? (
              <p style={{ color: "red" }}> {error.lifeSpanMax} </p>
            ) : null}

            <p tag="">✔️Select Temperaments: </p>
            <select
              className={styles.selectT}
              onChange={(e) => onSelectChange(e)}
              name="temperament"
            >
              {temperaments.map((e, i) => (
                <option value={e} key={i}>
                  {e}
                </option>
              ))}
            </select>

            {dog.temperament.length > 0 ? (
              <div className={styles.temperPadre}>
                <p className={styles.temper}>{dog.temperament.join(", ")}.</p>
              </div>
            ) : null}
            {error.temperament ? (
              <p style={{ color: "red" }}> {error.temperament} </p>
            ) : null}
            <p tag=""></p>
            <input
              onChange={(e) => onInputChange(e)}
              name="img"
              type="text"
              value={dog.img}
              className={styles.input}
              placeholder="Image URL"
            />
            <br />
            <input
              type="submit"
              disabled={Object.keys(error).length === 0 ? false : true}
              className={styles.inputEnviar}
            />
            {Object.keys(error).length === 0 ? null : (
              <p style={{ color: "black" }}>
                ⚠️To create you must complete all the fields without errors.
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
