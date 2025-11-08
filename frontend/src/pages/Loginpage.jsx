import React, { useState } from "react";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [remember, setRemember] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess("");

        try {
            const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();
            if (res.ok) {
                if (data.token) {
                    localStorage.setItem("bt_auth_token", data.token);
                }
                setSuccess("Login successful!");
            } else {
                setError(data.message || "Invalid credentials");
            }
        } catch (err) {
            setError("Network error — please try again");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-slate-900">
            {/* Background layers */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-700"></div>
            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/dark-mosaic.png')]"></div>

            {/* Floating orbs */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-pink-400 rounded-full blur-3xl opacity-20 animate-float-slow"></div>
            <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-cyan-400 rounded-full blur-3xl opacity-20 animate-float-medium"></div>

            <div className="relative z-10 w-full max-w-4xl bg-white/95 backdrop-blur-2xl rounded-3xl shadow-[0_20px_80px_rgba(0,0,0,0.3)] overflow-hidden grid grid-cols-1 md:grid-cols-2">
                {/* LEFT PANEL */}
                <div className="hidden md:flex flex-col items-center justify-center bg-gradient-to-br from-indigo-700 via-violet-700 to-fuchsia-700 text-white p-8 relative">
                    <div className="text-center space-y-4">
                        <h1 className="text-4xl font-bold">Welcome Back</h1>
                        <p className="text-base opacity-90">
                            Log in to continue tracking your expenses.
                        </p>
                        <div className="mt-8">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="mx-auto w-24 h-24 opacity-90"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="white"
                                strokeWidth="2"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 2L2 7l10 5 10-5-10-5z"
                                />
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M2 17l10 5 10-5M2 12l10 5 10-5"
                                />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* RIGHT PANEL (FORM) */}
                <div className="p-10 md:p-12">
                    <h2 className="text-3xl font-bold text-gray-800 mb-3">
                        Sign in to Budget Tracker
                    </h2>
                    <p className="text-gray-500 mb-6">Welcome back! Please login below.</p>

                    <form onSubmit={handleLogin} className="space-y-5" aria-live="polite">
                        {error && (
                            <div className="text-sm text-red-700 bg-red-50 border border-red-200 p-3 rounded-lg animate-shake">
                                {error}
                            </div>
                        )}
                        {success && (
                            <div className="text-sm text-green-700 bg-green-50 border border-green-200 p-3 rounded-lg">
                                {success}
                            </div>
                        )}

                        {/* Email */}
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-semibold text-gray-700 mb-2"
                            >
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@example.com"
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                required
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label
                                htmlFor="password"
                                className="block text-sm font-semibold text-gray-700 mb-2"
                            >
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                required
                            />
                        </div>

                        {/* Remember Me */}
                        <div className="flex items-center justify-between">
                            <label className="flex items-center text-sm">
                                <input
                                    type="checkbox"
                                    checked={remember}
                                    onChange={(e) => setRemember(e.target.checked)}
                                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                />
                                <span className="ml-2 text-gray-600">Remember me</span>
                            </label>
                            <a href="#" className="text-sm text-indigo-600 hover:underline">
                                Forgot password?
                            </a>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full flex justify-center items-center gap-2 px-4 py-3 rounded-lg text-white font-semibold transition-all duration-200 transform ${loading
                                    ? "bg-indigo-400 cursor-not-allowed"
                                    : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:scale-[1.02] hover:shadow-lg"
                                }`}
                        >
                            {loading && (
                                <svg
                                    className="h-5 w-5 animate-spin text-white"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                >
                                    <circle
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                        opacity="0.25"
                                    />
                                    <path
                                        d="M22 12a10 10 0 00-10-10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                        strokeLinecap="round"
                                    />
                                </svg>
                            )}
                            <span>{loading ? "Signing in..." : "Sign in"}</span>
                        </button>

                        {/* Signup Link */}
                        <p className="text-sm text-gray-600 text-center mt-6">
                            Don’t have an account?{" "}
                            <a
                                href="/signup"
                                className="text-indigo-600 font-semibold hover:underline"
                            >
                                Sign up
                            </a>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
