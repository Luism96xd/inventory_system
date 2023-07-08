import FormEquipos from '@/components/FormEquipos';
import { supabase } from '@/lib/supabase-client';

export const revalidate = 5;

const getData = async (id) => {
    const { data, error } = await supabase.from('equipos').select(`
        *,
            modelos:id_modelo(modelos_descripcion, id_marca),
            marcas:id_marca(marcas_descripcion, id_marca),
            subfamilias:id_subfamilia(subfamilias_descripcion, id_familia),
            familias:id_familia(familias_descripcion),
            sedes:id_sede(sedes_descripcion)
    `).eq('id_equipo', id).single();

    if(error){
        console.log(error);
    }
    return data;
}

const EditEquiposPage = async ({params}) => {
    const data = await getData(params.id);
    return (
        <div className='flex flex-col md:grid md:grid-cols-2 h-screen bg-blue-200 w-full'>
            <div className='p-4'>
                <FormEquipos data={data}/>
            </div>
            <div className='p-4'>

            </div>
        </div>
    )
}

export default EditEquiposPage;