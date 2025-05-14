import React, { useEffect, useState } from 'react';
import { createMeet, getAuthUrl } from '../../services/Meeting/Meeting.service';

const VideoCallComponent: React.FC = () => {
  const [summary, setSummary] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [meetLink, setMeetLink] = useState('');

  const handleAuth = async () => {
    try {
      const authUrl = await getAuthUrl();
      window.open(authUrl, 'GoogleAuth', 'width=500,height=600');
    } catch (error) {
      console.error('Failed to get auth URL:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const link = await createMeet({ summary, startTime, endTime });
      setMeetLink(link);
    } catch (error) {
      console.error('Failed to create meeting:', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-2xl font-bold mb-6">Google Meet Integration</h1>

      {/* Authenticate Button */}
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={handleAuth}
      >
        Authenticate with Google
      </button>

      {/* Create Meet Form */}
      <div className="mt-6 p-4 border rounded w-80">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Summary:</label>
            <input
              type="text"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              className="border p-2 rounded w-full"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Start Time:</label>
            <input
              type="datetime-local"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="border p-2 rounded w-full"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">End Time:</label>
            <input
              type="datetime-local"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="border p-2 rounded w-full"
            />
          </div>

          <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
            Create Meeting
          </button>
        </form>

        {meetLink && (
          <div className="mt-4">
            <p>Meeting Link:</p>
            <a href={meetLink} target="_blank" rel="noopener noreferrer" className="text-blue-500">
              {meetLink}
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoCallComponent;
