import { useDispatch, useSelector } from "react-redux";
import { sort, sort_weight } from "../../Redux/actions";
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
    // console.log(ordenPeso);
    if (valor === "Weight Ascending") {
      ordenPeso.sort((a, b) => {
        return a.weightMin - b.weightMin;
      });
    } else if (valor === "Weight Descending") {
      ordenPeso.sort((a, b) => {
        return b.weightMin - a.weightMin;
      });
    }
    dispatch(sort_weight(ordenPeso));
    // console.log(filteredDogs);
  };
  return (
    <div className={styles.containterOrder}>
      <div>
        Sort by:
        <select
          className={styles.selectNombre}
          name="select"
          onChange={onSelectChange}
        >
          <option disabled selected defaultValue>Alphabetical</option>
          <option value="asc">Name  (A - Z)</option>
          <option value="desc">Name  (Z - A)</option>
        </select>
      </div>
      <div>
        <select
          className={styles.selectPeso}
          name="select"
          onChange={(e) => onSelectChanges(e)}
        >
          <option disabled selected defaultValue>Weigth...</option>
          <option>Weight Ascending</option>
          <option>Weight Descending</option>
        </select>
      </div>
    </div>
  );
}
