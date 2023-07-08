import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase-client';

export async function DELETE(request, { params }) {
    const idEquipo = params.id;

    const { error } = await supabase
        .from('equipos')
        .delete()
        .eq('id_equipo', idEquipo);

    if (error) {
        console.log(error);
        return NextResponse.json(error.message);
    }

    return NextResponse.json({ message: "OK" });
}

export async function PUT(request, {params}) {
    const idEquipo = params.id;
    const requestData = await request.json();
    const {idModelo, serie, inventoryNumber, idSede, idMarca, idSubfamilia, idFamilia, observacion } = requestData;

    const { data, error } = await supabase
        .from('equipos')
        .update([
            {
                id_modelo: idModelo,
                serial: serie,
                inventory_number: inventoryNumber,
                id_sede: idSede,
                id_marca: idMarca,
                id_subfamilia: idSubfamilia,
                id_familia: idFamilia,
                observacion: observacion,
            },
        ]).eq('id_equipo', idEquipo)
        .select();

    if (error) {
        console.log(error);
        return NextResponse.json({ 'message': 'Hubo un error al actualizar' });
    }

    console.log(data);
    return NextResponse.json({ 'message': `Se ha actualizado el equipo con id: ${data[0].id_equipo}` });
}
