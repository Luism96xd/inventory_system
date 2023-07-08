import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase-client';

export async function GET(request) {
    const { data, error } = await supabase
        .from('unid_medidas')
        .select();
    if(error){
        return NextResponse.json([]);
    }
    return NextResponse.json(data);
}

export async function POST(request) {
    const requestData = await request.json();
    const { descripcion, inactivo, abrev} = requestData;

    const { data, error } = await supabase
        .from('unid_medidas')
        .insert([
            { unid_medidas_descripcion: descripcion, inactivo: inactivo, abrev: abrev },
        ])
        .select()

    if (error) {
        console.log(error);
        return NextResponse.json({ 'message': 'THubo un error al insertar' });
    }

    console.log(data);
    return NextResponse.json({ 'message': `Se ha creado la unidad de medida con id: ${data[0].id}` });
}
