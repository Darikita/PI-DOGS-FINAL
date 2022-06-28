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
        <h4 className={styles.name}>{name}</h4>
        <div className={styles.contenido}>
          <div>
            {weightMin && weightMax && !weight ? (
            <h5> Peso: {weightMin} - {weightMax} kg.</h5>
        ) : (
          <h5><u>Weight</u>: {weight} kg.</h5>
        )}
          </div>
          <div className={styles.temp}>
            <h5><u>Temperaments</u>: {renderTemperaments(temperament)}.</h5>
          </div>
        </div>
      </Link>
    </div>
  );
}
