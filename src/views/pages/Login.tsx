// src/views/pages/Login.tsx
import React, { useState } from 'react';
import { handleLogin } from '../../controllers/authController';
import { AuthLayout } from '../components/Auth/AuthLayout';
import { OTPModal } from '../components/Auth/OTPModal';
import { useNavigate } from 'react-router-dom';


export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('jether_Rui');
  const [password, setPassword] = useState('password123');
  const [showOTP, setShowOTP] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await handleLogin({ usernameOrEmail: username, password });
    if (res.requiresOTP) {
      setShowOTP(true);
    }
  };

  return (
    <AuthLayout activeTab="login" onTabChange={(tab) => navigate(`/${tab}`)}>
      <h2 className="text-3xl font-extrabold text-[#2B41A7] text-center mb-8">Login</h2>
      <form onSubmit={onSubmit} className="space-y-5">
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
            Username / Email
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#2B41A7] outline-none text-slate-700 bg-white"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#2B41A7] outline-none text-slate-700 bg-white"
          />
        </div>
        <button
          type="submit"
          className="w-full py-3.5 bg-[#2B41A7] hover:bg-[#203387] text-white font-bold rounded-xl transition-all shadow-lg"
        >
          LOGIN
        </button>
      </form>

      <OTPModal
        isOpen={showOTP}
        phone="+639128680035"  // This should ideally come from the login response or user data
        purpose="2FA_LOGIN"
        onClose={() => setShowOTP(false)}
        onSuccess={() => {
          alert('Login Successful!');
          navigate('/profile');
        }}
      />
    </AuthLayout>
  );
};