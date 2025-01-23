import React from "react";

const DashboardTable = ({children}) => {
  return (
    <div className="overflow-x-auto mb-6 w-[80vw] ms-[38px]">
      <table className="min-w-full table-auto border-collapse">{children}</table>
    </div>
  );
};

export default DashboardTable;
