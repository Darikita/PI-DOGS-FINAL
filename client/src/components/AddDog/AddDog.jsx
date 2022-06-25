import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { fetchTemperaments } from "../../Redux/actions";
import NavBar from "../NavBar/NavBar";
import styles from "./AddDog.module.css";

export default function AddDog() {
  let temperaments = useSelector((state) => state.temperaments);
  console.log(temperaments);
  const [dog, setDog] = useState({
    temperament: [],
  });
  const [error, setError] = useState({
    error: "Debe ingresar una raza",
  });
  let history = useHistory();
  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTemperaments());
  }, [dispatch]);

  function validationForm(value) {
    let errors = {};
    if (!value.name) errors.name = "Debe ingresar una raza";
    else if (!/^([A-ZÁÉÍÓÚ]{1}[a-zñáéíóú]+[\s]*)+$/.test(value.name)) {
      errors.name = "Los nombres propios empiezan con mayúscula";
    }
    if (parseInt(value.heightMax) <= parseInt(value.heightMin)) {
      errors.heightMax = "La altura máxima debe ser mayor a la mínima";
    }
    if (parseInt(value.weightMax) <= parseInt(value.weightMin)) {
      errors.weightMax = "El peso máximo debe ser mayor a la mínimo";
    }
    if (parseInt(value.lifeSpanMax) <= parseInt(value.lifeSpanMin)) {
      errors.lifeSpanMax =
        "La esperanza de vida máxima debe ser mayor a la mínima";
    }
    if (value.temperament.length < 1) {
      console.log(value.temperament);
      errors.temperament = "Debe agregar por lo menos un temperamento";
    }

    return errors;
  }

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

  function onSubmit(e) {
    e.preventDefault();
    axios.post("http://localhost:3001/dogs/new", dog).then(() => {
      history.push("/");
    });
    dog
      ? alert("Creaste a tu mejor amigo, buscalo filtrando por 'Creados'")
      : alert("Necesitas completar todos los valores");
    console.log(dog);
  }

  return (
    <div className={styles.containerPadre}>
      <NavBar />
      <div className={styles.padre}>
        <div className={styles.container}>
          <h1>CREÁ A TU MEJOR AMIGO</h1>
          <form
            onSubmit={(e) => {
              onSubmit(e);
            }}
          >
            <p htmlFor="name"> </p>
            <input
              onChange={(e) => onInputChange(e)}
              name="name"
              id="name"
              type="text"
              value={dog.name}
              className={styles.input}
              placeholder="Raza"
            />

            {error.name ? <p style={{ color: "red" }}> {error.name} </p> : null}
            <p htmlFor="heightMin"> </p>
            <input
              onChange={(e) => onInputChange(e)}
              name="heightMin"
              id="heightMin"
              type="number"
              value={dog.height}
              className={styles.input}
              placeholder="Altura Mínima"
            />

            <p htmlFor="heightMax"></p>
            <input
              onChange={(e) => onInputChange(e)}
              name="heightMax"
              id="heightMax"
              type="number"
              value={dog.height}
              className={styles.input}
              placeholder="Altura Máxima"
            />
            {error.heightMax ? (
              <p style={{ color: "red" }}> {error.heightMax} </p>
            ) : null}
            <p htmlFor=""></p>
            <input
              onChange={(e) => onInputChange(e)}
              name="weightMin"
              type="number"
              value={dog.weight}
              className={styles.input}
              placeholder="Peso Mínimo"
            />
            <p htmlFor=""></p>
            <input
              onChange={(e) => onInputChange(e)}
              name="weightMax"
              type="number"
              value={dog.weight}
              className={styles.input}
              placeholder="Peso Máximo"
            />
            {error.weightMax ? (
              <p style={{ color: "red" }}> {error.weightMax} </p>
            ) : null}
            <p htmlFor=""></p>
            <input
              onChange={(e) => onInputChange(e)}
              name="lifeSpanMin"
              type="number"
              value={dog.lifeSpan}
              className={styles.input}
              placeholder="Años de vida min."
            />
            <p htmlFor=""></p>
            <input
              onChange={(e) => onInputChange(e)}
              name="lifeSpanMax"
              type="number"
              value={dog.lifeSpan}
              className={styles.input}
              placeholder="Años de vida max."
            />
            {error.lifeSpanMax ? (
              <p style={{ color: "red" }}> {error.lifeSpanMax} </p>
            ) : null}
            <p htmlFor="">Temperamentos: </p>

            <select
              multiple
              onChange={(e) => onSelectChange(e)}
              name="temperament"
              className={styles.inputSelect}
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
            <p htmlFor=""></p>
            <input
              onChange={(e) => onInputChange(e)}
              name="img"
              type="text"
              value={dog.img}
              className={styles.input}
              placeholder="Imagen"
            />
            <br />

            <input
              type="submit"
              disabled={Object.keys(error).length === 0 ? false : true}
              className={styles.inputEnviar}
            />
            {Object.keys(error).length === 0 ? null : (
              <p style={{ color: "red" }}>
                Para crear debes completar todos los campos sin errores.
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
