import React from "react";

const EmptyData = ({title}) => {
  return (
    <div className="text-center flex justify-center items-center flex-col w-full">
      <img src="/images/na-seat.jpg" alt="not found" />
      <h1 className="text-2xl font-semibold">{title}</h1>
    </div>
  );
};

export default EmptyData;
