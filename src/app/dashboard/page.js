"use client";
import styles from '@/styles/Dashboard.module.css';
import { supabase } from '@/lib/supabase-client';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { useEffect, useState } from 'react';

export const revalidate = 5;

ChartJS.register(ArcElement, Tooltip, Legend);


export const data = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
        {
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.7)',
                'rgba(54, 162, 235, 0.7)',
                'rgba(255, 206, 86, 0.7)',
                'rgba(75, 192, 192, 0.7)',
                'rgba(153, 102, 255, 0.7)',
                'rgba(255, 159, 64, 0.7)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
        },
    ],
};


const Dashboard = async () => {
    const [numTrabajadores, setNumTrabajadores] = useState(0);
    useEffect(() => {
        const getTrabajadores = async () => {
            const count = (((await supabase.from('trabajadores').select("*")).count));
            console.log(count);
            setNumTrabajadores(count);
        }
        getTrabajadores()
    }, [])

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
                    <h2 className='text-center text-2xl text-bold'>{numTrabajadores}</h2>
                </div>
                <div className={`${styles["card"]} ${styles["morado"]}`}>
                    <h3>Otros</h3>
                    <p>Recursos Consumibles</p>
                </div>
            </div>
            <div className={`${styles["flex"]} ${styles["graphs"]}`}>
                <div className={styles["graph"]}>
                    <h3>Estado de Asignación de Equipos</h3>
                    <Pie data={data} />
                </div>
                <div className={styles["graph"]}>
                    <h3>Acta de Entrega de Equipos Asignados</h3>

                </div>
            </div>
        </main>
    )
}
export default Dashboard;