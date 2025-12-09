import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { Video, Microscope, Heart, Stethoscope, Ambulance, Watch, Mic, MicOff } from "lucide-react";
import "./Hero.css";

function Card({ icon, title, description, route, role }) {
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.user);

    const handleClick = (e) => {
        e.preventDefault();

        if (route === "telemedicine") {
            // Create notification first, then redirect
            if (user) {
                axios
                    .post("/emergency/notify")
                    .then(() => {
                        window.location.href =
                            "https://video-call-final-git-main-orthodox-64s-projects.vercel.app/?roomID=emergency";
                    })
                    .catch((error) => {
                        console.error("Error creating emergency notification:", error);
                        alert("Failed to initiate emergency consultation");
                    });
            } else {
                navigate("/login");
            }
        } else if (route.startsWith("/")) {
            // Navigate for internal routes
            navigate(route);
        } else {
            navigate(route);
        }
    };

    return (
        <a onClick={handleClick} className="card" style={{ cursor: "pointer" }}>
            <div className="card-icon">{icon}</div>
            <h3 className="card-title">{title}</h3>
            <p className="card-description">{description}</p>
        </a>
    );
}

function Cards() {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const { user } = useSelector((state) => state.user);
    const [recognition, setRecognition] = useState(null);
    const [isListening, setIsListening] = useState(false);

    const cards = [
        {
            icon: "📞",
            title: t("navbar.telemedicine"),
            description: t("cards.telemedicine"),
            route: "telemedicine",
            role: "doctor",
        },
        {
            icon: "🏥",
            title: t("navbar.analysis"),
            description: t("cards.medical_analysis"),
            route: "/analysis",
            role: "doctor",
        },
        {
            icon: "😷",
            title: t("navbar.health_tips"),
            description: t("cards.health_tips"),
            route: "/health",
            role: "patient",
        },
        {
            icon: "🩺",
            title: t("navbar.consult"),
            description: t("cards.consulting"),
            route: "/chat",
            role: "doctor",
        },
        {
            icon: "🚑",
            title: t("navbar.emergency"),
            description: t("cards.emergency"),
            route: "emergency",
            role: "patient",
        },
        {
            icon: "⌚️",
            title: t("navbar.watch"),
            description: t("cards.watch"),
            route: "/watch",
            role: "patient",
        },
    ];

    const filteredCards = cards.filter((card) => {
        if (user && user.role === "doctor") {
            return card.role === "doctor";
        }
        return true; // Patients can access all cards
    });

    useEffect(() => {
        if (!("webkitSpeechRecognition" in window)) {
            console.error("Speech Recognition not supported in this browser.");
            return;
        }

        const speechRecognition = new window.webkitSpeechRecognition();
        speechRecognition.continuous = true;
        speechRecognition.interimResults = false;
        speechRecognition.lang = "en-US";

        speechRecognition.onstart = () => setIsListening(true);
        speechRecognition.onend = () => setIsListening(false);

        speechRecognition.onresult = (event) => {
            const transcript =
                event.results[event.results.length - 1][0].transcript.toLowerCase();
            console.log("Recognized:", transcript);

            if (transcript.includes("emergency")) {
                // Open external emergency site
                window.open(
                    "https://tinyurl.com/4jdnrr5b",
                    "_blank",
                    "noopener,noreferrer"
                );
            } else {
                const matchedCard = cards.find((card) =>
                    transcript.includes(card.title.toLowerCase())
                );
                if (matchedCard) {
                    if (matchedCard.route === "emergency") {
                        window.open(
                            "https://tinyurl.com/4jdnrr5b",
                            "_blank",
                            "noopener,noreferrer"
                        );
                    } else {
                        navigate(matchedCard.route);
                    }
                }
            }
        };

        setRecognition(speechRecognition);
    }, [navigate, cards]);

    const toggleListening = () => {
        if (!recognition) return;
        if (isListening) {
            recognition.stop();
        } else {
            recognition.start();
        }
    };

    return (
        <div className="hero-section">
            <button
                className="listen-button rounded-full shadow-lg flex items-center justify-center px-6 py-3 transition-all duration-300 hover:scale-105"
                onClick={toggleListening}
                style={{
                    background: isListening
                        ? "linear-gradient(to right, #f87171, #ef4444)"
                        : "linear-gradient(to right, #60a5fa, #3b82f6)",
                    color: "white",
                    border: "none",
                    maxWidth: "200px",
                    margin: "0 auto 2rem",
                }}
            >
                <span className="mr-2 text-xl">{isListening ? "🛑" : "🎙️"}</span>
                <span>{isListening ? "Stop Listening" : "Start Listening"}</span>
            </button>

            <div
                className={
                    user && user.role === "doctor"
                        ? "cards-grid-doctor"
                        : "cards-grid-patient"
                }
            >
                {filteredCards.map((card, index) => (
                    <Card
                        key={index}
                        icon={card.icon}
                        title={card.title}
                        description={card.description}
                        role={card.role}
                        route={card.route}
                    />
                ))}
            </div>
        </div>
    );
}

