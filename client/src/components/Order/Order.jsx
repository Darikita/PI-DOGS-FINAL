import { useDispatch, useSelector } from "react-redux";
import { ASCENDENTE, DESCENDENTE } from "../../constantes/sort";
import { sort, sort_weight } from "../../store/actions";
import styles from "./Order.Module.css";

export default function Order() {
  const filteredDogs = useSelector((state) => state.filteredDogs);
  const dispatch = useDispatch();

  function onSelectChange(e) {
    dispatch(sort(e.target.value));
  }

  let onSelectChanges = (e) => {
    e.preventDefault();
    let valor = e.target.value;

    var ordenPeso = filteredDogs.map((e) => {
      if (e.weight && !e.weightMin) {
        return {
          ...e,
          weightMin: `${e.weight.charAt(0)}${e.weight.charAt(1)}`,
        };
      }

      return {
        ...e,
      };
    });
    console.log(ordenPeso);
    if (valor === "Peso Ascendente") {
      ordenPeso.sort((a, b) => {
        return a.weightMin - b.weightMin;
      });
    } else if (valor === "Peso Descendente") {
      ordenPeso.sort((a, b) => {
        return b.weightMin - a.weightMin;
      });
    }

    dispatch(sort_weight(ordenPeso));
    console.log(filteredDogs);
  };

  return (
    <div className={styles.containterOrder}>
      <div>
        Ordenar por:
        <select
          className={styles.selectNombre}
          name="select"
          onChange={onSelectChange}
        >
          <option value={ASCENDENTE}>Nombre (A - Z)</option>
          <option value={DESCENDENTE}>Nombre (Z - A)</option>
        </select>
      </div>
      <div>
        <select
          className={styles.selectPeso}
          name="select"
          onChange={(e) => onSelectChanges(e)}
        >
          <option>Peso Ascendente</option>
          <option>Peso Descendente</option>
        </select>
      </div>
    </div>
  );
}
