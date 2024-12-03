"use client";
import React, { useState } from "react";
import Wrapper from "@/layouts/wrapper";
import EmployAside from "@/app/components/dashboard/employ/aside";
import EmployerInvite from "@/app/components/dashboard/employ/invite";

const EmployerDashboardInvite = () => {
  const [isOpenSidebar, setIsOpenSidebar] = useState<boolean>(false);
  return (
    <Wrapper>
      <div className="main-page-wrapper">
        {/* aside start */}
        <EmployAside
          isOpenSidebar={isOpenSidebar}
          setIsOpenSidebar={setIsOpenSidebar}
        />
        {/* aside end  */}

        {/* profile area start */}
        <EmployerInvite setIsOpenSidebar={setIsOpenSidebar} />
        {/* profile area end */}
      </div>
    </Wrapper>
  );
};

export default EmployerDashboardInvite;