const HealthcareCards = () => {
    const navigate = useNavigate();
    const [recognition, setRecognition] = useState(null);
    const [isListening, setIsListening] = useState(false);

    // Speech recognition setup for the Tailwind version
    useEffect(() => {
        if (!("webkitSpeechRecognition" in window)) {
            console.error("Speech Recognition not supported in this browser.");
            return;
        }

        const speechRecognition = new window.webkitSpeechRecognition();
        speechRecognition.continuous = true;
        speechRecognition.interimResults = false;
        speechRecognition.lang = "en-US";

        speechRecognition.onstart = () => setIsListening(true);
        speechRecognition.onend = () => setIsListening(false);

        speechRecognition.onresult = (event) => {
            const transcript =
                event.results[event.results.length - 1][0].transcript.toLowerCase();
            console.log("Recognized:", transcript);

            if (transcript.includes("telemedicine")) {
                navigate("/telemedicine");
            } else if (transcript.includes("emergency")) {
                window.open(
                    "https://tinyurl.com/4jdnrr5b",
                    "_blank",
                    "noopener,noreferrer"
                );
            } else if (transcript.includes("analysis")) {
                navigate("/analysis");
            } else if (transcript.includes("health tips")) {
                navigate("/health");
            } else if (transcript.includes("consult")) {
                navigate("/chat");
            } else if (transcript.includes("watch")) {
                navigate("/watch");
            }
        };

        setRecognition(speechRecognition);
    }, [navigate]);

    const toggleListening = () => {
        if (!recognition) return;
        if (isListening) {
            recognition.stop();
        } else {
            recognition.start();
        }
    };

    const handleCardClick = (route) => {
        if (route === "emergency") {
            window.open(
                "https://tinyurl.com/4jdnrr5b",
                "_blank",
                "noopener,noreferrer"
            );
        } else {
            navigate(route);
        }
    };

    const cardData = [
        {
            icon: Video,
            title: "Telemedicine",
            description: "Smart Telemedicine for Smarter Health",
            route: "telemedicine",
            color: "blue"
        },
        {
            icon: Microscope,
            title: "Analysis",
            description: "Get Expert Medical Insights Instantly",
            route: "/analysis",
            color: "purple"
        },
        {
            icon: Heart,
            title: "Health Tips",
            description: "Daily Wellness Tips for a Healthier You",
            route: "/health",
            color: "pink"
        },
        {
            icon: Stethoscope,
            title: "Consult",
            description: "Instant Healthcare, Anytime, Anywhere",
            route: "/chat",
            color: "green"
        },
        {
            icon: Ambulance,
            title: "Emergency",
            description: "Your Health, Our Priority - 24/7",
            route: "emergency",
            color: "red"
        },
        {
            icon: Watch,
            title: "Health-Watch",
            description: "Personalized Health Tips, Just For You",
            route: "/watch",
            color: "cyan"
        }
    ];

    const getColorClasses = (color) => {
        const colors = {
            blue: { bg: "bg-blue-50 dark:bg-blue-900/30", icon: "bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-400", hover: "hover:border-blue-300 dark:hover:border-blue-600" },
            purple: { bg: "bg-purple-50 dark:bg-purple-900/30", icon: "bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-400", hover: "hover:border-purple-300 dark:hover:border-purple-600" },
            pink: { bg: "bg-pink-50 dark:bg-pink-900/30", icon: "bg-pink-100 dark:bg-pink-900/50 text-pink-700 dark:text-pink-400", hover: "hover:border-pink-300 dark:hover:border-pink-600" },
            green: { bg: "bg-emerald-50 dark:bg-emerald-900/30", icon: "bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-400", hover: "hover:border-emerald-300 dark:hover:border-emerald-600" },
            red: { bg: "bg-red-50 dark:bg-red-900/30", icon: "bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-400", hover: "hover:border-red-300 dark:hover:border-red-600" },
            cyan: { bg: "bg-cyan-50 dark:bg-cyan-900/30", icon: "bg-cyan-100 dark:bg-cyan-900/50 text-cyan-700 dark:text-cyan-400", hover: "hover:border-cyan-300 dark:hover:border-cyan-600" }
        };
        return colors[color] || colors.blue;
    };

    return (
        <div className="w-full">
            {/* Voice Control Button */}
            <div className="flex justify-center mb-8">
                <button
                    className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium shadow-md transition-all duration-300 hover:shadow-lg ${
                        isListening 
                            ? "bg-red-500 text-white hover:bg-red-600" 
                            : "bg-emerald-600 dark:bg-emerald-500 text-white hover:bg-emerald-700 dark:hover:bg-emerald-600"
                    }`}
                    onClick={toggleListening}
                >
                    {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                    <span>{isListening ? "Stop Listening" : "Voice Commands"}</span>
                </button>
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {cardData.map((card, index) => {
                    const colorClasses = getColorClasses(card.color);
                    const IconComponent = card.icon;
                    
                    return (
                        <button
                            key={index}
                            className={`${colorClasses.bg} border border-slate-200 dark:border-slate-700 ${colorClasses.hover} rounded-xl text-left p-6 hover:shadow-lg dark:hover:shadow-slate-900/50 transform transition-all duration-300 hover:-translate-y-1 cursor-pointer group`}
                            onClick={() => handleCardClick(card.route)}
                        >
                            <div className={`${colorClasses.icon} w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                                <IconComponent className="w-7 h-7" />
                            </div>
                            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">{card.title}</h3>
                            <p className="text-slate-600 dark:text-slate-400 text-sm">{card.description}</p>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export { Cards };
export default HealthcareCards;