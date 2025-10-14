import React, { useState } from 'react'

const App = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");



  const handleSubmit = async (e) => {
    e.preventDefault();
    // TODO: Send login data to backend
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      console.log('Response from backend:', data);
    } catch (err) {
      console.error('Error submitting form:', err);
    }
    console.log("Login submitted", { email, password });
  };



  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-indigo-700 mb-6">Budget Tracker Login</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email for me</label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition duration-200"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default App