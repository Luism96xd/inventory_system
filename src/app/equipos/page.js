import React from 'react';
import FormEquipos from '@/components/FormEquipos';
import Table from '@/components/Table';
import TabbedView from '@/components/TabbedView';

const EquiposPage = () => {
    const tabs = [
        { id: 1, label: 'Listado', content: <div>Listado</div>},
        { id: 2, label: 'Mantenimiento', content: <FormEquipos /> },
    ];


    const data = [
        {
            "id": 1,
            "full_name": "Wendall Gripton",
            "email": "wg@creative.org",
            "gender": "Male",
            "start_date": "2022-01-26"
        },
        {
            "id": 2,
            "full_name": "John Doe",
            "email": "john.doe@creative.org",
            "gender": "Male",
            "start_date": "2022-01-26"
        },
        {
            "id": 3,
            "full_name": "Jane Doe",
            "email": "jane.doe@creative.org",
            "gender": "Female",
            "start_date": "2022-01-26"
        },
    ];

    const columns = [
        { label: "Full Name", accessor: "full_name", sortable: true },
        { label: "Email", accessor: "email", sortable: true },
        { label: "Gender", accessor: "gender", sortable: true },
        { label: "Fecha", accessor: "start_date", sortable: true },
    ];

    return (
        <div className='flex flex-col md:grid md:grid-cols-2 h-screen bg-blue-200 w-full'>
            <div className='p-4'>
                <TabbedView tabs={tabs}>
                </TabbedView>
            </div>
            <div className='p-4'>
                <Table
                    caption={'Equipos Asignados'}
                    data={data}
                    columns={columns}
                    accessor={"id"}
                />
            </div>
        </div>
    )
}

export default EquiposPage;