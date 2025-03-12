/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useContext, useEffect, useState } from "react";
// import ApiSetup from "../utils/ApiSetup";

const ModalContext = createContext();

export const useModal = () => useContext(ModalContext);

const ModalProvider = ({ children }) => {
  const [appLoading, setAppLoading] = useState(false);
  const [isOpenCatalog, setIsOpenCatalog] = useState(false);
  

  return (
    <ModalContext.Provider
      value={{
        appLoading,
        setAppLoading,
        isOpenCatalog,
        setIsOpenCatalog
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
