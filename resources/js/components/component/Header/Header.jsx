import React, { useState } from 'react'
import {
  Link
} from "react-router-dom";
import "./Header.css";
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import { useEffect } from 'react';

function Header({ option, scroll }) {
  const [clicked, setClicked] = useState(false);
  const [scrolled, setScrolled] = useState(option);

  const changeNavbar = () => {
    if (window.scrollY > scroll) {
      setScrolled(true)
    } else {
      setScrolled(false)
    }
  }

  useEffect(() => {
    if (option) {
      setScrolled(true)
    } else {
      setScrolled(false)
    }
  }, [])

  window.addEventListener('scroll', changeNavbar)

  const handleClick = () => {
    setClicked(true)
  }
  const closeClick = () => {
    setClicked(false)
  }
  return (
    <div className="headers">
      <nav className={scrolled ? `navbars activated` : 'navbars'}>
        <Link className="navbars-brand" to="/">
          <img
            src={scrolled ? 'https://i.postimg.cc/RFCcDcf6/Logo.png' : "https://i.postimg.cc/N0dQGq7y/Logo-White.png"}
            alt=""
          />
        </Link>
        <div className="navbars-collapse">
          <div className="menu__icon">
            <MenuIcon fontSize="large" className={`menu__burger ${clicked && 'menu__activated'}`} onClick={handleClick} />
            <CloseIcon fontSize="large" className={`menu__close ${clicked && 'menu__activated'}`} onClick={closeClick} />
          </div>
          <ul className={`navbars-nav ${clicked && 'nav-actived'}`}>
            <li className="navs-item">
              <Link to='/' className="navs-link">
                HOME
              </Link>
            </li>
            <li className="navs-item">
              <Link to='/produk' className="navs-link">
                PRODUK
              </Link>
            </li>
            <li className="navs-item">
              <Link to='/article' className="navs-link">
                BLOG
              </Link>
            </li>
            <li className="navs-item">
              <Link to='/tentang' className="navs-link">
                TENTANG KAMI
              </Link>
            </li>
            <li className="navs-item">
              <Link to='/hubungi' className="navs-link">
                HUBUNGI KAMI
              </Link>
            </li>
            <li className="navs-item">
              <Link to='/login' className="navs-link">
                LOGIN
              </Link>
            </li>
            <li className="navs-item">
              <Link to='/register' className="navs-link">
                DAFTAR
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  )
}

export default Header
