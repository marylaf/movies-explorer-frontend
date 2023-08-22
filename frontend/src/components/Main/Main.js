import Promo from "../Promo/Promo";
import NavTab from "../NavTab/NavTab";
import AboutProject from "../AboutProject/AboutProject";
import Techs from "../Techs/Techs";
import AboutMe from "../AboutMe/AboutMe";
import Portfolio from "../Portfolio/Portfolio";
import HeaderMain from "../HeaderMain/HeaderMain";
import Footer from "../Footer/Footer";
import HeaderAuth from "../HeaderAuth/HeaderAuth";
import React from "react";

function Main({ isLoggedIn }) {
  
  return (
    <>
    {isLoggedIn ? <HeaderAuth isLoggedIn={isLoggedIn} /> : <HeaderMain />}
      <main>
        <Promo />
        <NavTab />
        <AboutProject />
        <Techs />
        <AboutMe />
        <Portfolio />
      </main>
      <Footer />
    </>
  );
}

export default Main;
