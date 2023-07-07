'use client';
import React, { useContext, useEffect, useState } from 'react';
import FormTrabajadores from '@/components/trabajadores/FormTrabajadores';
import FormCargos from '@/components/trabajadores/FormCargos';
import TabbedView from '@/components/TabbedView';
import FormAreas from '@/components/trabajadores/FormAreas';
import FormGerencias from '@/components/trabajadores/FormGerencias';
import Table from '@/components/Table';
import { supabase } from '@/lib/supabase-client';
import { useStore } from '@/stores/store';

//export const revalidate = 5;

const TrabajadoresPage = () => {
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([])
  const [caption, setCaption] = useState("");
  const [accessor, setAccessor] = useState("id");

  const people = [
    { label: "Nombre", accessor: "nombres", sortable: true },
    { label: "Apellidos", accessor: "apellidos", sortable: true, sortbyOrder: "asc"  },
    { label: "Email", accessor: "email", sortable: true  },
    { label: "Teléfono", accessor: "telefono", sortable: true },
  ];

  const types = [
    { label: "Descripción", accessor: "descripcion", sortable: true },
    { label: "Fecha Creación", accessor: "created_at", sortable: true, sortbyOrder: "desc"  },
  ];

  const tabs = [
    { id: 1, label: 'Listado', name: 'trabajadores', content: <FormTrabajadores />, columns: people, accessor: "id_trabajador", title: "Trabajadores"},
    { id: 2, label: 'Gerencias', name: 'gerencias', content: <FormGerencias />, columns: types, accessor: "id_gerencia", title: "Gerencias" },
    { id: 3, label: 'Áreas', name: 'areas', content: <FormAreas />, columns: types, accessor: "id_area", title: "Áreas" },
    { id: 4, label: 'Cargos', name: 'cargos', content: <FormCargos />, columns: types, accessor: "id_cargo", title: "Cargos" },
  ];
  
  const changeTableData = async (currentTab) => {
    const table = tabs[currentTab].name;
    const { data } = await supabase.from(table).select();
    console.log("Getting data");
    setCaption(tabs[currentTab].title)
    setAccessor(tabs[currentTab].accessor);
    setData(data);
    setColumns(tabs[currentTab].columns);
  }


  return (
    <div className='flex flex-col md:grid md:grid-cols-2 h-screen bg-blue-200 w-full'>
      <div className='p-4'>
        <TabbedView 
          tabs={tabs}
          handleOnTabChange={changeTableData}
        >
        </TabbedView>
      </div>
      <div className='p-4'>
        {data && <Table
          data={data}
          columns={columns}
          caption={caption}
          id={accessor}
        />}
      </div>
    </div >
  )
}

export default TrabajadoresPage;
