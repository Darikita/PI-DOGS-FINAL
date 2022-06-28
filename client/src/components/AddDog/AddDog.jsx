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
    error: "You must type a name",
  });
  let history = useHistory();
  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTemperaments());
  }, [dispatch]);

  function validationForm(value) {
    let errors = {};
    if (!value.name) errors.name = "You must type a name";
    else if (!/^([A-ZÁÉÍÓÚ]{1}[a-zñáéíóú]+[\s]*)+$/.test(value.name)) {
      errors.name = "❌ The first letter must be uppercase";
    }
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
    if (value.temperament.length < 1) {
      console.log(value.temperament);
      errors.temperament = "❌Must select at least one temperament";
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
      ? alert("Dog created successfully")
      : alert("You must fill in all the values.");
    console.log(dog);
  }
  return (
    <div className={styles.containerPadre}>
      <NavBar />
      <div className={styles.padre}>
        <div className={styles.container}>
          <h1> 🐶 CREATE YOUR DOG</h1>
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
              placeholder="Name"
            />
            {error.name ? <p style={{ color: "red" }}> {error.name} </p> : null}
            <p htmlFor="heightMin"> </p>
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
            <p htmlFor="heightMax"></p>
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
            <p htmlFor=""></p>
            <input
              onChange={(e) => onInputChange(e)}
              name="weightMin"
              type="number"
              min="1"
              value={dog.weight}
              className={styles.input}
              placeholder="Min-Weight"
            />
            <p htmlFor=""></p>
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
            <p htmlFor=""></p>
            <input
              onChange={(e) => onInputChange(e)}
              name="lifeSpanMin"
              type="number"
              min="1"
              value={dog.lifeSpan}
              className={styles.input}
              placeholder="Min-Life-Span"
            />
            <p htmlFor=""></p>
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
            <p htmlFor="">Temperaments: </p>

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
              placeholder="Image URL"
            />
            <br />
            <input
              type="submit"
              disabled={Object.keys(error).length === 0 ? false : true}
              className={styles.inputEnviar}
            />
            {Object.keys(error).length === 0 ? null : (
              <p style={{ color: "red" }}>
                To create you must complete all the fields without errors.
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
