
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  Phone, 
  Clock, 
  BarChart, 
  Settings,
  Book
} from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();
  
  const navItems = [
    {
      name: 'Dashboard',
      icon: <LayoutDashboard size={20} />,
      href: '/dashboard',
    },
    {
      name: 'Voice Agents',
      icon: <Phone size={20} />,
      href: '/voice-agents',
    },
    {
      name: 'Call Logs',
      icon: <Clock size={20} />,
      href: '/call-logs',
    },
    {
      name: 'Knowledge Base',
      icon: <Book size={20} />,
      href: '/knowledge-base',
    },
    {
      name: 'Analytics',
      icon: <BarChart size={20} />,
      href: '/analytics',
    },
    {
      name: 'Settings',
      icon: <Settings size={20} />,
      href: '/settings',
    },
  ];

  return (
    <div className="h-screen bg-white border-r border-gray-200 w-56 flex flex-col">
      <div className="p-5">
        <div className="flex items-center">
          <img src="/lovable-uploads/354da74a-8510-41f7-9021-e86ef760aab2.png" alt="LunaLink AI" className="h-7 w-auto" />
          <h1 className="ml-2 text-lg font-semibold">LunaLink AI</h1>
        </div>
      </div>
      
      <nav className="flex-1 pt-4">
        {navItems.map((item, index) => (
          <Link
            to={item.href}
            key={index}
            className={cn(
              "flex items-center px-4 py-2 text-sm font-medium transition-colors",
              location.pathname === item.href
                ? "text-primary bg-gray-100"
                : "text-gray-600 hover:text-primary hover:bg-gray-50"
            )}
          >
            <div className="mr-3 text-current">{item.icon}</div>
            {item.name}
          </Link>
        ))}
      </nav>
      
      <div className="p-4 border-t border-gray-200 mt-auto">
        <div className="bg-gray-50 p-3 rounded-md">
          <div className="flex items-center">
            <span className="text-gray-600 flex-1 text-sm">Shopify Store</span>
            <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">Connected</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
