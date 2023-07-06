import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase-client';

export async function GET(request) {
    const { data, error } = await supabase
        .from('cargos')
        .select();
    if(error){
        return NextResponse.json([]);
    }
    
    return NextResponse.json(data);
}

export async function POST(request) {
    const requestData = await request.json();
    const { descripcion, idArea } = requestData;

    const { data, error } = await supabase
        .from('cargos')
        .insert([
            { id_area: idArea, descripcion: descripcion },
        ])
        .select()

    if (error) {
        console.log(error);
        return NextResponse.json({ 'message': 'Hubo un error al insertar' });
    }

    console.log(data);
    return NextResponse.json({ 'message': `Se ha creado el cargo con id: ${data[0].id}` });
}
