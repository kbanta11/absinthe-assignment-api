import { NextRequest, NextResponse } from "next/server";
import { sql } from '@vercel/postgres';
import bcrypt from 'bcryptjs';
import { nanoid } from 'nanoid';

export async function POST(req: NextRequest) {
    try {
        // generate a unique API key and hashed key, and unique campaignId for first campaign for key
        const apiKey = nanoid(32);
        const hashedKey = await bcrypt.hash(apiKey, 10);
        const campaignId = nanoid(16);
        
        // console.log(`API KEY: ${apiKey}\nHashed Key: ${hashedKey}\nCampaign Id: ${campaignId}`);
        // const testHash = await bcrypt.hash('test', 10);
        // console.log(`Test Hash: ${testHash} == ${await bcrypt.compare('test', testHash)}`);

        // store hashed key in api_keys table and campaign in campaigns table
        const apiResult = await sql`INSERT INTO api_keys (api_key_hash) VALUES (${hashedKey});`;
        const campaignResult = await sql`INSERT INTO campaigns (api_key_hash, campaign_id) VALUES (${hashedKey}, ${campaignId});`;


        return NextResponse.json({
            API_KEY: apiKey,
            WARNING: 'Make sure to securely store this key. You will not be able to access it again.',
            CAMPAIGN_ID: campaignId,
        }, { status: 200 });
    } catch (e) {
        console.error('Error generating and storing API Key: ', e);
        return NextResponse.json({ error: 'Internal Server Error'}, { status: 500});
    }
}