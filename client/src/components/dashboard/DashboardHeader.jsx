import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { FiMenu } from "react-icons/fi";
import DashboardDropDown from "./DashboardDropDown";
import { useLocation } from "react-router-dom";

const DashboardHeader = ({setShowDashboardSidebar, showDashboardSidebar}) => {
  const { userInfo } = useAuth();
  const {pathname} = useLocation()

  const [pageName, setPageName] = useState('')

  function processPageTitle(){
    if(pathname == '/dashboard'){
      return 'dashboard'
    }
    let page_name = pathname.split('/')
    page_name = page_name[page_name.length - 1]
    const result = page_name.replace(/-/g, ' ');
    return result
  }

  useEffect(()=>{
    const page = processPageTitle()
    setPageName(page)
  },[pathname])
    
  const showMenu = ()=>{
    setShowDashboardSidebar(true)
  }

  return (
    <div className="py-3 flex justify-between items-center pe-3 md:pe-10 border-b-[1px] border-gray-300">
      <DashboardDropDown setShowSidebar={setShowDashboardSidebar} showSidebar={showDashboardSidebar} />
      <h1 className="justify-start ms-5 uppercase">{pageName}</h1>
      <FiMenu onClick={showMenu} size={20} className="ms-8 md:ms-2 md:me-8 lg:hidden block" cursor={'pointer'} />
    </div>
  );
};

export default DashboardHeader;
