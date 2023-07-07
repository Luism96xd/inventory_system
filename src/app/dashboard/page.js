import Image from 'next/image';
import styles from '@/styles/Dashboard.module.css';
import { supabase } from '@/lib/supabase-client';

export const revalidate = 5;

const getTrabajadores = async () => {
  const count  = (((await supabase.from('trabajadores').select("*")).count));
  console.log(count);
  return count ?? 0;
}

const Dashboard = async () => {
    const totalTrabajadores = await getTrabajadores();

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
                    <h2 className='text-center text-2xl text-bold'>{totalTrabajadores}</h2>
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
export default Dashboard;