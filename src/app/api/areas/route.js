import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase-client';

export async function GET(request) {
    const { data, error } = await supabase
        .from('areas')
        .select();
    if(error){
        return NextResponse.json([]);
    }
    
    return NextResponse.json(data);
}

export async function POST(request) {
    const requestData = await request.json();
    const { descripcion, idGerencia } = requestData;

    const { data, error } = await supabase
        .from('areas')
        .insert([
            { areas_descripcion: descripcion, id_gerencia: idGerencia },
        ])
        .select()

    if (error) {
        console.log(error);
        return NextResponse.json({ 'message': 'Hubo un error al insertar' });
    }

    console.log(data);
    return NextResponse.json({ 'message': `Se ha creado el área con id: ${data[0].id}` });
}
