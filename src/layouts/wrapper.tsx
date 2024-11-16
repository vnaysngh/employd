"use client";
import React, { useEffect } from "react";
// import { resetFilter } from "@/redux/features/filterSlice";
// import { useAppDispatch } from "@/redux/hook";
import { animationCreate } from "@/utils/utils";
import { usePathname } from "next/navigation";
import { ToastContainer } from "react-toastify";

// if (typeof window !== "undefined") {
//   require("bootstrap/dist/js/bootstrap");
// }

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
      <ToastContainer />
    </>
  );
};

export default Wrapper;
