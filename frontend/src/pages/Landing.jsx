import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
    return (
        <div className="min-h-screen flex flex-col relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-indigo-50">
            {/* Modern mesh gradient background */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-tr from-rose-100 via-teal-50 to-indigo-100"></div>
                <div className="absolute inset-0 bg-gradient-to-bl from-amber-50 via-emerald-50 to-violet-100 mix-blend-multiply"></div>
            </div>

            {/* Dynamic floating shapes */}
            <div className="absolute inset-0 overflow-hidden">
                {/* Large gradient orbs */}
                <div className="absolute -top-24 -left-24 w-96 h-96 bg-gradient-to-br from-pink-300 to-rose-400 rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-float-slow"></div>
                <div className="absolute top-1/3 -right-12 w-80 h-80 bg-gradient-to-bl from-cyan-300 to-blue-400 rounded-full mix-blend-multiply filter blur-2xl opacity-35 animate-float-medium"></div>
                <div className="absolute -bottom-12 left-1/4 w-72 h-72 bg-gradient-to-tr from-emerald-300 to-teal-400 rounded-full mix-blend-multiply filter blur-2xl opacity-45 animate-float-fast"></div>
                <div className="absolute bottom-1/4 -right-20 w-64 h-64 bg-gradient-to-tl from-violet-300 to-purple-400 rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-float-reverse"></div>

                {/* Medium accent orbs */}
                <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-gradient-to-r from-amber-200 to-orange-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse-slow"></div>
                <div className="absolute top-1/4 left-3/4 w-36 h-36 bg-gradient-to-r from-indigo-200 to-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-25 animate-pulse-medium"></div>
            </div>

            {/* Subtle geometric patterns */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%236366f1' fill-opacity='0.4'%3E%3Ccircle cx='5' cy='5' r='2'/%3E%3Ccircle cx='25' cy='15' r='1.5'/%3E%3Ccircle cx='45' cy='25' r='2'/%3E%3Ccircle cx='15' cy='35' r='1'/%3E%3Ccircle cx='35' cy='45' r='1.5'/%3E%3Ccircle cx='55' cy='5' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    backgroundSize: '60px 60px'
                }}></div>
            </div>

            {/* Modern glassmorphism overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-indigo-50/30 backdrop-blur-[0.5px]"></div>

            {/* Navigation */}
            <nav className="relative z-10 px-6 py-6">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="white" opacity="0.95" />
                                <path d="M2 17L12 22L22 17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.95" />
                                <path d="M2 12L12 17L22 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.95" />
                            </svg>
                        </div>
                        <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-700 to-purple-700 bg-clip-text text-transparent">Budget Tracker</h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link
                            to="/login"
                            className="text-gray-700 hover:text-indigo-600 transition-colors px-4 py-2 rounded-lg hover:bg-white/60 backdrop-blur-sm font-medium"
                        >
                            Login
                        </Link>
                        <Link
                            to="/budget"
                            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl font-medium"
                        >
                            Tracker
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <main className="flex-1 relative z-10 px-6">
                <div className="max-w-7xl mx-auto">
                    {/* Hero Content */}
                    <div className="text-center py-20">
                        <div className="mb-8">
                            <div className="inline-flex items-center justify-center w-32 h-32 bg-gradient-to-br from-indigo-100 to-purple-100 backdrop-blur-2xl rounded-3xl shadow-2xl mb-8 transform hover:scale-110 transition-transform duration-300 border border-white/60">
                                <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-lg">
                                    <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="url(#gradient1)" opacity="0.95" />
                                    <path d="M2 17L12 22L22 17" stroke="url(#gradient2)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.95" />
                                    <path d="M2 12L12 17L22 12" stroke="url(#gradient2)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.95" />
                                    <defs>
                                        <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                                            <stop offset="0%" stopColor="#6366f1" />
                                            <stop offset="100%" stopColor="#8b5cf6" />
                                        </linearGradient>
                                        <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                                            <stop offset="0%" stopColor="#6366f1" />
                                            <stop offset="100%" stopColor="#8b5cf6" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                            </div>
                        </div>

                        <h1 className="text-6xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
                            Smart Budget
                            <span className="block bg-gradient-to-r from-rose-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
                                Management
                            </span>
                        </h1>

                        <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed">
                            Take control of your finances with intelligent expense tracking,
                            visual insights, and personalized budget goals....praveen
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
                            <Link
                                to="/signup"
                                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-4 rounded-2xl text-lg font-semibold shadow-2xl hover:shadow-indigo-500/50 transition-all duration-300 hover:scale-105 transform"
                            >
                                Get Started Free
                            </Link>
                            <Link
                                to="/login"
                                className="bg-white/70 backdrop-blur-md border border-gray-300 text-gray-700 px-8 py-4 rounded-2xl text-lg font-semibold hover:bg-white/90 hover:border-gray-400 transition-all duration-300 hover:scale-105 transform shadow-lg"
                            >
                                Sign In
                            </Link>
                        </div>
                    </div>

                    {/* Features Grid */}
                    <div className="grid md:grid-cols-3 gap-8 py-20">
                        {/* Feature 1 */}
                        <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 border border-white/60 hover:bg-white/80 transition-all duration-300 group hover:scale-105 transform shadow-xl hover:shadow-2xl">
                            <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
                                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Real-time Tracking</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Monitor your expenses as they happen with instant categorization and smart notifications.
                            </p>
                        </div>

                        {/* Feature 2 */}
                        <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 border border-white/60 hover:bg-white/80 transition-all duration-300 group hover:scale-105 transform shadow-xl hover:shadow-2xl">
                            <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-rose-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
                                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Visual Analytics</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Beautiful charts and insights help you understand your spending patterns at a glance.
                            </p>
                        </div>

                        {/* Feature 3 */}
                        <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 border border-white/60 hover:bg-white/80 transition-all duration-300 group hover:scale-105 transform shadow-xl hover:shadow-2xl">
                            <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
                                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Smart Goals</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Set intelligent budget goals with AI-powered recommendations and progress tracking.
                            </p>
                        </div>
                    </div>

                    {/* Stats Section */}
                    <div className="py-20 text-center">
                        <h2 className="text-4xl font-bold text-gray-900 mb-16">Trusted by thousands worldwide</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                            <div className="bg-white/60 backdrop-blur-xl rounded-2xl p-6 border border-white/40 shadow-lg hover:shadow-xl transition-all duration-300">
                                <div className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">50K+</div>
                                <div className="text-gray-600">Active Users</div>
                            </div>
                            <div className="bg-white/60 backdrop-blur-xl rounded-2xl p-6 border border-white/40 shadow-lg hover:shadow-xl transition-all duration-300">
                                <div className="text-3xl font-bold bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent mb-2">$2M+</div>
                                <div className="text-gray-600">Tracked Budget</div>
                            </div>
                            <div className="bg-white/60 backdrop-blur-xl rounded-2xl p-6 border border-white/40 shadow-lg hover:shadow-xl transition-all duration-300">
                                <div className="text-3xl font-bold bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent mb-2">4.9★</div>
                                <div className="text-gray-600">User Rating</div>
                            </div>
                            <div className="bg-white/60 backdrop-blur-xl rounded-2xl p-6 border border-white/40 shadow-lg hover:shadow-xl transition-all duration-300">
                                <div className="text-3xl font-bold bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent mb-2">99.9%</div>
                                <div className="text-gray-600">Uptime</div>
                            </div>
                        </div>
                    </div>

                    {/* CTA Section */}
                    <div className="py-20 text-center">
                        <div className="bg-white/70 backdrop-blur-2xl rounded-3xl p-12 border border-white/60 max-w-4xl mx-auto shadow-2xl">
                            <h2 className="text-4xl font-bold text-gray-900 mb-6">
                                Ready to take control of your finances?
                            </h2>
                            <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
                                Join thousands of users who have transformed their financial habits with Budget Tracker.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link
                                    to="/signup"
                                    className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-4 rounded-2xl text-lg font-semibold shadow-2xl hover:shadow-indigo-500/50 transition-all duration-300 hover:scale-105 transform"
                                >
                                    Start Free Trial
                                </Link>
                                <Link
                                    to="/login"
                                    className="bg-white/60 backdrop-blur-md border border-white/40 text-gray-700 px-8 py-4 rounded-2xl text-lg font-semibold hover:bg-white/80 transition-all duration-300 hover:scale-105 transform shadow-lg"
                                >
                                    Sign In Now
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="relative z-10 px-6 py-8 border-t border-gray-200/50">
                <div className="max-w-7xl mx-auto text-center">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="white" opacity="0.95" />
                                <path d="M2 17L12 22L22 17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.95" />
                                <path d="M2 12L12 17L22 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.95" />
                            </svg>
                        </div>
                        <span className="bg-gradient-to-r from-indigo-700 to-purple-700 bg-clip-text text-transparent font-semibold">Budget Tracker</span>
                    </div>
                    <p className="text-gray-600 text-sm">
                        © 2025 Budget Tracker. All rights reserved. Built by{' '}
                        <span className="bg-gradient-to-r from-red-600 to-green-600 bg-clip-text text-transparent font-bold text-base">
                            Ne Zha
                        </span>{' '}
                        for better financial management.
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default Landing;
