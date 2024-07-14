import { useState } from "react";
import { useSelector } from "react-redux";
import { Menu } from "feather-icons-react/build/IconComponents";
import "./Navbar.css";
import logo from "../../image/userPng.png";
import ModalProfil from "./ModalProfil";

const Navbar = ({toggleSidebar}) => {
  const [modal, setModal] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const Huruf = (user) => {
    return user.charAt(0).toUpperCase() + user.slice(1);
  }

  const openModal = () =>{
    setModal(true);
  }
  const closeModal = () => {
    setModal(false);
  }
  
  const buttonClass = modal ? 'navbar-profile-openbtn-active' : 'navbar-profile-openbtn';

  return (
    <div className="navbar">
      <button className="navbar-menu-openbtn" onClick={toggleSidebar}><Menu/></button>
      <button className={buttonClass} onClick={openModal}>
        <div className="navbar-btn-content">
          <img className="foto-user-navbar" src={logo} alt="foto user"></img>
          <p>Hi, {user && Huruf(user.username)}</p>
        </div>
      </button>
      <ModalProfil isOpen={modal} isClose={closeModal}/>
    </div>
  ); 
}

export default Navbar;
