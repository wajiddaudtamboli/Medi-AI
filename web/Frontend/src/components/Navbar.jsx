import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { logout } from "../actions/userActions.js";
import HealthAdvisory from "./HealthAdvisory.jsx";
import { Menu, X, Plus, Sun, Moon } from "lucide-react";
import { useTheme } from "../context/ThemeContext.jsx";

// Constants
const NAV_ITEMS = [
    { path: "/", label: "Home" },
    { path: "/treatment-suggestions", label: "Treatment Suggestions" },
    { path: "/telemedicine", label: "Video Consultation" },
    { path: "/chat", label: "AI Health Chat" },
    { path: "/analysis", label: "Medical Analysis" },
    { path: "https://video-call-final-git-main-orthodox-64s-projects.vercel.app/?roomID=emergency", label: "Emergency", external: true },
];

export default function Navbar() {
    const dispatch = useDispatch();
    const location = useLocation();
    const { isAuthenticated } = useSelector((state) => state.user);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { theme, toggleTheme, isDark } = useTheme();

    const isActive = (path) => {
        if (path === "/") return location.pathname === "/";
        return location.pathname.startsWith(path);
    };

    const handleNavClick = (item) => {
        if (item.external) {
            window.open(item.path, '_blank', 'noopener,noreferrer');
        }
        setMobileMenuOpen(false);
    };

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    const logoutUser = async (e) => {
        e.preventDefault();
        dispatch(logout());
    };

    return (
        <header className="fixed top-0 z-50 w-full bg-white/95 dark:bg-slate-950/95 backdrop-blur-sm border-b border-slate-200 dark:border-emerald-900 shadow-sm transition-colors duration-300">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <a href="/" className="flex items-center gap-2">
                        <div className="bg-emerald-600 dark:bg-emerald-500 p-1.5 rounded-lg">
                            <Plus className="w-5 h-5 text-white dark:text-slate-950" />
                        </div>
                        <span className="text-xl font-bold text-slate-900 dark:text-emerald-400">MediAI</span>
                    </a>

                    {/* Desktop Navigation */}
                    <ul className="hidden lg:flex items-center gap-1">
                        {NAV_ITEMS.map((item) => {
                            const active = !item.external && isActive(item.path);
                            return item.external ? (
                                <li key={item.path}>
                                    <button
                                        onClick={() => handleNavClick(item)}
                                        className="px-3 py-2 text-sm font-medium text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-950/50 rounded-lg transition-colors"
                                    >
                                        {item.label}
                                    </button>
                                </li>
                            ) : (
                                <li key={item.path}>
                                    <a
                                        href={item.path}
                                        className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                                            active 
                                                ? "text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 border-b-2 border-emerald-600 dark:border-emerald-400" 
                                                : "text-slate-700 dark:text-slate-300 hover:text-emerald-700 dark:hover:text-emerald-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                                        }`}
                                    >
                                        {item.label}
                                    </a>
                                </li>
                            );
                        })}
                    </ul>

                    {/* Desktop Actions */}
                    <div className="hidden lg:flex items-center gap-3">
                        {/* Theme Toggle Button */}
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-lg bg-slate-100 dark:bg-emerald-900/50 text-slate-700 dark:text-emerald-400 hover:bg-slate-200 dark:hover:bg-emerald-800/50 transition-all duration-300"
                            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
                        >
                            {isDark ? (
                                <Sun className="w-5 h-5" />
                            ) : (
                                <Moon className="w-5 h-5" />
                            )}
                        </button>
                        
                        <HealthAdvisory />
                        {!isAuthenticated ? (
                            <a
                                href="/login"
                                className="bg-emerald-600 dark:bg-emerald-500 text-white dark:text-slate-950 px-4 py-2 rounded-lg text-sm font-medium hover:bg-emerald-700 dark:hover:bg-emerald-400 transition-colors shadow-sm"
                            >
                                Login
                            </a>
                        ) : (
                            <button
                                onClick={logoutUser}
                                className="bg-emerald-600 dark:bg-emerald-500 text-white dark:text-slate-950 px-4 py-2 rounded-lg text-sm font-medium hover:bg-emerald-700 dark:hover:bg-emerald-400 transition-colors shadow-sm"
                            >
                                Logout
                            </button>
                        )}
                        <a href="/account" className="hover:opacity-80 transition-opacity">
                            <img
                                className="w-9 h-9 rounded-full border-2 border-emerald-600 dark:border-emerald-400"
                                src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                                alt="Profile"
                            />
                        </a>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="lg:hidden flex items-center gap-2">
                        {/* Mobile Theme Toggle */}
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-lg bg-slate-100 dark:bg-emerald-900/50 text-slate-700 dark:text-emerald-400 transition-colors"
                            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
                        >
                            {isDark ? (
                                <Sun className="w-5 h-5" />
                            ) : (
                                <Moon className="w-5 h-5" />
                            )}
                        </button>
                        
                        <button
                            onClick={toggleMobileMenu}
                            className="p-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                            aria-label="Toggle menu"
                        >
                            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Navigation Menu */}
            {mobileMenuOpen && (
                <div className="lg:hidden bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-emerald-900 shadow-lg">
                    <div className="max-w-7xl mx-auto px-4 py-4 space-y-2">
                        {NAV_ITEMS.map((item) => {
                            const active = !item.external && isActive(item.path);
                            return item.external ? (
                                <button
                                    key={item.path}
                                    onClick={() => handleNavClick(item)}
                                    className="w-full text-left px-4 py-3 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-colors"
                                >
                                    {item.label}
                                </button>
                            ) : (
                                <a
                                    key={item.path}
                                    href={item.path}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className={`block px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                                        active 
                                            ? "text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50" 
                                            : "text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                                    }`}
                                >
                                    {item.label}
                                </a>
                            );
                        })}
                        
                        <div className="pt-4 border-t border-slate-200 dark:border-emerald-900 space-y-3">
                            <HealthAdvisory />
                            {!isAuthenticated ? (
                                <a
                                    href="/login"
                                    className="block w-full text-center bg-emerald-600 dark:bg-emerald-500 text-white dark:text-slate-950 px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-emerald-700 dark:hover:bg-emerald-400 transition-colors"
                                >
                                    Login
                                </a>
                            ) : (
                                <button
                                    onClick={logoutUser}
                                    className="w-full bg-emerald-600 dark:bg-emerald-500 text-white dark:text-slate-950 px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-emerald-700 dark:hover:bg-emerald-400 transition-colors"
                                >
                                    Logout
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}
