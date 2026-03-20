import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ShieldCheck, Menu, X, ChevronDown } from "lucide-react";

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Home", path: "/" },
        { name: "Dashboard", path: "/dashboard" },
        { name: "Investments", path: "/investments" },
        { name: "Portfolio", path: "/portfolio" },
        { name: "Impact", path: "/impact" },
        { name: "Analytics", path: "/analytics" },
        { name: "Countries", path: "/countries" },
    ];

    const isActive = (path) => location.pathname === path;
    const hideNav = ["/login", "/signup"].includes(location.pathname);

    if (hideNav) return null;

    return (
        <nav
            className={`fixed top-0 w-full z-50 transition-all duration-300 ${
                scrolled
                    ? "bg-[#0a0f18]/90 backdrop-blur-md border-b border-slate-800/60 shadow-lg shadow-black/20"
                    : "bg-transparent"
            }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-3 group">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-emerald-400 p-[1px]">
                            <div className="w-full h-full bg-[#0a0f18] rounded-xl flex items-center justify-center group-hover:bg-[#0f172a] transition-colors">
                                <ShieldCheck className="w-5 h-5 text-blue-400" />
                            </div>
                        </div>
                        <div>
                            <span className="text-base font-bold text-white tracking-tight block leading-none">NGIP</span>
                            <span className="text-[10px] text-slate-500 tracking-widest uppercase leading-none">Nation Growth</span>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`text-sm font-medium transition-all px-3 py-2 rounded-lg ${
                                    isActive(link.path)
                                        ? "text-emerald-400 bg-emerald-500/10"
                                        : "text-slate-400 hover:text-white hover:bg-white/5"
                                }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* Auth Buttons */}
                    <div className="hidden lg:flex gap-3 items-center">
                        <Link
                            to="/login"
                            className="text-sm font-medium text-slate-300 hover:text-white transition-colors px-4 py-2 rounded-lg hover:bg-white/5"
                        >
                            Sign In
                        </Link>
                        <Link
                            to="/signup"
                            className="text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-emerald-500 hover:opacity-90 transition-opacity px-5 py-2.5 rounded-xl shadow-lg shadow-blue-500/20"
                        >
                            Start Investing
                        </Link>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <div className="lg:hidden">
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="text-slate-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/5"
                        >
                            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="lg:hidden absolute top-20 left-0 w-full bg-[#0f172a]/95 backdrop-blur-xl border-b border-slate-800 p-4">
                    <div className="flex flex-col gap-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                onClick={() => setMobileMenuOpen(false)}
                                className={`text-sm font-medium px-4 py-2.5 rounded-xl transition-colors ${
                                    isActive(link.path)
                                        ? "bg-emerald-500/10 text-emerald-400"
                                        : "text-slate-400 hover:bg-slate-800 hover:text-white"
                                }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <div className="border-t border-slate-800 my-3 pt-3 flex flex-col gap-2">
                            <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="text-center text-slate-300 hover:text-white font-medium py-2.5 rounded-xl hover:bg-white/5 transition-colors">
                                Sign In
                            </Link>
                            <Link to="/signup" onClick={() => setMobileMenuOpen(false)} className="text-center text-white bg-gradient-to-r from-blue-600 to-emerald-500 font-semibold py-3 rounded-xl">
                                Start Investing
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}
