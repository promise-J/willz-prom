import React from "react";
import DashboardHeader from "./dashboard/DashboardHeader";

const Container = ({children}) => {
  return (
    <div className="w-full flex flex-col">
      <DashboardHeader />
      <div className="p-3 h-full overflow-auto">
        {children}
      </div>
    </div>
  );
};

export default Container;
