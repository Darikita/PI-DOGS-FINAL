import { Link } from "react-router-dom";
import styles from "./Dog.module.css";

export default function Dog({
  id,
  name,
  img,
  temperament,
  temperaments,
  weight,
  weightMin,
  weightMax,
}) {
  function renderTemperaments(temperament) {
    if (temperament) {
      return temperament.join(", ");
    } else if (temperaments) {
      return temperaments.join(", ");
    }
    return "Este error";
  }

  return (
    <div className={styles.card}>
      <Link to={`/${id}`}>
      <img className={styles.imagen} src={img} alt="imagen" />
        <h5 className={styles.name}>{name}</h5>
        <div className={styles.contenido}>
        {weightMin && weightMax && !weight ? (
          <h5>
            Peso: {weightMin} - {weightMax} kg.
          </h5>
        ) : (
          <h5><u>Peso</u>: {weight} kg.</h5>
        )}<br></br>
        <h5><u>Temperamentos</u>: {renderTemperaments(temperament)}.</h5>
        </div>
      </Link>
    </div>
  );
}
