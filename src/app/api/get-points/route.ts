import { NextRequest, NextResponse } from "next/server";
import { QueryResult, sql } from '@vercel/postgres';
import bcrypt from 'bcryptjs';
import { nanoid } from 'nanoid';
import verifyApiKey from "@/app/lib/verifyApiKey";

type Params = {
    address: string | undefined;
    eventName: string | undefined;
}

export async function GET(req: NextRequest, context: { params: Params }) {
    try {
        const apiKey = req.headers.get('api-key');
        const campaignId = req.headers.get('campaign-id');
        const eventName = req.nextUrl.searchParams.get('eventName');
        const address = req.nextUrl.searchParams.get('address');
        if (apiKey && await verifyApiKey(apiKey)) {
            if (eventName) {
                const data = await sql`SELECT * FROM events WHERE address = ${address} AND event_name = ${eventName} AND campaign_id = ${campaignId} ORDER BY timestamp desc;`;
                return NextResponse.json({ success: true, rows: data.rows }, { status: 200 })
            } else {
                const data = await sql`SELECT * FROM points WHERE address = ${address} AND campaign_id = ${campaignId};`;
                return NextResponse.json({ success: true, rows: data.rows }, { status: 200 })
            }
        }
        return NextResponse.json({ error: 'Invalid API Key'}, { status: 405 });
    } catch (e) {
        console.error(`Error getting points:  ${e}`);
        return NextResponse.json({ error: 'Internal Server Error'}, { status: 500});
    }
}