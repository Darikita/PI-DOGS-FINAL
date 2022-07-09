import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDogs, fetchTemperaments } from "../../Redux/actions";
import Dog from "../Dog/Dog";
import styles from "./Dogs.module.css";
import Filter from "../Filter/Filter";
import Order from "../Order/Order";
import Paginated from "../Paginated/Paginated"


export default function Dogs() {
  let dogs = useSelector((state) => state.filteredDogs);
  const [page, setPage] = useState(1);
  const [perPage] = useState(8);
  const maxPage= Math.ceil(dogs.length / perPage);

  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTemperaments());
    if(!dogs.length)dispatch(fetchDogs());
  }, []);

  return (
    <div className={styles.padre}>
      <div className={styles.orderyFilter}> 
        <Order />
        <Filter setPage={setPage} />
      </div>
      <div className={styles.carDog}>
      { dogs.slice((page - 1)*perPage, (page -1)* perPage + perPage)
        .map((e) => {
          return (
            <Dog
              key={e.id}
              id={e.id}
              img={e.img}
              name={e.name}
              temperaments={e.temperaments}
              temperament={e.temperament}
              weight={e.weight}
              weightMin={e.weightMin}
              weightMax={e.weightMax}
            />
          );
        })}
         </div>
      <div className={styles.containerPag}>
        <Paginated className={styles.container}page={page} setPage={setPage} maxPage={maxPage}/>
      </div>
    </div>
  );
}
