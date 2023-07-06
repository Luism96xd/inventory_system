import Image from 'next/image';
import styles from '@/styles/Dashboard.module.css';

export default function Home() {
  return (
    <main className={`${styles["container"]} ${styles["flex-col"]}`}>
      <div className={`${styles["flex"]}  ${styles["cards"]}`}>
        <div className={`${styles["card"]} ${styles["rojo"]}`}>
          <h3>Total Equipos</h3>
          <p>Asignados: </p>
          <p>No Asignados: </p>
        </div>
        <div className={`${styles["card"]} ${styles["verde"]}`}>
          <h3>Total Empleados</h3>
          <p>Registrados a la fecha</p>
        </div>
        <div className={`${styles["card"]} ${styles["morado"]}`}>
          <h3>Otros</h3>
          <p>Recursos Consumibles</p>
        </div>
      </div>
      <div className={`${styles["flex"]} ${styles["graphs"]}`}>
        <div className={styles["graph"]}>
          <h3>Estado de Asignación de Equipos</h3>

        </div>
        <div className={styles["graph"]}>
          <h3>Acta de Entrega de Equipos Asignados</h3>

        </div>
      </div>
    </main>
  )
}
