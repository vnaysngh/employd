"use client";
import Header from "@/layouts/headers/header";
import React from "react";
import Homepage from "./components/homepage";
import "../../node_modules/bootstrap/dist/js/bootstrap";

const Home: React.FC = () => {
  return (
    <>
      <Header />
      <Homepage />
    </>
  );
};

export default Home;
