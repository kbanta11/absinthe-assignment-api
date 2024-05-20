import React, { useState } from 'react';
import PointsClient from 'absinthe-sdk';

const CheckPointsForm = () => {
    const [apiKey, setApiKey] = useState('');
    const [campaignId, setCampaignId] = useState('');
    const [eventName, setEventName] = useState('');
    const [address, setAddress] = useState('');
    const [message, setMessage] = useState('');
    const [pointsData, setPointsData] = useState<any>();
    const [isLoading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        setLoading(true);
        e.preventDefault();
        const pointsClient = new PointsClient(apiKey, campaignId);

        try {
            if (eventName.length > 0) {
                const pointsData = await pointsClient.getPointsByEvent(address, eventName);
                console.log(`POINTS DATA: ${JSON.stringify(pointsData)}`)
                setPointsData(pointsData);
            } else {
                const pointsData = await pointsClient.getPoints(address);
                console.log(`POINTS DATA: ${JSON.stringify(pointsData.rows.length)}`)
                setPointsData(pointsData);
            }
            setEventName('');
            setAddress('');
            setMessage('Points:');
        } catch (e) {
            setMessage(`Error: ${e}`);
        }
        setLoading(false);
    };

    return (
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
            <h1 className="text-2xl font-bold mb-6 text-center">Check Points</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-col">
                    <label className="mb-2">API Key:</label>
                    <input
                        type="text"
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                        required
                        className="p-2 border border-gray-300 rounded"
                    />
                </div>
                <div className="flex flex-col">
                    <label className="mb-2">Campaign ID:</label>
                    <input
                        type="text"
                        value={campaignId}
                        onChange={(e) => setCampaignId(e.target.value)}
                        required
                        className="p-2 border border-gray-300 rounded"
                    />
                </div>
                <div className="flex flex-col">
                    <label className="mb-2">Event Name:</label>
                    <input
                        type="text"
                        value={eventName}
                        onChange={(e) => setEventName(e.target.value)}
                        className="p-2 border border-gray-300 rounded"
                    />
                </div>
                <div className="flex flex-col">
                    <label className="mb-2">Address:</label>
                    <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                        className="p-2 border border-gray-300 rounded"
                    />
                </div>
                <button
                    type="submit"
                    disabled={isLoading ? true : false}
                    className="w-full py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-200"
                >
                    Check Points
                </button>
            </form>
            {
                pointsData && pointsData.rows?.length > 0 ?
                <div className="p-8 text-center">
                    {pointsData.rows[0].event_name ? <p>Event: {pointsData.rows[0].event_name}</p> : null}
                    <p>Points: {pointsData.rows[0].points}</p>
                    <p>modified: {pointsData.rows[0].last_modified ? pointsData.rows[0].last_modified : pointsData.rows[0].timestamp}</p>
                </div>
                : null
            }
        </div>
    );
}

export default CheckPointsForm;