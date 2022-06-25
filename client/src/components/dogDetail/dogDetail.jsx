import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import styles from "./DogDetail.module.css";
import NavBar from "../NavBar/NavBar";

export default function DogDetail() {
  const [dog, setDog] = useState(null);
  console.log(dog);

  let { id } = useParams();

  useEffect(() => {
    axios.get("http://localhost:3001/dogs/" + id).then((response) => {
      const data = response.data.map((e) => {
        let temperament = e.temperament;
        if (!temperament && e.temperaments) {
          temperament = e.temperaments.map((temp) => {
            return temp.name;
          });
        }
        return {
          ...e,
          temperament,
        };
      });
      setDog(data);
    });
    return () => {
      setDog(null);
    };
  }, []);
  return (
    <div className={styles.padre}>
      <NavBar />

      <div className={styles.card}>
        {dog ? (
          <>
            <div className={styles.detail}>
              <div>
                <img
                  className={styles.imagen}
                  src={dog["0"]["img"]}
                  alt="imagen"
                />
              </div>
              <div className={styles.tt}>
                <h1>{dog["0"]["name"]}</h1>
                <br />

                {dog["0"]["heightMin"] &&
                dog["0"]["heightMax"] &&
                !dog["0"]["height"] ? (
                  <h4>
                    Altura:{" "}
                    {`${dog["0"]["heightMin"]} - ${dog["0"]["heightMax"]}`} cm.
                  </h4>
                ) : (
                  <h4>Altura: {dog["0"]["height"]} cm.</h4>
                )}

                {dog["0"]["weightMin"] &&
                dog["0"]["weightMax"] &&
                !dog["0"]["weight"] ? (
                  <h4>
                    Peso:{" "}
                    {`${dog["0"]["weightMin"]} - ${dog["0"]["weightMax"]}`} kg.
                  </h4>
                ) : (
                  <h4>Peso: {dog["0"]["weight"]} kg.</h4>
                )}
                {dog["0"]["lifeSpanMin"] &&
                dog["0"]["lifeSpanMax"] &&
                !dog["0"]["lifeSpan"] ? (
                  <h4>
                    Vda Aproximada:{" "}
                    {`${dog["0"]["lifeSpanMin"]} a ${dog["0"]["lifeSpanMax"]}`}{" "}
                    años.
                  </h4>
                ) : (
                  <h4>Vida Aproximada: {dog["0"]["lifeSpan"]}</h4>
                )}
                <h4>Temperamentos: {dog["0"]["temperament"].join(", ")}.</h4>
              </div>
            </div>
          </>
        ) : (
          <div className={styles.spiner}></div>
        )}
      </div>
    </div>
  );
}
