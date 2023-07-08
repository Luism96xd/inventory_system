import FormEquipos from '@/components/FormEquipos';
import Table from '@/components/Table';
import { supabase } from '@/lib/supabase-client';

const EditEquiposPage = ({id}) => {
    return (
        <div className='flex flex-col md:grid md:grid-cols-2 h-screen bg-blue-200 w-full'>
            <div className='p-4'>
                <FormEquipos id={id}/>
            </div>
            <div className='p-4'>

            </div>
        </div>
    )
}

export default EditEquiposPage;