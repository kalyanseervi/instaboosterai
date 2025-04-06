// src/pages/Generate.jsx
import React, { useState } from 'react';
import axios from 'axios';

export default function Generate() {
  const [topic, setTopic] = useState('');
  const [result, setResult] = useState(null);
  const token = localStorage.getItem('token');

  const handleGenerate = async () => {
    try {
      const response = await axios.post(
        'http://localhost:8000/generate',
        { topic },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setResult(response.data);
    } catch (error) {
      alert(error.response?.data?.error || "Something went wrong!");
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-xl mb-4">Enter Topic to Generate Instagram Caption & Hashtags</h2>
      <input
        type="text"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white"
        placeholder="e.g., AI for social media marketing"
      />
      <button
        onClick={handleGenerate}
        className="mt-4 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded"
      >
        Generate
      </button>

      {result && (
        <div className="mt-6">
          <h3 className="font-semibold">✨ Caption:</h3>
          <p className="text-blue-300">{result.caption}</p>
          <h3 className="mt-4 font-semibold">🏷️ Hashtags:</h3>
          <p className="text-green-300">{result.hashtags}</p>
        </div>
      )}
    </div>
  );
}
