import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Home, Info, Award, Menu } from "feather-icons-react/build/IconComponents";
import logo from "../../image/SMPN1CSK.png";
import "./Header.css";

const Header = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogin = () => {
    navigate('/login');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="header">
      <div className="logo">
      <img src={logo} className="logo1" alt="Logo SMP" />
      <NavLink to="/" className="logo2">PPDB <span>SMP N 1 CISOKA</span></NavLink>
      </div>

      <div className={`header-tab-container ${isMenuOpen ? "active" : ""}`}>
        <NavLink to="/" className="header-tab"><Home /> Home</NavLink>
        <NavLink to="/info" className="header-tab"><Info /> Informasi PPDB</NavLink>
        <NavLink to="/kuota" className="header-tab"><Award /> Kuota Pendaftaran</NavLink>
        <NavLink to="/peringkat" className="header-tab"><Award /> Peringkat</NavLink>
      </div>
      <div className="btn-login1-container">
        <button className="btn-login1" onClick={handleLogin}>Login</button>
      </div>
      <div>
        <button className="menu-toggle" onClick={toggleMenu}><Menu/></button>
      </div>
    </nav>
  );
};

export default Header;
