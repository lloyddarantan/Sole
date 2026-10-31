// src/views/components/Auth/AuthLayout.tsx
import React from 'react';

interface AuthLayoutProps {
  children: React.ReactNode;
  activeTab: 'login' | 'signup';
  onTabChange: (tab: 'login' | 'signup') => void;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children, activeTab, onTabChange }) => {
  return (
    <div className="w-screen h-screen flex flex-col md:flex-row bg-white overflow-hidden">
      {/* Left Panel */}
      <div className="md:w-1/2 w-full bg-[#2B41A7] text-white flex flex-col justify-between p-8 relative">
        <div className="flex items-center gap-2">
          <span className="font-extrabold text-2xl tracking-wider">SOLE.</span>
        </div>

        <div className="flex-1 flex items-center justify-center relative">
          <img
            src="/src/assets/images/sneakers.png"
            alt="Air Jordan Sneaker"
            className="w-4/5 max-w-md object-contain drop-shadow-2xl"
          />
          <div className="absolute right-0 flex flex-col gap-2">
            <button
              onClick={() => onTabChange('login')}
              className={`px-5 py-2 rounded-l-full text-sm font-semibold transition-all ${
                activeTab === 'login' ? 'bg-white text-[#2B41A7]' : 'bg-[#1E2E78] text-white'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => onTabChange('signup')}
              className={`px-5 py-2 rounded-l-full text-sm font-semibold transition-all ${
                activeTab === 'signup' ? 'bg-white text-[#2B41A7]' : 'bg-[#1E2E78] text-white'
              }`}
            >
              Sign Up
            </button>
          </div>
        </div>
        <p className="text-xs text-blue-200">© Sole Inc. All Rights Reserved.</p>
      </div>

      {/* Right Form Container */}
      <div className="md:w-1/2 w-full flex items-center justify-center p-8 bg-slate-50">
        <div className="w-full max-w-md">{children}</div>
      </div>
    </div>
  );
};