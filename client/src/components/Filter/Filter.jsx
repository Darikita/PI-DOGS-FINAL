import { useDispatch, useSelector } from "react-redux";
import { filterxTemperaments } from "../../store/actions";
import styles from "./Filter.Module.css";

export default function Filter() {
  let dispatch = useDispatch();
  let { dogs, temperaments } = useSelector((state) => state);

  const cambio = (e) => {
    e.preventDefault();
    const valor = e.target.value;
    let fil = dogs.filter((e) => {
      if (!e.temperament) {
        return false;
      } else if (valor === "Temperamento") {
        return e;
      }
      return e.temperament.includes(valor);
    });

    dispatch(filterxTemperaments(fil));
  };

  const onChange = (e) => {
    e.preventDefault();
    let valor = e.target.value;
    var filtro = dogs.filter((e) => {
      if (valor === "API y BD") {
        return e;
      } else if (valor === "Existentes y Creados") {
        return e;
      } else if (valor === "Existentes") {
        return !e.createdAt;
      } else if (valor === "Creados") {
        return e.createdAt;
      }
    });

    dispatch(filterxTemperaments(filtro));
  };

  return (
    <div className={styles.containerFilter}>
      <div>
        Filtrar por:
        <select
          className={styles.selectT}
          name="select"
          onChange={(e) => cambio(e)}
        >
          <option>Temperamento</option>
          {temperaments.map((e, i) => (
            <option key={i}>{e}</option>
          ))}
        </select>
        <select className={styles.selectABD} onChange={(e) => onChange(e)}>
          <option>API y BD</option>
          <option>Existentes y Creados</option>
          <option>Existentes</option>
          <option>Creados</option>
        </select>
      </div>
    </div>
  );
}
