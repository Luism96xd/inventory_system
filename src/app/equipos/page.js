"use client";

import React, { useEffect, useState } from 'react';
import FormEquipos from '@/components/FormEquipos';
import Table from '@/components/Table';
import TabbedView from '@/components/TabbedView';
import { supabase } from '@/lib/supabase-client';
import { flattenObject } from '@/lib/utils';

const EquiposPage = () => {
    const [currentTab, setCurrentTab] = useState(0);
    const [data, setData] = useState([]);

    useEffect(() => {
        const getData = async () => {
            const { data } = await supabase.from("equipos").select(`
            *,
            modelos:id_modelo(modelos_descripcion, id_marca),
            marcas:id_marca(marcas_descripcion, id_marca),
            subfamilias:id_subfamilia(subfamilias_descripcion, id_familia),
            familias:id_familia(familias_descripcion),
            sedes:id_sede(sedes_descripcion)
            `);
            const flattenedData = data.map((row) => {
                return flattenObject(row);
            })
            console.log(flattenedData)
            setData(flattenedData);
        }
        getData();
        return () => {
            getData();
        }
    }, [])


    const columns = [
        { label: "Modelo", accessor: "modelos_descripcion", sortable: true },
        { label: "Marca", accessor: "marcas_descripcion", sortable: true },
        { label: "Familia", accessor: "familias_descripcion", sortable: true },
        { label: "Subfamilia", accessor: "subfamilias_descripcion", sortable: true },
        { label: "Serial", accessor: "serial", sortable: true },
        { label: "Fecha Registro", accessor: "fecha_registro", sortable: true, sortbyOrder: "desc" },
    ];

    const tabs = [
        { id: 1, label: 'Listado', name: "equipos", columns: columns, accessor: "id_equipo", title: "Equipos" },
        { id: 2, label: 'Mantenimiento', name: "subfamilias", columns: columns, accessor: "id_subfamilia", title: "Mantenimiento" },
    ];

    return (
        <div className='p-4 w-full h-screen bg-blue-200'>
            <TabbedView tabs={tabs} currentTab={currentTab}>
                <div className='flex flex-col p-4'>
                    <Table
                        caption={'Equipos Tecnológicos'}
                        data={data}
                        columns={columns}
                        id={"id_equipo"}
                        tableName={"equipos"}
                    />
                </div>
                <div className='flex flex-col md:grid md:grid-cols-2'>
                    <FormEquipos />
                </div>
            </TabbedView>
        </div >
    )
}

export default EquiposPage;