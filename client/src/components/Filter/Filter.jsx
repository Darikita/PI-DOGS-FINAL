import { useDispatch, useSelector } from "react-redux";
import { filterTemps } from "../../Redux/actions";
import styles from "./Filter.Module.css";

export default function Filter({setPage}) {
 
  let dispatch = useDispatch();
  let { dogs, temperaments } = useSelector((state) => state);

  const cambio = (e) => {
    e.preventDefault();
    const valor = e.target.value;
    let fil = dogs.filter((e) => {
      if (!e.temperament) {
        return false;
      } else if (valor === "Temperament") {
        return e;
      }
      return e.temperament.includes(valor);
    });
    dispatch(filterTemps(fil));
    setPage(1)
  };

  const onChange = (e) => {
    e.preventDefault();
    let valor = e.target.value;
    var filtro = dogs.filter((e) => {
      if (valor === "Existing & Created") {
        return e;
      } else if (valor === "All") {
        return e;
      } else if (valor === "Existing") {
        return !e.createdInDb;
      } else if (valor === "Created") {
        return e.createdInDb;
      }
    });
    dispatch(filterTemps(filtro));
    setPage(1)
  };
  
  return (
    <div className={styles.containerFilter}>
      <div>
        Filter by:
        <select 
          className={styles.selectT}
          name="select"
          onChange={(e) => cambio(e)}
        >
          <option>Temperament</option>
          {temperaments.map((e, i) => (
            <option key={i}>{e}</option>
          ))}
        </select>
        
        <select className={styles.selectABD} onChange={(e) => onChange(e)}>
        <option disabled selected defaultValue>Existing & Created</option>
          <option>All</option>
          <option>Existing</option>
          <option>Created</option>
        </select>
      </div>
    </div>

  );
}
