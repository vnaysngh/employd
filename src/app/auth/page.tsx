"use client";
import React from "react";
import Homepage from "../components/homepage";
import HeaderTwo from "@/layouts/headers/header-2";
// import "../../node_modules/bootstrap/dist/js/bootstrap";

const Home: React.FC = () => {
  return (
    <>
      <HeaderTwo />
      <Homepage />
    </>
  );
};

export default Home;
