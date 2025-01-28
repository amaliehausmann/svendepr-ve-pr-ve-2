import { NavBar } from "../NavBar/NavBar";
import style from "./Header.module.scss";
import { useState, useEffect } from "react";
import { IoMenuSharp } from "react-icons/io5";

export const Header = ({ title, subTitle }) => {
  const [showNav, setShowNav] = useState(false);

  //Funktion som tjekker om skærmstørrelsen er mobilstørrelse
  const isMobile = () => window.innerWidth <= 750;

  function toggleNav() {
    if (isMobile()) {
      setShowNav((prev) => !prev);
    } else {
      setShowNav(true);
    }
  }

  useEffect(() => {
    const handleResize = () => {
      if (!isMobile()) {
        setShowNav(true);
      } else {
        setShowNav(false);
      }
    };

    window.addEventListener("resize", handleResize);

    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header className={style.headerStyling}>
      <img src="/public/hotel-overlook-logo.png" alt="" />
      {isMobile && (
        <span onClick={toggleNav}>
          <IoMenuSharp />
        </span>
      )}
      {showNav && <NavBar />}
    </header>
  );
};
