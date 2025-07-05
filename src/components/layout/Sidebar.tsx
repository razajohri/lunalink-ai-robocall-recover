
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  Phone, 
  Clock, 
  BarChart, 
  Settings,
  DollarSign
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
      name: 'Analytics',
      icon: <BarChart size={20} />,
      href: '/analytics',
    },
    {
      name: 'Billing',
      icon: <DollarSign size={20} />,
      href: '/billing',
    },
    {
      name: 'Settings',
      icon: <Settings size={20} />,
      href: '/settings',
    },
  ];

  return (
    <div className="h-screen bg-white border-r border-gray-200 w-44 flex flex-col">
      <div className="p-4">
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
              "flex items-center px-3 py-2 text-sm font-medium transition-colors",
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
            <span className="text-gray-600 flex-1 text-sm">Vapi Assistant</span>
            <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">Connected</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
