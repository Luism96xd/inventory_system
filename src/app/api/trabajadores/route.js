import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase-client';

export async function GET(request) {
    const { data, error } = await supabase
        .from('trabajadores')
        .select();
    if(error){
        return NextResponse.json([]);
    }
    return NextResponse.json(data);
}

export async function POST(request) {
    const requestData = await request.json();
    const { nombres, apellidos, cedula, telefono, email, idCargo } = requestData;

    const { data, error } = await supabase
        .from('trabajadores')
        .insert([
            {
                nombres: nombres,
                apellidos: apellidos,
                doc_ident: cedula,
                email: email,
                telefono: telefono,
                id_cargo: idCargo
            },
        ])
        .select()

    if (error) {
        console.log(error);
        return NextResponse.json({ 'message': 'THubo un error al insertar' });
    }

    console.log(data);
    return NextResponse.json({ 'message': `Se ha creado el trabajador con id: ${data[0].id}` });
}
