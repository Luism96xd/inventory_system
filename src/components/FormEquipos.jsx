"use client";

import React, { useState } from 'react';
import styles from "@/styles/Forms.module.css";
import Searchbox from '@/components/SearchBox';

const FormEquipos = () => {
  const [marca, setMarca] = useState(null);
  const [modelo, setModelo] = useState(null);
  const [ubicacion, setUbicacion] = useState(null);
  const [serie, setSerie] = useState(0);
  const [familia, setFamilia] = useState(null);
  const [subfamilia, setSubfamilia]= useState(null); 
  const [inventoryNumber, setInventoryNumber] = useState(0);

  const marcas = [
    { id: 1, name: 'Marca 1' },
    { id: 2, name: 'Marca 2' },
    { id: 3, name: 'Marca 3' },
  ];
  const modelos = [
    { id: 1, name: 'Modelo 1', marca: 'Samsung' },
    { id: 2, name: 'Modelo 2', marca:'LG' },
    { id: 3, name: 'Modelo 3', marca: 'Xiaomi' },
  ];

  const ubicaciones = [
    { id: 1, name: 'Almacén 1' },
    { id: 2, name: 'Almacén 2' },
    { id: 3, name: 'Almacén 3' },
  ];
  const familias = [
    { id: 1, name: 'Monitores', subfamilia: 'Monitor LCD' },
    { id: 2, name: 'Teclados',  subfamilia: 'Teclado de Membrana'},
    { id: 3, name: 'CPUs',  subfamilia: 'Intel Core I7' },
  ];


  const handleOnMarcaChange = (value) => {
    setMarca(value);
    console.log(marca);
  }
  const handleOnModeloChange = (value) => {
    setModelo(value);
    console.log(marca);
  }
  const handleOnUbicacionesChange = (value) => {
    setUbicacion(value);
    console.log(ubicacion);
  }
  const handleOnFamiliaChange = (value) => {
    setFamilia(value);
    setSubfamilia(value.subfamilia)
    console.log(familia);
    console.log(subfamilia);
  }
  const handleSave = (e) => {
    e.preventDefault();
    const data = {
      modelo: modelo.id,
      marca: marca.id,
      familia: familia.id,
      subfamilia: subfamilia.id,
      serie: serie,
      inventoryNumber: inventoryNumber,
      ubicacion: ubicacion.id
    }
    console.log(data);
  } 

  return (
    <form onSubmit={handleSave} className={`${styles.form} w-full flex flex-col`}>
      <div className='grid grid-cols-2 gap-4'>
        <Searchbox 
          onChange={handleOnMarcaChange} 
          value={(marca && marca.name || modelo && modelo.marca) ?? ""} 
          label={"Marca"} 
          list={marcas}
        />
        <Searchbox 
          onChange={handleOnModeloChange} 
          value={(modelo && modelo.name) ?? ""} 
          label={"Modelo"} 
          list={modelos}
        />
      </div>
      <div className='grid grid-cols-2 gap-4'>
        <Searchbox 
          onChange={handleOnFamiliaChange} 
          value={(familia && familia.name) ?? ""} 
          label={"Familia"} 
          list={familias}
        />
        <label htmlFor="subfamilia" className='w-full'>
          <span>Subfamilia:</span>
          <input 
            type="text" 
            id="subfamilia" 
            value={(familia && familia.subfamilia) ?? ""} 
            className={styles['input']} readOnly/>
        </label>
      </div>
      <div className="w-full grid grid-cols-2 gap-4">
        <label htmlFor="serie" className='w-full'>
          <span>Serie:</span>
          <input 
            type="text" 
            id="serie" 
            className={styles['input']} 
            onChange={(e) => setSerie(e.target.value)}
          />
        </label>
        <label htmlFor="inventorynumber" className='w-full'>
          <span>Nro de Inventario:</span>
          <input 
            type="text" 
            id="inventorynumber" 
            className={styles['input']}  
            onChange={(e) => setInventoryNumber(e.target.value)}
          />
        </label>
      </div>
      <div className="w-full">
        <Searchbox 
          onChange={handleOnUbicacionesChange} 
          value={(ubicacion && ubicacion.name) ?? ""} 
          label={"Ubicación"} 
          list={ubicaciones}
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