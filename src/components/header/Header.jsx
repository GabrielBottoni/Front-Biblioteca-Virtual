import React from 'react';
import './header.css';
import logotipo from '../../assets/coruja.svg';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { FaSignOutAlt } from 'react-icons/fa';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const pathname = location.pathname;
 
  const isAuthPages = 
  pathname === "/login" ||
  pathname === "/cadastro" ||
  pathname === "/redefinicao" ||
  pathname === "/admin" ||
  pathname.startsWith("/admin/editar/");
  
  const isBooksPage = 
  pathname.startsWith("/livros") ||
  pathname === "/admin" ||
  pathname.startsWith("/admin/editar/");


  const hideBurgerMenu =
    isAuthPages || 
    pathname === "/livros" || 
    pathname === "/redefinicao" || 
    pathname.startsWith("/livros/");

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg fixed-top">
      <div className="container d-flex align-items-center justify-content-between">
        <img
          src={logotipo}
          alt="Logotipo"
          className="logo-svg me-auto"
        />
        
        {!hideBurgerMenu && (
          <>
            <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
              <div className="offcanvas-header">
                <img
                  src={logotipo}
                  alt="Logotipo"
                  className="logo-svg me-auto"
                />
                <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
              </div>
              <div className="offcanvas-body">
                <ul className="navbar-nav justify-content-center flex-grow-1 pe-3">
                  <li className="nav-item">
                    <a className="nav-link mx-lg-2" aria-current="page" href="#home">Home</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link mx-lg-2" href="#sobre">Sobre</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link mx-lg-2" href="#servicos">Serviços</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link mx-lg-2" href="#contato">Contato</a>
                  </li>
                </ul>
              </div>
            </div>

            <Link to="/login" className="login-button">Login</Link>
          </>
        )}

        {!isAuthPages && !isBooksPage && !hideBurgerMenu && (
          <button
            className="navbar-toggler pe-0"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar"
            aria-controls="offcanvasNavbar"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        )}

        {isBooksPage && (
          <Button variant="danger" onClick={handleLogout} className="btn-logout">
            <FaSignOutAlt /> Logout
          </Button>
        )}
      </div>
    </nav>
  );
};

export default Header;
