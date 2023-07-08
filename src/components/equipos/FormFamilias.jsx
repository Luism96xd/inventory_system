"use client";

import React, { useEffect, useState } from 'react';
import styles from "@/styles/Forms.module.css";
import Searchbox from '@/components/SearchBox';
import { supabase } from '@/lib/supabase-client';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const FormFamilias = () => {
    const [descripcion, setDescripcion] = useState("");
    const [inactivo, setInactivo] = useState(false);
    const [familias, setFamilias] = useState([]);

    const router = useRouter();

    useEffect(() => {
        const getData = async () => {
            const { data } = await supabase.from('familias').select();
            setFamilias(data)
        }
        getData()
    }, [])

    const handleSave = async (e) => {
        e.preventDefault();
        const data = {
            descripcion: descripcion,
            inactivo: inactivo
        }
        console.log(data);
        const response = await axios.post('/api/familias', data);
        console.log(response)
        setDescripcion("");
        setInactivo(false)
        router.refresh()
    }
    return (
        <form onSubmit={handleSave}>
            <div className='w-full p-4'>
                <label htmlFor="descripcion" className='w-full'>
                    <span>Descripción:</span>
                    <input
                        type="text"
                        id="descripcion"
                        value={descripcion}
                        className={styles['input']}
                        onChange={(e) => setDescripcion(e.target.value)}
                    />
                </label>
            </div>
            <div className="w-full p-4">
            <label htmlFor="inactivo">
                    <span>Inactivo:</span>
                    <input
                        type="checkbox"
                        id="inactivo"
                        value={inactivo}
                        className={styles['input']}
                        onChange={(e) => setInactivo(e.target.value)}
                    />
                </label>
            </div>
            <div className='w-full grid grid-cols-2 p-4 gap-4'>
                <button className={`btn bg-white text-black`}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span>Cancelar</span>
                </button>
                <button type="submit" className={`btn bg-green-400 text-white`}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 3.75V16.5L12 14.25 7.5 16.5V3.75m9 0H18A2.25 2.25 0 0120.25 6v12A2.25 2.25 0 0118 20.25H6A2.25 2.25 0 013.75 18V6A2.25 2.25 0 016 3.75h1.5m9 0h-9" />
                    </svg>
                    <span>Guardar</span>
                </button>
            </div>
        </form>
    )
}

export default FormFamilias;