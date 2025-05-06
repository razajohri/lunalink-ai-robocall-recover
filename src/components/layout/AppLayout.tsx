
import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const AppLayout = () => {
  return (
    <div className="flex min-h-screen bg-luna-background">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <div className="shopify-layout p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AppLayout;
