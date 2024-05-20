import React, { useState } from 'react';
import PointsClient from 'absinthe-sdk';

const DistributePointsForm = () => {
    const [apiKey, setApiKey] = useState('');
    const [campaignId, setCampaignId] = useState('');
    const [eventName, setEventName] = useState('');
    const [points, setPoints] = useState('');
    const [address, setAddress] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        setLoading(true);
        e.preventDefault();
        const pointsClient = new PointsClient(apiKey, campaignId);

        try {
            await pointsClient.distribute(eventName, { points: parseInt(points), address });
            setEventName('');
            setPoints('');
            setAddress('');
            setMessage('Points distributed successfully.');
        } catch (e) {
            setMessage(`Error: ${e}`);
        }
        setLoading(false);
    };

    return (
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
            <h1 className="text-2xl font-bold mb-6 text-center">Distribute Points</h1>
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
                        required
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
                <div className="flex flex-col">
                <label className="mb-2">Points:</label>
                    <input
                        type="number"
                        value={points}
                        onChange={(e) => setPoints(e.target.value)}
                        required
                        className="p-2 border border-gray-300 rounded"
                    />
                </div>
                <button
                    type="submit"
                    disabled={isLoading ? true : false}
                    className="w-full py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-200"
                >
                Distribute Points
                </button>
            </form>
            {message && <p className={`mt-4 text-center font-bold`} style={{ color: message.substring(0, 4) === 'Error' ? 'red' : 'green' }}>{message}</p>}
        </div>
    );
}

export default DistributePointsForm;