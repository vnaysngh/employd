"use client";
import Header from "@/layouts/headers/header";
import Wrapper from "@/layouts/wrapper";
import HeroBannerThree from "./components/hero-banners/hero-banner";
import FeatureFive from "./components/features/feature-five";
import HeaderThree from "@/layouts/headers/header-3";

const Home: React.FC = () => {
  return (
    <Wrapper>
      <HeaderThree />

      {/* hero banner three start */}
      <HeroBannerThree />
      {/* hero banner three end */}

      {/* feature five start */}
      <FeatureFive />
      {/* feature five end */}
    </Wrapper>
  );
};

export default Home;
