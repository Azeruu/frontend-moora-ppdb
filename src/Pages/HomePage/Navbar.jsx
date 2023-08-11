import { Link } from "react-router-dom";
import { useState } from "react";
import { Check, Home, Info, Menu, Image,PhoneCall } from "feather-icons-react/build/IconComponents";
import {User} from "feather-icons-react/build/IconComponents";
import Sidebar from "./Sidebar";
import "./Navbar.css";
import logo from "../../image/react.png";
const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  // const [option, setOption] = useState(false);

  const menuOpen = () =>{
    setToggle(!toggle);
  }
  // const openDropdown = () => {
  //   setOption(!option);
  // };

  return (
    <nav className="Navbar">
      <img src={logo} className="nav-logo1" alt="Logo SMP"></img>
      <a href="/" className="nav-logo2">
        PPDB <span>SMP N 1 CISOKA</span>.
      </a>
      <div className="navbar-nav">
        <a href="/#hero" style={{ fontSize:"1.1rem", cursor: "pointer" }}><Home className="nav-pic"/>Home</a>
        <a href="/#about" style={{ fontSize:"1.1rem",cursor: "pointer" }}><User className="nav-pic"/>Profil Sekolah</a>
        <a href="/#vismis" style={{ fontSize:"1.1rem",cursor: "pointer" }}><Check className="nav-pic"/>Visi & Misi</a>
        <a href="/#info1" style={{ fontSize:"1.1rem",cursor: "pointer" }}><Info className="nav-pic"/>Informasi</a>
        <a href="/#fasilitas" style={{fontSize:"1.1rem", cursor: "pointer" }}><Image className="nav-pic"/>Galeri</a>
        <a href="/#contact"style={{ fontSize:"1.1rem",cursor: "pointer" }}><PhoneCall className="nav-pic"/>Kontak Kami</a>
      </div>
      <div className="navbar-extra">
        <Menu className="menu" onClick={menuOpen}>
          Menu
        </Menu>
        <Sidebar toggle={toggle} menuOpen={menuOpen} />
        <Link to="/login" className="login">
          <p>Login</p>
          <User />
        </Link>
      </div>
    </nav>
  );

  // make a responsive sidebar in react
    
  }

export default Navbar;
