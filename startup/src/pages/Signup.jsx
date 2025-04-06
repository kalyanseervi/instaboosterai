// src/pages/Signup.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Signup() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://127.0.0.1:8000/signup", form);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.detail || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
        {error && <p className="text-red-500">{error}</p>}
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required className="w-full mb-4 p-2 rounded bg-gray-700" />
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required className="w-full mb-4 p-2 rounded bg-gray-700" />
        <button type="submit" className="w-full bg-green-600 hover:bg-green-700 p-2 rounded">Sign Up</button>
      </form>
    </div>
  );
}
