// src/pages/Dashboard.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import Tool from "./Tool"; 

const Dashboard = () => {
  const [requestsUsed, setRequestsUsed] = useState(0);
  const [userEmail, setUserEmail] = useState('');
  const [plan, setPlan] = useState('');
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.get('http://localhost:8000/userinfo', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setRequestsUsed(res.data.daily_requests);
        setUserEmail(res.data.email);
        setPlan(res.data.plan);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUserData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold">Welcome, {userEmail}</h1>

        <div className="bg-gray-800 rounded-lg p-4 shadow">
          <p className="text-lg">Plan: <span className="text-green-400">{plan}</span></p>
          <p className="text-lg">Requests used today: <span className="text-yellow-300">{requestsUsed}/10</span></p>
        </div>

        {plan === 'free' && (
          <button
            onClick={() => alert("Redirect to upgrade")}
            className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-4 py-2 rounded hover:opacity-90"
          >
            🚀 Upgrade to Pro
          </button>
        )}

<Tool />
      </div>
    </div>
  );
};

export default Dashboard;
