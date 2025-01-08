"use client";
import Header from "@/layouts/headers/header";
import Wrapper from "@/layouts/wrapper";
import HeroBannerThree from "./components/hero-banners/hero-banner";
import HowItWorks from "./components/how-it-works/how-it-works";
import HeaderThree from "@/layouts/headers/header-3";
import FeatureThree from "./components/features/feature-three";
import FooterOne from "@/layouts/footers/footer-one";
import Roadmap from "./components/roadmap/roadmap";

const Home: React.FC = () => {
  return (
    <Wrapper>
      <HeaderThree />
      <HeroBannerThree />
      <FeatureThree />
      <HowItWorks />
      <Roadmap />
      <div className="footer-with-bg">
        <FooterOne />
      </div>
    </Wrapper>
  );
};

export default Home;
