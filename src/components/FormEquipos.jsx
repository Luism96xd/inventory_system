"use client";

import React, { useEffect, useState } from 'react';
import styles from "@/styles/Forms.module.css";
import Searchbox from '@/components/SearchBox';
import { supabase } from '@/lib/supabase-client';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const FormEquipos = ({id}) => {
  const [marca, setMarca] = useState(null);
  const [modelo, setModelo] = useState(null);
  const [familia, setFamilia] = useState(null);
  const [subfamilia, setSubfamilia] = useState(null);
  const [ubicacion, setUbicacion] = useState(null);
  const [serie, setSerie] = useState("");
  const [inventoryNumber, setInventoryNumber] = useState("");
  //Listas
  const [modelos, setModelos] = useState([]);
  const [subfamilias, setSubfamilias] = useState([]);
  const [sedes, setSedes] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const getData = async () => {
      const { data: modelos, error: error_modelos } = await supabase.from('modelos').select(`
        id_modelo,
        modelos_descripcion,
        marcas (id_marca, marcas_descripcion, id_subfamilia)
      `)
      const { data: subfamilias, error: error_subfamilias } = await supabase.from('subfamilias').select(`
        id_subfamilia,
        subfamilias_descripcion,
        familias (id_familia, familias_descripcion)
      `)
      const { data: sedes, error: error_sedes } = await supabase.from('sedes').select();
      setSedes(sedes)
      setModelos(modelos)
      setSubfamilias(subfamilias)
    }
    getData();
  }, [])


  const handleOnModeloChange = (value) => {
    setModelo(value);
    setMarca(value.marcas)
    setSubfamilia(subfamilias[0])
    setFamilia(subfamilias[0].familias)
  }

  const handleOnUbicacionesChange = (value) => {
    setUbicacion(value);
    console.log(ubicacion);
  }

  const handleSave = async (e) => {
    e.preventDefault();
    const data = {
      idModelo: modelo.id_modelo,
      idMarca: marca.id_marca,
      idFamilia: familia.id_familia,
      idSubfamilia: subfamilia.id_subfamilia,
      serie: serie,
      inventoryNumber: inventoryNumber,
      idSede: ubicacion.id_sede
    }
    console.log(data);
    const response = await axios.post('/api/equipos', data);
    console.log(response)
    setMarca(null);
    setModelo(null);
    setFamilia(null);
    setSubfamilia(null);
    setSerie("");
    setInventoryNumber("");
    setUbicacion(null)
    router.refresh()
  }

  return (
    <form onSubmit={handleSave} className={`${styles.form} w-full flex flex-col justify-start items-start`}>
      <div className='grid grid-cols-2 gap-4 justify-start items-start'>
        <Searchbox
          onChange={handleOnModeloChange}
          value={(modelo && modelo.modelos_descripcion) ?? ""}
          label={"Modelo"}
          list={modelos}
          accessor={"modelos_descripcion"}
          identifier={"id_modelo"}
        />
        <label htmlFor="marca" className='w-full'>
          <span>Marca:</span>
          <input
            type="text"
            id="marca"
            value={(marca && marca.marcas_descripcion) ?? ""}
            className={styles['input']} readOnly />
        </label>
      </div>
      <div className='grid grid-cols-2 gap-4'>
        <label htmlFor="familia" className='w-full'>
          <span>Familia:</span>
          <input
            type="text"
            id="familia"
            value={(familia && familia.familias_descripcion) ?? ""}
            className={styles['input']} readOnly />
        </label>
        <label htmlFor="subfamilia" className='w-full'>
          <span>Subfamilia:</span>
          <input
            type="text"
            id="subfamilia"
            value={(subfamilia && subfamilia.subfamilias_descripcion) ?? ""}
            className={styles['input']} readOnly />
        </label>
      </div>
      <div className="w-full grid grid-cols-2 gap-4">
        <label htmlFor="serie" className='w-full'>
          <span>Serie:</span>
          <input
            type="text"
            id="serie"
            value={serie}
            className={styles['input']}
            onChange={(e) => setSerie(e.target.value)}
          />
        </label>
        <label htmlFor="inventorynumber" className='w-full'>
          <span>Nro de Inventario:</span>
          <input
            type="text"
            id="inventorynumber"
            value={inventoryNumber}
            className={styles['input']}
            onChange={(e) => setInventoryNumber(e.target.value)}
          />
        </label>
      </div>
      <div className="w-full">
        <Searchbox
          onChange={handleOnUbicacionesChange}
          value={(ubicacion && ubicacion.sedes_descripcion) ?? ""}
          label={"Ubicación"}
          list={sedes}
          accessor={"sedes_descripcion"}
          identifier={"id_sede"}
        />
      </div>
      <div className='w-full'>
        <label htmlFor="observaciones" className='flex flex-col'>
          <span>Observaciones:</span>
          <textarea id="observaciones" cols="30" rows="3"></textarea>
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

export default FormEquipos;