import Promo from "../Promo/Promo";
import NavTab from "../NavTab/NavTab";
import AboutProject from "../AboutProject/AboutProject";
import Techs from "../Techs/Techs";
import AboutMe from "../AboutMe/AboutMe";
import Portfolio from "../Portfolio/Portfolio";
import HeaderMain from "../HeaderMain/HeaderMain";
import Footer from "../Footer/Footer";
import React from "react";

function Main() {
  
  return (
    <>
    <HeaderMain />
    <Promo />
    <NavTab />
    <AboutProject />
    <Techs />
    <AboutMe />
    <Portfolio />
    <Footer />
  </>
  );
}

export default Main;
