import FormUnidMedidas from '@/components/equipos/FormUnidMedidas';
import Table from '@/components/Table';
import { supabase } from '@/lib/supabase-client';

export const revalidate = 5;

const getData = async () => {
    const { data, error } = await supabase.from('unid_medidas').select();
    return data ?? [];
}

const TrabajadoresPage = async () => {
    const data = await getData();

    const columns = [
        { label: "Descripción", accessor: "unid_medidas_descripcion", sortable: true },
        { label: "Abreviatura", accessor: "abrev", sortable: true },
        { label: "Inactivo", accessor: "inactivo", sortable: true },
    ];

    return (
        <div className='flex flex-col md:grid md:grid-cols-2 h-screen bg-blue-200 w-full'>
            <div className='p-4 bg-gray-200'>
                <FormUnidMedidas />
            </div>
            <div className='p-4'>
                {data && <Table
                    data={data}
                    columns={columns}
                    caption={"Unidades de Medida"}
                    id={'id_unid_medida'}
                    tableName={"unid_medidas"}
                />}
            </div>
        </div >
    )
}

export default TrabajadoresPage;
