// src/pages/Home.jsx
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import heroImage from "../assets/hero2.png";
import CountUp from "react-countup";

const testimonials = [
    {
        name: "Aarav S.",
        feedback: "This AI is a lifesaver! My Instagram engagement skyrocketed.",
    },
    {
        name: "Meera K.",
        feedback: "Super easy to use and accurate captions. Highly recommended!",
    },
];

export default function Home() {
    return (
        <div className="bg-gray-950 text-white">
            {/* Hero Section */}
            <section className="min-h-screen flex flex-col items-center justify-center text-center p-10">
                <div className="w-80 h-80">
                    <img
                        src={heroImage}
                        alt="InstaBoosterAI Hero"
                        className="w-full max-w-md mx-auto rounded-xl shadow-lg"
                    />
                </div>
                <h1 className="text-5xl font-bold mb-4">Welcome to InstaBoosterAI 🚀</h1>
                <p className="text-gray-400 max-w-xl mx-auto">
                    InstaBoosterAI helps creators write 🔥 captions & hashtags using AI. Designed for creators, influencers, and brands.
                </p>
            </section>

            {/* Stats Section */}
            <section className="bg-gray-900 py-10 text-center">
                <h2 className="text-3xl font-bold mb-6">🚀 Impact So Far</h2>
                <div className="flex flex-wrap justify-center gap-10 text-white text-2xl">
                    <div>
                        <CountUp end={10000} duration={4} />+ Captions Generated
                    </div>
                    <div>
                        <CountUp end={5000} duration={4} />+ Hashtag Sets Used
                    </div>
                    <div>
                        <CountUp end={1000} duration={4} />+ Happy Creators
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="p-10 bg-gray-950">
                <h2 className="text-3xl font-semibold mb-6 text-center">✨ Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {[
                        { title: "AI-generated Captions", emoji: "🧠", desc: "Craft smart and engaging captions instantly using AI." },
                        { title: "Hashtag Suggestions", emoji: "🏷️", desc: "Boost reach with auto-recommended hashtags." },
                        { title: "Daily Request Limits", emoji: "⏳", desc: "Fair use policy ensures fast performance for all." },
                        { title: "Save to Dashboard", emoji: "📂", desc: "Easily save generated content to your dashboard. (soon)" },
                        { title: "Dark Mode Ready", emoji: "🌙", desc: "Looks stunning on dark mode with smooth visuals." },
                        { title: "Pro Plan (Coming Soon)", emoji: "🚀", desc: "Unlock unlimited generations and more power." },
                    ].map((item, idx) => (
                        <div
                            key={idx}
                            className="bg-gray-800 rounded-lg p-6 hover:scale-105 transition transform duration-300 shadow-md hover:shadow-yellow-500/10"
                        >
                            <div className="text-4xl mb-2">{item.emoji}</div>
                            <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                            <p className="text-gray-400 mt-2">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Future Scope Section */}
            <section className="p-10 bg-gray-900">
                <h2 className="text-3xl font-semibold mb-6 text-center">🔮 Future Scope</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                    {[
                        { title: "Analytics Dashboard", emoji: "📊", desc: "Track performance, trends, and reach." },
                        { title: "Auto-post Scheduling", emoji: "📆", desc: "Schedule posts with a click. Post even while sleeping!" },
                        { title: "Multi-language Support", emoji: "🌍", desc: "Captions and hashtags in your local language." },
                        { title: "Instagram API Integration", emoji: "📷", desc: "Auto-post and fetch stats with Insta API." },
                    ].map((item, idx) => (
                        <div
                            key={idx}
                            className="bg-gray-800 rounded-lg p-6 hover:scale-105 transition transform duration-300 shadow-md hover:shadow-blue-500/10"
                        >
                            <div className="text-4xl mb-2">{item.emoji}</div>
                            <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                            <p className="text-gray-400 mt-2">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </section>


            {/* Testimonials */}
            <section className="p-10 bg-gray-950">
                <h2 className="text-3xl font-semibold mb-6 text-center">💬 Testimonials</h2>
                <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
                    {testimonials.map((t, i) => (
                        <div key={i} className="bg-gray-800 p-6 rounded-lg shadow-lg">
                            <p className="italic text-gray-300">"{t.feedback}"</p>
                            <p className="mt-2 font-semibold text-yellow-300">- {t.name}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Call-to-Action */}
            <section className="text-center p-10 bg-gray-900">
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-bold"
                    onClick={() => window.location.href = "/signup"}
                >
                    Get Started Free
                </motion.button>
            </section>

            {/* Footer */}
            <footer className="bg-gray-800 py-6 text-center text-gray-400">
                <p>© {new Date().getFullYear()} InstaBoosterAI. Made with ❤️ by Kalyan.</p>
                <div className="mt-2">
                    <a href="https://instagram.com/world_with_ai_tech" target="_blank" rel="noreferrer" className="text-blue-400 hover:underline">Follow us on Instagram</a>
                </div>
            </footer>
        </div>
    );
}
