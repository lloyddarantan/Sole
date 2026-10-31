import React from 'react';

interface AuthLayoutProps {
  children: React.ReactNode;
  activeTab: 'login' | 'signup';
  onTabChange: (tab: 'login' | 'signup') => void;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
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