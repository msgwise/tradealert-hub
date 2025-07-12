import React from 'react';
import { Search, Bell, User, Moon, Sun } from 'lucide-react';

interface NavbarProps {
  setTheme: (theme: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ setTheme }) => {
  return (
    <nav className="bg-gray-800 p-4 flex justify-between items-center">
      <div className="text-xl font-bold">TradeAlert Hub</div>
      <div className="flex items-center space-x-4">
        <Search className="w-6 h-6" />
        <input type="text" placeholder="Search news..." className="bg-gray-700 p-2 rounded" />
        <Bell className="w-6 h-6" />
        <User className="w-6 h-6" />
        <button onClick={() => setTheme('dark')}><Moon /></button>
        <button onClick={() => setTheme('light')}><Sun /></button>
      </div>
    </nav>
  );
};

export default Navbar;

Update for Firebase
