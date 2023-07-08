'use client';

import React, { useState } from 'react';
import FormFamilias from '@/components/equipos/FormFamilias';
import FormSubfamilias from '@/components/equipos/FormSubfamilias';
import Table from '@/components/Table';
import TabbedView from '@/components/TabbedView';
import { supabase } from '@/lib/supabase-client';
import FormMarcas from '@/components/equipos/FormMarcas';
import FormModelos from '@/components/equipos/FormModelos';

const FamiliasPage = () => {
    const [data, setData] = useState([]);
    const [columns, setColumns] = useState([])
    const [caption, setCaption] = useState("");
    const [accessor, setAccessor] = useState("id");
    const [tableName, setTableName] = useState("familias");

    const cols1 = [
        { label: "Descripción", accessor: "familias_descripcion", sortable: true },
        { label: "Inactivo", accessor: "inactivo", sortable: true },
        { label: "Fecha Creación", accessor: "created_at", sortable: true, sortbyOrder: "desc" },
    ];
    const cols2 = [
        { label: "Descripción", accessor: "subfamilias_descripcion", sortable: true },
        { label: "Inactivo", accessor: "inactivo", sortable: true },
        { label: "Fecha Creación", accessor: "created_at", sortable: true, sortbyOrder: "desc" },
    ];
    const cols3 = [
        { label: "Descripción", accessor: "marcas_descripcion", sortable: true },
        { label: "Inactivo", accessor: "inactivo", sortable: true },
        { label: "Fecha Creación", accessor: "created_at", sortable: true, sortbyOrder: "desc" },
    ];
    const cols4 = [
        { label: "Descripción", accessor: "modelos_descripcion", sortable: true },
        { label: "Inactivo", accessor: "inactivo", sortable: true },
        { label: "Fecha Creación", accessor: "created_at", sortable: true, sortbyOrder: "desc" },
    ];

    const tabs = [
        { id: 1, label: 'Familias', name: "familias", columns: cols1, accessor: "id_familia", title: "Familias" },
        { id: 2, label: 'Subfamilias', name: "subfamilias", columns: cols2, accessor: "id_subfamilia", title: "Subfamilias" },
        { id: 3, label: 'Marcas', name: "marcas", columns: cols3, accessor: "id_marca", title: "Marcas" },
        { id: 4, label: 'Modelos', name: "modelos", columns: cols4, accessor: "id_modelo", title: "Modelos" },

    ];
    const changeTableData = async (currentTab) => {
        const table = tabs[currentTab].name;
        const { data } = await supabase.from(table).select();
        console.log("Getting data");
        setCaption(tabs[currentTab].title)
        setAccessor(tabs[currentTab].accessor);
        setData(data);
        setColumns(tabs[currentTab].columns);
        setTableName(tabs[currentTab].name);
    }

    return (
        <div className='flex flex-col md:grid md:grid-cols-2 w-full h-screen bg-blue-200 items-start'>
            <div className='p-4 flex flex-col'>
                <TabbedView tabs={tabs} handleOnTabChange={changeTableData}>
                    <FormFamilias />
                    <FormSubfamilias />
                    <FormMarcas />
                    <FormModelos />
                </TabbedView>
            </div>
            <div className="p-4">
                {data &&
                    <Table
                        caption={caption}
                        data={data}
                        columns={columns}
                        id={accessor}
                        tableName={tableName}
                    />
                }
            </div>
        </div>
    )
}

export default FamiliasPage;