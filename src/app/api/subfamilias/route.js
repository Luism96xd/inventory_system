import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase-client';

export async function GET(request) {
    const { data, error } = await supabase
        .from('subfamilias')
        .select();
    if(error){
        return NextResponse.json([]);
    }
    
    return NextResponse.json(data);
}

export async function POST(request) {
    const requestData = await request.json();
    const { descripcion, inactivo, idFamilia } = requestData;

    const { data, error } = await supabase
        .from('subfamilias')
        .insert([
            { subfamilias_descripcion: descripcion, inactivo: inactivo, id_familia: idFamilia },
        ])
        .select()

    if (error) {
        console.log(error);
        return NextResponse.json({ 'message': 'Hubo un error al insertar' });
    }

    console.log(data);
    return NextResponse.json({ 'message': `Se ha creado la subfamilia con id: ${data[0].id}` });
}
