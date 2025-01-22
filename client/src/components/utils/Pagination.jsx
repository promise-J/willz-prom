import React from "react";

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  setItemsPerPage,
  setCurrentPage
}) => {
  return (
    <div className="flex justify-center items-center space-x-4 mt-6 mb-10">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-4 py-2 bg-blue-900 text-white rounded-md ${
          currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        Prev
      </button>
      <span className="text-lg">
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 bg-blue-900 text-white rounded-md ${
          currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        Next
      </button>
      <select
        onChange={(e) => {
          setCurrentPage(1)
          setItemsPerPage(e.target.value);
        }}
        className="border-gray-300 border-2 px-4 py-1"
        name=""
        id=""
      >
        <option value={2}>2</option>
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={15}>15</option>
        <option value={20}>20</option>
      </select>
    </div>
  );
};

export default Pagination;
