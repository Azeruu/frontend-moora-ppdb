import { useState } from "react";
import { useSelector } from "react-redux";
import { Menu } from "feather-icons-react/build/IconComponents";
import "./Navbar.css";
import logo from "../../image/profile1.png";
import ModalProfil from "./ModalProfil";
import Sidebar from "./Sidebar";

const Navbar = () => {
  const [modal, setModal] = useState(false);
  const [sidebar, setSidebar] = useState(false);
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
  const openSidebar = () =>{
    setSidebar(true);
  }
  const closeSidebar = () => {
    setSidebar(false);
  }
  const toggleSidebar = () => {
    setSidebar(!sidebar);
  };
  

  return (
    <div className="navbar">
      <Sidebar toggleSidebar={sidebar} />
      <button className="navbar-profile-openbtn" onClick={toggleSidebar}><Menu/></button>
      <button className="navbar-profile-openbtn" onClick={openModal}>
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
