// src/views/pages/SignUp.tsx
import React, { useState } from 'react';
import { handleSignUp } from '../../controllers/authController';
import { AuthLayout } from '../components/Auth/AuthLayout';
import { OTPModal } from '../components/Auth/OTPModal';
import { useNavigate } from 'react-router-dom';

export const SignUpPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: 'Jether',
    lastName: 'Aguatani',
    email: 'jetaguatani@gmail.com',
    phone: '+63128680035',
    password: 'password123',
    confirmPassword: 'password123'
  });
  const [showOTP, setShowOTP] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await handleSignUp(formData);
    if (res.requiresOTP) {
      setShowOTP(true);
    }
  };

  return (
    <AuthLayout activeTab="signup" onTabChange={(tab) => navigate(`/${tab}`)}>
      <h2 className="text-3xl font-extrabold text-[#2B41A7] text-center mb-6">Create Account</h2>
      <form onSubmit={onSubmit} className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase">First Name</label>
            <input
              type="text"
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              className="w-full p-2.5 border rounded-xl text-sm outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase">Last Name</label>
            <input
              type="text"
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              className="w-full p-2.5 border rounded-xl text-sm outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase">Email Address</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full p-2.5 border rounded-xl text-sm outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase">Phone Number</label>
          <input
            type="text"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full p-2.5 border rounded-xl text-sm outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase">Password</label>
          <input
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="w-full p-2.5 border rounded-xl text-sm outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase">Confirm Password</label>
          <input
            type="password"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            className="w-full p-2.5 border rounded-xl text-sm outline-none"
          />
        </div>

        <button type="submit" className="w-full py-3 bg-[#2B41A7] text-white font-bold rounded-xl mt-2">
          Create Account
        </button>
      </form>

      <OTPModal
        isOpen={showOTP}
        phone={formData.phone}
        purpose="REGISTRATION"
        onClose={() => setShowOTP(false)}
        onSuccess={() => {
          alert('Registration Successful!');
          navigate('/profile');
        }}
      />
    </AuthLayout>
  );
};