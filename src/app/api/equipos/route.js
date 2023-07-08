import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase-client';

export async function GET(request) {
    const { data, error } = await supabase
        .from('equipos')
        .select();
    if(error){
        return NextResponse.json([]);
    }
    
    return NextResponse.json(data);
}

export async function POST(request) {
    const requestData = await request.json();
    const { idModelo, serie, inventoryNumber, idSede, idMarca, idSubfamilia, idFamilia} = requestData;

    const { data, error } = await supabase
        .from('equipos')
        .insert([ 
            { 
                id_modelo: idModelo,
                serial: serie,
                inventory_number: inventoryNumber,
                id_sede: idSede,
                id_marca: idMarca,
                id_subfamilia: idSubfamilia,
                id_familia: idFamilia
            },
        ])
        .select()

    if (error) {
        console.log(error);
        return NextResponse.json({ 'message': 'Hubo un error al insertar' });
    }

    console.log(data);
    return NextResponse.json({ 'message': `Se ha creado el equipo con id: ${data[0].id}` });
}
