import NavBar from "../NavBar/NavBar";
import styles from "./About.module.css";

export default function About() {
  return (
    <div>
      <NavBar />
      <div className={styles.padre}>
        <div className={styles.container}>
          <h2>¿Quien soy?</h2>
          <br />

          {/* <p>
            Mi nombre es Maximimiliano Giraudo y este es un proyecto de práctica
            en donde utilicé:
            <br />
            <br />
            <p> Para FrontEnd React y Redux con Hooks.</p>
            <p> Para Backend NodeJS y Express.</p>
            <p>Para Base de Datos PostgresSQL.</p>
          </p> */}
        </div>
      </div>
    </div>
  );
}
