import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import logo from "public/images/Company-Logo-Normal-1/1.svg";
import logoLight from "public/images/logo-light.png";
import Offcanvas from "./Offcanvas";

interface HeaderProps {
  openNav: boolean;
  setOpenNav: (value: boolean) => void;
  handleNav: () => void;
}

const Header = ({ openNav, handleNav, setOpenNav }: HeaderProps) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const defaultClasses = "primary-navbar secondary--navbar";

  const combinedClasses = `${
    scrolled ? " navbar-active" : " "
  } ${defaultClasses}`;

  let logoSrc = logo;

  const router = useRouter();
  if (router.pathname === "/index-light") {
    logoSrc = logoLight;
  }

  return (
    <>
      <header className="header">
        <div className={combinedClasses}>
          <div className="container">
            <div className="row">
              <div className="col-12">
                <nav className="navbar p-0">
                  
                <div className="navbar__logo">
  <Link href="/" aria-label="go to home">
    <Image
      src={logoSrc}
      alt="Company Logo"
      width={160}
      
    />
  </Link>
</div>
                  <div className="navbar__options">
                    <button
                    // 594c48
                    style={{ border: '2px solid #FD8B28' }}
                      className="open-offcanvas-nav border: 2px solid orange d-flex"
                      aria-label="toggle mobile menu"
                      title="open offcanvas menu"
                      onClick={handleNav}
                    ></button>
                  </div>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </header>
      <Offcanvas openNav={openNav} setOpenNav={setOpenNav} />
    </>
  );
};

export default Header;
