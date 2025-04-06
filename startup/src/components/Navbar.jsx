// src/components/Navbar.jsx
import { Link, useNavigate } from "react-router-dom";
import DarkModeToggle from "./DarkModeToggle";
import heroImage from "../assets/heroLogo.png";

export default function Navbar() {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    return (
        <nav className="bg-gray-800 text-white p-4 flex justify-between">
            <div className="flex gap-4">
                <Link to="/" className="flex items-center gap-1">
                    <img
                        src={heroImage}
                        alt="InstaBoosterAI Logo"
                        className="h-10 w-10 object-contain rounded-md"
                    />
                    <span className="text-xl font-semibold text-white">InstaBoosterAI</span>
                </Link>
                {token && <Link className="flex items-center gap-1" to="/dashboard">Dashboard</Link>}
            </div>
            <div className="flex gap-4 items-center">
                <DarkModeToggle />
                {!token ? (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/signup">Signup</Link>
                    </>
                ) : (
                    <button onClick={handleLogout} className="text-red-400 hover:text-red-600">Logout</button>
                )}
            </div>
        </nav>
    );
}
