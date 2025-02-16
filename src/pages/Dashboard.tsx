import React from "react";
import SidebarLeft from "../components/SidebarLeft";
import MainContent from "../components/MainContent";
import SidebarRight from "../components/SidebarRight";

const Dashboard: React.FC = () => {
  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      <SidebarLeft />
      <MainContent />
      <SidebarRight />
    </div>
  );
};

export default Dashboard;