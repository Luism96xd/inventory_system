import FormSedes from '@/components/equipos/FormSedes';
import FormUnidMedidas from '@/components/equipos/FormUnidMedidas';
import Table from '@/components/Table';
import { supabase } from '@/lib/supabase-client';

export const revalidate = 5;

const getData = async () => {
    const { data, error } = await supabase.from('sedes').select();
    return data ?? [];
}

const TrabajadoresPage = async () => {
    const data = await getData();

    const columns = [
        { label: "Descripción", accessor: "sedes_descripcion", sortable: true },
        { label: "Fecha Creación", accessor: "created_at", sortable: true },
    ];

    return (
        <div className='flex flex-col md:grid md:grid-cols-2 h-screen bg-blue-200 w-full'>
            <div className='p-4 bg-gray-200'>
                <FormSedes />
            </div>
            <div className='p-4'>
                {data && <Table
                    data={data}
                    columns={columns}
                    caption={"Sedes"}
                    id={'id_sede'}
                    tableName={"sedes"}
                />}
            </div>
        </div >
    )
}

export default TrabajadoresPage;
