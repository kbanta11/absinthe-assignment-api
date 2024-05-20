# Next.js Absinthe API and Frontend Project

This project demonstrates a Next.js application with both backend API routes and a frontend utility to manage and distribute points for users.

## Features

- **API Endpoints**: Generate API keys, manage points, and track events.
- **Frontend Utility**: A simple interface to manually input API keys and distribute points to addresses.

## Prerequisites

- Node.js (>=14.x.x)
- bun, npm or yarn
- Vercel account (for deployment)

## Setup

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/absinthe-project.git
cd absinthe-project
```

### 2. Install Dependencies
```bash
bun install
```

For npm:
```bash
npm install
```

For Yarn:
```bash
yarn install
```

### 3. Set Up Environment Variables
Create a .env.local file in the root of your project and add the following environment variables:

env
Copy code
DATABASE_URL=your-vercel-postgres-connection-string

### 4. Create Database Tables
Run the following script to create the necessary tables in your PostgreSQL database:

```bash
ts-node scripts/createTables.ts
```

### 5. Start the Development Server
```bash
bun run dev
```

For NPM:
```bash
npm run dev
```

Fpr Yarn:
```bash
yarn dev
```

The development server should now be running at http://localhost:3000.

## API Endpoints
### Generate API Key and Campaign ID
#### Endpoint: POST /api/generate-key

This endpoint generates a new API key and campaign ID.

**Request:**

```bash
curl -X POST http://localhost:3000/api/generate-key
```

**Response:**
```json
{
  "apiKey": "generated-api-key",
  "campaignId": "generated-campaign-id"
}
```

### Distribute Points
#### Endpoint: POST /api/distribute

This endpoint distributes points to an address based on an event.

**Request:**
```bash
curl -X POST http://localhost:3000/api/distribute \
-H "Content-Type: application/json" \
-H "api-key: your-api-key" \
-H "campaign-id: your-campaign-id" \
-d '{
  "eventName": "event_name",
  "pointsData": {
    "points": 100,
    "address": "0x123..."
  }
}'
```

**Response:**
```json
{
  "message": "Points distributed successfully."
}
```

### Get Points
#### Endpoint: GET /api/points?address=0x123...

This endpoint retrieves the total points for a specific address.

**Request:**
```bash
curl -X GET http://localhost:3000/api/points \
-H "api-key: your-api-key" \
-H "campaign-id: your-campaign-id" \
-d '{
  "address": "0x123..."
}'
```

**Response:**
```json
[
  {
    "campaign_id": "your-campaign-id",
    "address": "0x123...",
    "points": 100,
    "last_modified": "2023-05-16T12:34:56.789Z"
  }
]
```

### Get Points by Event
#### Endpoint: GET /api/points?address=0x123...&eventName=event_name

This endpoint retrieves points for a specific address filtered by event name.

**Request:**
```bash
curl -X GET http://localhost:3000/api/points \
-H "api-key: your-api-key" \
-H "campaign-id: your-campaign-id" \
-d '{
  "address": "0x123...",
  "eventName": "event_name"
}'
```

**Response:**
```json
[
  {
    "campaign_id": "your-campaign-id",
    "address": "0x123...",
    "event_name": "event_name",
    "points": 100,
    "timestamp": "2023-05-16T12:34:56.789Z"
  }
]
```

## Frontend Utility
The frontend utility allows users to manually input their API key and distribute points to an address.

### Access the Frontend Utility
Navigate to http://localhost:3000 in your web browser.

### Distribute Points Using the Frontend
1. Enter your API key, campaign ID, event name, points, and address in the form.
2. Click the "Distribute Points" button.
3. The message below the form will indicate whether the points were distributed successfully or if there was an error.

## Deployment
To deploy this project to Vercel:

1. Push your repository to GitHub or another Git hosting service.
2. Sign in to Vercel and import your project.
3. Set up the environment variables in the Vercel dashboard.
4. Deploy the project with `vercel` command line.