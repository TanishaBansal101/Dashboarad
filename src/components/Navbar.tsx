
import React from 'react';
import { Bell, Search, User } from 'lucide-react';

const Navbar: React.FC = () => {
  return (
    <div className="h-14 border-b flex items-center justify-between px-4 bg-card">
      <div className="relative w-64">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        <input
          type="text"
          placeholder="Search..."
          className="w-full h-9 pl-10 pr-4 rounded-md border border-input bg-background focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>
      
      <div className="flex items-center gap-4">
        <button className="relative p-2 rounded-full hover:bg-accent transition-colors">
          <Bell size={20} className="text-muted-foreground" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full"></span>
        </button>
        
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
            <User size={16} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
