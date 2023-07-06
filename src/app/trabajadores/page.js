import React from 'react';
import FormTrabajadores from '@/components/FormTrabajadores';
import FormCargos from '@/components/FormCargos';
import TabbedView from '@/components/TabbedView';
import FormAreas from '@/components/FormAreas';
import FormGerencias from '@/components/FormGerencias';
import Table from '@/components/Table';
import { supabase } from '@/lib/supabase-client';

export const revalidate = 5;

const getTrabajadores = async () => {
  const { data: trabajadores } = await supabase.from('trabajadores').select();
  console.log("Getting data")
  return trabajadores ?? [];
}
const getAreas = async () => {
  const { data: areas } = await supabase.from('areas').select();
  console.log("Getting data")
  return areas ?? [];
}
const getGerencias = async () => {
  const { data: gerencias } = await supabase.from('gerencias').select();
  console.log("Getting data")
  return gerencias ?? [];
}
const getCargos = async () => {
  const { data: cargos } = await supabase.from('cargos').select();
  console.log("Getting data")
  return cargos ?? [];
}

const TrabajadoresPage = async () => {
  const tabs = [
    { id: 1, label: 'Listado', name: 'trabajadores', content: <FormTrabajadores /> },
    { id: 2, label: 'Gerencias', name: 'gerencias', content: <FormGerencias /> },
    { id: 3, label: 'Áreas', name: 'areas', content: <FormAreas /> },
    { id: 4, label: 'Cargos', name: 'cargos', content: <FormCargos /> },
  ];

  const gerencias = await getGerencias();
  const areas = await getAreas();
  const cargos = await getCargos();
  const trabajadores = await getTrabajadores();

  const columns = [
    { label: "Nombre", accessor: "nombres", sortable: true },
    { label: "Apellidos", accessor: "apellidos", sortable: true },
    { label: "Email", accessor: "email", sortable: true },
    { label: "Teléfono", accessor: "telefono", sortable: true },
  ];
  const columns2 = [
    { label: "Descripción", accessor: "descripcion", sortable: true },
    { label: "Fecha Creación", accessor: "created_at", sortable: true },
  ];

  return (
    <div className='flex flex-col md:grid md:grid-cols-2 h-screen bg-blue-200 w-full'>
      <div className='p-4'>
        <TabbedView tabs={tabs}>
        </TabbedView>
      </div>
      <div className='p-4'>
        <Table
          data={trabajadores}
          columns={columns}
          caption={"Trabajadores"}
          accessor={"id_trabajador"}
        />
        <br />
        <Table
          data={cargos}
          columns={columns2}
          caption={"Cargos"}
          accessor={"id_cargo"}
        />
        <br />
        <Table
          data={areas}
          columns={columns2}
          caption={"Areas"}
          accessor={"id_area"}
        />
        <br />
        <Table
          data={gerencias}
          columns={columns2}
          caption={"Gerencias"}
          accessor={"id_gerencia"}
        />
      </div>
    </div >
  )
}

export default TrabajadoresPage;
