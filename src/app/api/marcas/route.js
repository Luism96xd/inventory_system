import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase-client';

export async function GET(request) {
    const { data, error } = await supabase
        .from('marcas')
        .select();
    if(error){
        return NextResponse.json([]);
    }
    
    return NextResponse.json(data);
}

export async function POST(request) {
    const requestData = await request.json();
    const { descripcion, inactivo, idSubfamilia } = requestData;

    const { data, error } = await supabase
        .from('marcas')
        .insert([
            { marcas_descripcion: descripcion, inactivo: inactivo, id_subfamilia: idSubfamilia },
        ])
        .select()

    if (error) {
        console.log(error);
        return NextResponse.json({ 'message': 'Hubo un error al insertar' });
    }

    console.log(data);
    return NextResponse.json({ 'message': `Se ha creado la marca con id: ${data[0].id}` });
}
