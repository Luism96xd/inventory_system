import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase-client';

export async function POST(request) {
    const requestData = await request.json();
    const { descripcion } = requestData;

    const { data, error } = await supabase
        .from('gerencias')
        .insert([
            { descripcion: descripcion },
        ])
        .select()

    if (error) {
        console.log(error);
        return NextResponse.json({ 'message': 'THubo un error al insertar' });
    }

    console.log(data);
    return NextResponse.json({ 'message': `Se ha creado la gerencia con id: ${data[0].id}` });
}


export async function GET(request) {
    const { data, error } = await supabase
        .from('gerencias')
        .select();
    if(error){
        return NextResponse.json([]);
    }
    
    return NextResponse.json(data);
}