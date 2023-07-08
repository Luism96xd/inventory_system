import FormContratos from '@/components/equipos/FormContratos';
import Table from '@/components/Table';
import { supabase } from '@/lib/supabase-client';

export const revalidate = 5;

const getData = async () => {
    const { data, error } = await supabase.from('contratos').select();
    return data ?? [];
}

const TrabajadoresPage = async () => {
    const data = await getData();

    const columns = [
        { label: "Descripción", accessor: "contratos_descripcion", sortable: true },
        { label: "Inactivo", accessor: "inactivo", sortable: true },
        { label: "Fecha Creación", accessor: "created_at", sortable: true },
    ];

    return (
        <div className='flex flex-col md:grid md:grid-cols-2 h-screen bg-blue-200 w-full'>
            <div className='p-4 bg-gray-200'>
                <FormContratos />
            </div>
            <div className='p-4'>
                {data && <Table
                    data={data}
                    columns={columns}
                    caption={"Contratos"}
                    id={'id_contrato'}
                    tableName={"contratos"}
                    actions={true}
                />}
            </div>
        </div >
    )
}

export default TrabajadoresPage;
