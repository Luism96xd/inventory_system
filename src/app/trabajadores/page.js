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
import Link from 'next/link';

//export const revalidate = 5;

const TrabajadoresPage = () => {
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([])
  const [caption, setCaption] = useState("");
  const [accessor, setAccessor] = useState("id");
  const [tableName, setTableName] = useState("trabajadores");

  const cols1 = [
    { label: "Nombre", accessor: "nombres", sortable: true },
    { label: "Apellidos", accessor: "apellidos", sortable: true, sortbyOrder: "asc" },
    { label: "Email", accessor: "email", sortable: true },
    { label: "Teléfono", accessor: "telefono", sortable: true },
  ];

  const cols2 = [
    { label: "Descripción", accessor: "gerencias_descripcion", sortable: true },
    { label: "Fecha Creación", accessor: "created_at", sortable: true, sortbyOrder: "desc" },
  ];
  const cols3 = [
    { label: "Descripción", accessor: "areas_descripcion", sortable: true },
    { label: "Fecha Creación", accessor: "created_at", sortable: true, sortbyOrder: "desc" },
  ];
  const cols4 = [
    { label: "Descripción", accessor: "cargos_descripcion", sortable: true },
    { label: "Fecha Creación", accessor: "created_at", sortable: true, sortbyOrder: "desc" },
  ];

  const tabs = [
    { id: 1, label: 'Listado', name: 'trabajadores', columns: cols1, accessor: "id_trabajador", title: "Trabajadores" },
    { id: 2, label: 'Gerencias', name: 'gerencias', columns: cols2, accessor: "id_gerencia", title: "Gerencias" },
    { id: 3, label: 'Áreas', name: 'areas', columns: cols3, accessor: "id_area", title: "Áreas" },
    { id: 4, label: 'Cargos', name: 'cargos', columns: cols4, accessor: "id_cargo", title: "Cargos" },
  ];

  const changeTableData = async (currentTab) => {
    const table = tabs[currentTab].name;
    const { data } = await supabase.from(table).select();
    console.log("Getting data");
    setCaption(tabs[currentTab].title)
    setAccessor(tabs[currentTab].accessor);
    setData(data);
    setColumns(tabs[currentTab].columns);
    setTableName(tabs[currentTab].name)
  }


  return (
    <div className='flex flex-col md:grid md:grid-cols-2 h-screen bg-blue-200 w-full'>
      <div className='p-4'>
        <TabbedView tabs={tabs} handleOnTabChange={changeTableData}>
          <FormTrabajadores />
          <FormGerencias />
          <FormAreas />
          <FormCargos />
        </TabbedView>
      </div>
      <div className='p-4'>
        {data && <Table
          data={data}
          columns={columns}
          caption={caption}
          id={accessor}
          tableName={tableName}
        />}
      </div>
    </div >
  )
}

export default TrabajadoresPage;
