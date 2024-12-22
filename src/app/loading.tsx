import Image from "next/image";
import React from "react";
import Stamp from "@/assets/dashboard/images/icon/loading.png";

const Loader = () => {
  return (
    <div className="loader">
      <Image src={Stamp} alt="Loader" />
    </div>
  );
};

export default Loader;
