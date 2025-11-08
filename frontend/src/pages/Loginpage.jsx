import React, { useState } from 'react'

const App = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [remember, setRemember] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    //before sending the data to backend it ensure the email is precent,valid and passwrd is exist and strong
    const validate = () => {
        setError("");
        if (!email) return "Email is required";
        const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRe.test(email)) return "Enter a valid email address";
        if (!password) return "Password is required";
        if (password.length < 6) return "Password must be at least 6 characters";
        return null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const clientError = validate();
        if (clientError) {
            setError(clientError);
            return;
        }

        setLoading(true);
        setError("");
        setSuccess("");
        try {
            const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password, remember })
            });

            const data = await res.json().catch(() => ({}));
            if (res.ok) {
                if (data.token) {
                    try { localStorage.setItem('bt_auth_tokenyo', data.token); } catch (e) { /* ignore */ }
                }
                setSuccess(data.message || 'Login successful');
                setError("");
            } else {
                setError(data.message || 'Invalid credentials');
            }
        } catch (err) {
            console.error(err);
            setError('Network error — please try again');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-slate-900">
            {/* Animated gradient mesh background */}
            <div className="absolute inset-0 bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700"></div>

            {/* Animated geometric patterns */}
            <div className="absolute inset-0 opacity-30">
                <div className="absolute inset-0" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
                    backgroundSize: '100px 100px'
                }}></div>
            </div>

            {/* Floating orbs with different colors */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float-slow"></div>
                <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-cyan-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float-medium"></div>
                <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-amber-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float-fast"></div>
                <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-emerald-400 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-float-reverse"></div>
            </div>

            {/* Grid overlay with pulse effect */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                    backgroundImage: `linear-gradient(rgba(255,255,255,.1) 2px, transparent 2px), linear-gradient(90deg, rgba(255,255,255,.1) 2px, transparent 2px)`,
                    backgroundSize: '50px 50px'
                }}></div>
            </div>

            {/* Radial spotlight effect */}
            <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-slate-900/50"></div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-4xl mx-auto bg-white/95 backdrop-blur-2xl rounded-3xl shadow-[0_20px_80px_rgba(0,0,0,0.3)] overflow-hidden grid grid-cols-1 md:grid-cols-2 border border-white/30 hover:shadow-[0_20px_100px_rgba(139,92,246,0.3)] transition-all duration-500">
                    {/* LEFT: Illustration / branding */}
                    <div className="hidden md:flex items-center justify-center bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-600 p-8 relative overflow-hidden">
                        {/* Animated pattern overlay */}
                        <div className="absolute inset-0 opacity-20">
                            <div className="absolute inset-0 animate-pattern-slide" style={{
                                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                                backgroundSize: '60px 60px'
                            }}></div>
                        </div>

                        {/* Glowing circles decoration */}
                        <div className="absolute top-10 right-10 w-32 h-32 border-4 border-white/20 rounded-full animate-ping-slow"></div>
                        <div className="absolute bottom-10 left-10 w-24 h-24 border-4 border-white/30 rounded-full animate-spin-slow"></div>

                        <div className="text-center text-white p-4 relative z-10">
                            <div className="mb-6">
                                <div className="inline-flex items-center justify-center w-24 h-24 bg-white/15 backdrop-blur-md rounded-3xl shadow-2xl mb-4 transform hover:scale-110 transition-transform duration-300">
                                    <svg width="56" height="56" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto drop-shadow-lg">
                                        <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="white" opacity="0.95" />
                                        <path d="M2 17L12 22L22 17" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.95" />
                                        <path d="M2 12L12 17L22 12" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.95" />
                                    </svg>
                                </div>
                            </div>
                            <h2 className="text-4xl font-bold mb-3 drop-shadow-lg">Budget Tracker</h2>
                            <p className="text-base opacity-95 leading-relaxed mb-2">Securely track your income and expenses.</p>
                            <p className="text-sm opacity-80">Sign in to continue to your dashboard.</p>

                            <div className="mt-10 space-y-4 text-left">
                                <div className="flex items-center gap-3 group">
                                    <div className="flex-shrink-0 w-10 h-10 bg-white/25 backdrop-blur rounded-xl flex items-center justify-center group-hover:bg-white/35 transition-all duration-300 group-hover:scale-110">
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                    </div>
                                    <span className="text-sm font-medium">Track expenses in real-time</span>
                                </div>
                                <div className="flex items-center gap-3 group">
                                    <div className="flex-shrink-0 w-10 h-10 bg-white/25 backdrop-blur rounded-xl flex items-center justify-center group-hover:bg-white/35 transition-all duration-300 group-hover:scale-110">
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                    </div>
                                    <span className="text-sm font-medium">Visualize spending patterns</span>
                                </div>
                                <div className="flex items-center gap-3 group">
                                    <div className="flex-shrink-0 w-10 h-10 bg-white/25 backdrop-blur rounded-xl flex items-center justify-center group-hover:bg-white/35 transition-all duration-300 group-hover:scale-110">
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                    </div>
                                    <span className="text-sm font-medium">Set budget goals and alerts</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT: Form */}
                    <div className="p-8 md:p-12 bg-white/90 backdrop-blur-sm">
                        <div className="mb-8">
                            <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome back</h1>
                            <p className="text-sm text-gray-600">Sign in to your account to continue</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5" aria-live="polite">
                            {error && (
                                <div className="text-sm text-red-700 bg-red-50 border border-red-200 p-3 rounded-lg flex items-start gap-2 animate-shake">
                                    <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                    </svg>
                                    {error}
                                </div>
                            )}
                            {success && (
                                <div className="text-sm text-green-700 bg-green-50 border border-green-200 p-3 rounded-lg flex items-start gap-2">
                                    <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    {success}
                                </div>
                            )}

                            <div>
                                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                        </svg>
                                    </div>
                                    <input
                                        id="email"
                                        type="email"
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                        placeholder="you@company.com"
                                        className="mt-1 block w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                        </svg>
                                    </div>
                                    <input
                                        id="password"
                                        type="password"
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        className="mt-1 block w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <label className="flex items-center text-sm">
                                    <input type="checkbox" checked={remember} onChange={e => setRemember(e.target.checked)} className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                                    <span className="ml-2 text-gray-600">Remember me</span>
                                </label>
                                <div>
                                    <a href="#" className="text-sm text-indigo-600 hover:underline">Forgot password?</a>
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className={`w-full flex justify-center items-center gap-2 px-4 py-3 rounded-lg text-white font-semibold transition-all duration-200 transform ${loading ? 'bg-indigo-400 cursor-not-allowed' : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 hover:shadow-lg hover:scale-[1.02]'}`}
                                >
                                    {loading && (
                                        <svg className="h-5 w-5 animate-spin text-white" viewBox="0 0 24 24" fill="none">
                                            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" opacity="0.25" />
                                            <path d="M22 12a10 10 0 00-10-10" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                                        </svg>
                                    )}
                                    <span>{loading ? 'loading ...' : 'Log in'}</span>
                                </button>
                            </div>

                            <div className="pt-6">
                                <div className="relative">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-gray-300" />
                                    </div>
                                    <div className="relative flex justify-center text-sm">
                                        <span className="px-3 bg-white text-gray-500 font-medium">Or continue with</span>
                                    </div>
                                </div>

                                <div className="mt-6 grid grid-cols-2 gap-3">
                                    <button type="button" className="inline-flex justify-center items-center gap-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 hover:shadow-md group">
                                        <svg className="h-5 w-5 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="none">
                                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                        </svg>
                                        <span className="text-sm text-gray-700 font-medium">Google</span>
                                    </button>
                                    <button type="button" className="inline-flex justify-center items-center gap-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 hover:shadow-md group">
                                        <svg className="h-5 w-5 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                        </svg>
                                        <span className="text-sm text-gray-700 font-medium">GitHub</span>
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App