"use client";

import { supabase } from '@/lib/supabase-client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const DeleteEquipo = async ({ params }) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const id = params.id;

    useEffect(() => {
        const getData = async () => {
            setLoading(true);
            const { data, error } = await supabase.from('equipos').select().eq('id_equipo', id).single();
            setData(data);
            console.log(data);
            setLoading(false)
        }
        getData()
    }, [])


    const borrarEquipo = async () => {
        console.log(id);
        const response = await axios.delete(`/api/equipos/${id}`, { idEquipo: id });
        console.log(response)
        router.push("/equipos")
    }

    const goBack = () => {
        router.push("/equipos")
    }

    return (
        !loading && 
            <div className='w-full h-full flex flex-col justify-center items-center'>
            <h2 className='text-xl font-bold center mb-4 text-center'>¿Desea eliminar el equipo con el serial {data && data.serial}?</h2>
            <div className="flex gap-2 justify-center">
                <button className='btn bg-red-600 text-white font-semibold' onClick={borrarEquipo}>Sí</button>
                <button className="btn bg-slate-400 text-white font-semibold" onClick={goBack}>No</button>
            </div>
            </div>
        
    )
}
export default DeleteEquipo;

