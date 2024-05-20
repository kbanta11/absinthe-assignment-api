"use client"
import React, { useState } from 'react';
import PointsClient from 'absinthe-sdk';
import DistributePointsForm from './components/DistributePointsForm';
import CheckPointsForm from './components/CheckPointsForm';

const Home = () => {
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
    <main className="flex min-h-screen items-start justify-center p-6 gap-8 bg-gray-100">
      <DistributePointsForm />
      <CheckPointsForm />
    </main>
  );
};

export default Home;