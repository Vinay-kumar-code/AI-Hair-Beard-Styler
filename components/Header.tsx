
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-slate-900/50 backdrop-blur-sm shadow-lg shadow-slate-950/20 border-b border-slate-700">
      <div className="container mx-auto px-4 py-5 text-center">
        <h1 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-sky-400">
          AI Hair & Beard Styler
        </h1>
        <p className="mt-2 text-slate-400">Try a new look with the power of Gemini AI</p>
      </div>
    </header>
  );
};

export default Header;
