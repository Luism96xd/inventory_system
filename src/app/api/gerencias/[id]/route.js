import{ NextResponse } from 'next/server';

export async function POST(request){
    console.log(request);
    NextResponse.json({'message': 'OK'});
}


export async function GET(request){
    console.log(request);
    NextResponse.json({'message': 'OK'});
}