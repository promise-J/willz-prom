import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import DashboardHeader from "../../components/dashboard/DashboardHeader";
import { dashboardData } from "../../components/utils/constants";
import Pagination from "../../components/utils/Pagination";
import Container from "../../components/Container";
import DashboardTable from "../../components/utils/DashboardTable";
import { formatNumberWithCommas } from "../../utils/helpers";
import ApiSetup, { formatDate } from "../../utils/ApiSetup";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useVtu } from "../../context/VtuContext";
import { BsCopy } from "react-icons/bs";
import toast from "react-hot-toast";

const Dashboard = () => {
  const { userInfo } = useAuth();
  const { transactionData } = useVtu();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(2);
  const [filter, setFilter] = useState("");
  const [transactions, setTransactions] = useState([]);
  const api = ApiSetup();

  const textToCopy = `https://www.appser.com.ng/sign-up?refferal=${userInfo?.username}`;

  const [searchParams] = useSearchParams();
  const fundWalletKey = searchParams.get("fundwallet");

  // Filter data based on the filter text
  const filteredData = transactions.filter((item) =>
    Object.values(item).some((val) =>
      val.toString().toLowerCase().includes(filter.toLowerCase())
    )
  );


  useEffect(() => {
    getTransactions();
  }, [userInfo]);

  useEffect(() => {
    async function fundWallet() {
      try {
        const res = await api.put("users/fund-account", transactionData);
        if (res?.data?.success) {
          window.location.href = "/dashboard";
        }
      } catch (error) {
        console.log(error);
      }
    }
    if (fundWalletKey) {
      fundWallet();
    }
  }, [fundWalletKey, transactionData, userInfo]);

  async function getTransactions() {
    try {
      let transactionUrl =
        userInfo?.userType === "admin"
          ? "transactions/get-transactions"
          : `transactions/get-transactions?userId=${userInfo?._id}`;

      const res = await api.get(transactionUrl);

      res?.data?.success
        ? setTransactions(res?.data?.data?.message)
        : setTransactions([]);
    } catch (error) {
      console.log(error);
    }
  }

  // Calculate total number of pages
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // Get the data for the current page
  const currentData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle page change
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const displayBalance = () => {
    return formatNumberWithCommas(userInfo?.balance) || 0;
  };

  const copyTextToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      toast.success("Text copied to clipboard!", { position: "top-right" });
    } catch (err) {
      toast.error("Failed to copy text", { position: "top-right" });
    }
  };

  return (
    <Container>
      <div className="flex items-center justify-between pe-10 py-3 bg-gray-100">
        <h1 className="ps-[10px] text-black text-md md:text-2xl font-semibold hidden md:block">
          Welcome back, {userInfo?.first_name} {userInfo?.last_name}
        </h1>
        <h1 className="ps-[10px] text-black text-md md:text-2xl font-semibold md:hidden">
          Welcome {userInfo?.first_name}
        </h1>
      </div>
      <p className="text-sm flex flex-col items-center mt-5">
        <span>
          Your refferal link:{" "}
          <a className="text-blue-900 text-[11px]" href="">
            https://www.appser.com.ng/sign-up?refferal={userInfo?.username}
          </a>
        </span>
        <span className="flex items-center gap-3">
          Click to copy <BsCopy onClick={copyTextToClipboard} cursor={"pointer"} />
        </span>
      </p>
      <h2 className="ps-[10px] md:ps-[35px] py-3">Overview</h2>
      <div className="flex md:gap-10 gap-4 px-2 md:px-[35px] py-4 md:flex-row flex-col">
        <div className="flex-1 bg-gray-100 hover:bg-blue-50 cursor-pointer p-5 flex flex-col gap-4">
          <h2 className="text-lg">Wallet</h2>
          <p className="text-[30px]">{displayBalance()}</p>
        </div>
        <div className="flex-1 bg-gray-100 hover:bg-blue-50 cursor-pointer p-5 flex flex-col gap-4">
          <h2 className="text-lg">Transaction</h2>
          <p className="text-[30px]">{transactions.length}</p>
        </div>
      </div>
      <h2 className="ps-[35px] py-3">
        Recent Wallet Funding {userInfo?.userType == "admin" && "(All)"}
      </h2>

      <DashboardTable>
        <thead>
          <tr className="bg-blue-50 text-left">
            <th className="px-4 py-2 border">Reference</th>
            <th className="px-4 py-2 border">Date</th>
            <th className="px-4 py-2 border">Amount</th>
            <th className="px-4 py-2 border">Status</th>
            <th className="px-4 py-2 border">Type</th>
          </tr>
        </thead>
        <tbody>
          {currentData.length > 0 ? (
            currentData.map((row, index) => (
              <tr key={index} className="hover:bg-blue-50">
                <td className="px-4 py-2 border">{row.transaction}</td>
                <td className="px-4 py-2 border">
                  {formatDate(row.createdAt)}
                </td>
                <td className="px-4 py-2 border">{row.amount}</td>
                <td className="px-4 py-2 border">{row.status}</td>
                <td className="px-4 py-2 border">{row.type}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center py-4">
                No data found
              </td>
            </tr>
          )}
        </tbody>
      </DashboardTable>
      <Pagination
        setItemsPerPage={setItemsPerPage}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        setCurrentPage={setCurrentPage}
        itemPerPage={itemsPerPage}
        currentData={currentData}
      />
    </Container>
  );
};

export default Dashboard;
