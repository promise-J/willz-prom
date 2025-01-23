import React from "react";
import DashboardHeader from "./dashboard/DashboardHeader";
import { useOutletContext } from "react-router-dom";

const Container = ({children}) => {
  const {showSidebar, setShowSidebar} = useOutletContext()

  return (
    <div className="w-full flex flex-col">
      <DashboardHeader setShowDashboardSidebar={setShowSidebar} showDashboardSidebar={showSidebar} />
      <div className="p-3 h-full overflow-auto">
        {children}
      </div>
    </div>
  );
};

export default Container;
