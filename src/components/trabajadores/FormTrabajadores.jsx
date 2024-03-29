"use client";

import React, { useEffect, useState } from 'react';
import styles from "@/styles/Forms.module.css";
import Searchbox from '@/components/SearchBox';
import { supabase } from '@/lib/supabase-client';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';

const FormTrabajadores = ({data}) => {
    const params = useParams();
    const id = params.id;

    const [cedula, setCedula] = useState(data? data.doc_ident : "");
    const [nombre, setNombre] = useState(data? data.nombres : "");
    const [apellido, setApellido] = useState(data? data.apellidos : "");
    const [email, setEmail] = useState(data? data.email : "");
    const [telefono, setTelefono] = useState(data? data.telefono : "");
    const [cargo, setCargo] = useState(data? data.id_cargo : null);
    const [cargos, setCargos] = useState(null);
    const router = useRouter()

    useEffect(() => {
        const getData = async () => {
            const { data } = await supabase.from('cargos').select();
            setCargos(data)
        }
        getData()
    }, [])

    const handleOnCargoChange = (value) => {
        setCargo(value);
    }

    const handleSave = async (e) => {
        e.preventDefault();
        const data = {
            nombres: nombre,
            apellidos: apellido,
            cedula: cedula,
            email: email,
            telefono: telefono,
            idCargo: cargo.id_cargo
        }
        console.log(data);
        const response = await axios.post('/api/trabajadores', data);
        console.log(response)
        setNombre("");
        setApellido("");
        setCedula("");
        setEmail("");
        setTelefono("");
        setCargo(null);
        router.refresh();
    }
    return (
        <form onSubmit={handleSave}>
            <div className='w-full grid grid-cols-2 p-4 gap-4'>
                <label htmlFor="cedula" className='w-full'>
                    <span>Documento de Identidad:</span>
                    <input
                        type="text"
                        id="cedula"
                        defaultValue={cedula}
                        value={cedula}
                        className={styles['input']}
                        onChange={(e) => setCedula(e.target.value)}
                    />
                </label>
            </div>
            <div className='w-full grid grid-cols-2 p-4 gap-4'>
                <label htmlFor="serie" className='w-full'>
                    <span>Nombres:</span>
                    <input
                        type="text"
                        id="serie"
                        defaultValue={nombre}
                        value={nombre}
                        className={styles['input']}
                        onChange={(e) => setNombre(e.target.value)}
                    />
                </label>
                <label htmlFor="apellido" className='w-full'>
                    <span>Apellidos:</span>
                    <input
                        type="text"
                        id="apellido"
                        defaultValue={apellido}
                        value={apellido}
                        className={styles['input']}
                        onChange={(e) => setApellido(e.target.value)}
                    />
                </label>
            </div>
            <div className='w-full grid grid-cols-2 p-4 gap-4'>
                <label htmlFor="email" className='w-full'>
                    <span>Email:</span>
                    <input
                        type="email"
                        id="email"
                        defaultValue={email}
                        value={email}
                        className={styles['input']}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </label>
                <label htmlFor="telefono" className='w-full'>
                    <span>Teléfono:</span>
                    <input
                        type="tel"
                        id="telefono"
                        defaultValue={telefono}
                        value={telefono}
                        className={styles['input']}
                        onChange={(e) => setTelefono(e.target.value)}
                    />
                </label>
            </div>
            <div className="w-full p-4">
                <Searchbox
                    onChange={handleOnCargoChange}
                    value={(cargo && cargo.cargos_descripcion) ?? ""}
                    label={"Cargo"}
                    list={cargos}
                    accessor={'cargos_descripcion'}
                    identifier={'id_cargo'}
                />
            </div>
            <div className='w-full grid grid-cols-2 p-4 gap-4'>
                <button type="button" className={`btn bg-white text-black`}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span>Cancelar</span>
                </button>
                <button type="submit" className={`btn bg-green-400 text-white`}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 3.75V16.5L12 14.25 7.5 16.5V3.75m9 0H18A2.25 2.25 0 0120.25 6v12A2.25 2.25 0 0118 20.25H6A2.25 2.25 0 013.75 18V6A2.25 2.25 0 016 3.75h1.5m9 0h-9" />
                    </svg>
                    <span>{(id === undefined) ? 'Guardar': 'Actualizar'}</span>
                </button>
            </div>
        </form>
    )
}

export default FormTrabajadores;