import React from "react";
import { Outlet } from "react-router-dom";
import SidebarLeft from "./SidebarLeft";
import SidebarRight from "./SidebarRight";

const MainLayout: React.FC = () => {
  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      <SidebarLeft />
      <div className="flex-1 overflow-auto">
        <Outlet />
      </div>
      <SidebarRight />
    </div>
  );
};

export default MainLayout;
