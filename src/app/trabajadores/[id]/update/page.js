import Table from '@/components/Table';
import FormTrabajadores from '@/components/trabajadores/FormTrabajadores';
import { supabase } from '@/lib/supabase-client';

export const revalidate = 5;

const getData = async (id) => {
    const { data, error } = await supabase.from('trabajadores').select().eq('id_trabajador', id);
    return data ?? [];
}
const EditTrabajadoresPage = async ({params}) => {
    const data = await getData(params.id);

    const columns = [
        { label: "Nombre", accessor: "nombres", sortable: true },
        { label: "Apellidos", accessor: "apellidos", sortable: true, sortbyOrder: "asc"  },
        { label: "Email", accessor: "email", sortable: true  },
        { label: "Teléfono", accessor: "telefono", sortable: true },
      ];
    
    return (
        <div className='flex flex-col md:grid md:grid-cols-2 h-screen bg-blue-200 w-full'>
            <div className='p-4'>
                <FormTrabajadores data={data[0]}/>
            </div>
            <div className='p-4'>
                {data && <Table
                    caption={'Trabajadores'}
                    data={data}
                    columns={columns}
                    accessor={"id_trabajador"}
                    actions={false}
                    tableName={"trabajadores"}
                />
                }
            </div>
        </div>
    )
}

export default EditTrabajadoresPage;