const { sql } = require('@vercel/postgres');
const dotenv = require('dotenv');
dotenv.config({ path: '.env.development.local' });
console.log(`POSTGRES_URL: ${process.env.POSTGRES_URL}`)

const createTables = async () => {
  try {
    const apiResult = await sql`
      CREATE TABLE IF NOT EXISTS api_keys (
          id SERIAL PRIMARY KEY,
          api_key_hash VARCHAR(255) UNIQUE NOT NULL,
          active BOOLEAN NOT NULL DEFAULT true,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `;
    console.log(`API KEY TABLE CREATED:\n${JSON.stringify(apiResult)}`);

    const campaignResult = await sql`
      CREATE TABLE IF NOT EXISTS campaigns (
          id SERIAL PRIMARY KEY,
          api_key_hash VARCHAR(255) NOT NULL,
          campaign_id VARCHAR(255) UNIQUE NOT NULL,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          FOREIGN KEY (api_key_hash) REFERENCES api_keys (api_key_hash)
      );
    `;
    console.log(`CAMPAIGN TABLE CREATED: ${JSON.stringify(campaignResult)}`)

    const pointsResult = await sql`
        CREATE TABLE IF NOT EXISTS points (
            id SERIAL PRIMARY KEY,
            campaign_id VARCHAR(255) NOT NULL,
            address VARCHAR(255) NOT NULL,
            points INTEGER NOT NULL,
            last_modified TIMESTAMPTZ NOT NULL DEFAULT NOW(),
            UNIQUE (campaign_id, address),
            FOREIGN KEY (campaign_id) REFERENCES campaigns (campaign_id)
        );
    `;
    console.log(`POINTS TABLE CREATED: ${JSON.stringify(pointsResult)}`);

    const eventsResult = await sql`
        CREATE TABLE IF NOT EXISTS events (
            id SERIAL PRIMARY KEY,
            campaign_id VARCHAR(255) NOT NULL,
            address VARCHAR(255) NOT NULL,
            event_name VARCHAR(255) NOT NULL,
            points INTEGER NOT NULL,
            timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
            FOREIGN KEY (campaign_id) REFERENCES campaigns (campaign_id)
        );
    `
    console.log(`EVENTS TABLE CREATED: ${JSON.stringify(eventsResult)}`);

    console.log("Tables created successfully!");
  } catch (error) {
    console.error("Error creating tables:", error);
  }
};

createTables();