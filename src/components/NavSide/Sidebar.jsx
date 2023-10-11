import "./Sidebar.css"
import { Link, useNavigate} from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Logout, reset } from "../../features/authSlice";
import {Home, FileText, UserPlus, Award, User, LogOut} from "feather-icons-react/build/IconComponents";

const Sidebar = ({toggleSidebar}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {user} = useSelector((state) => state.auth);

  const logout = () =>{
    dispatch(Logout());
    dispatch(reset());
    navigate("/login")
  }

  return(
  toggleSidebar && (
    <div className='sidebar'>
      <div className="sidebar-content">
        <label className="sidebar-label">General</label>
          <Link to="/dashboard" className="sidebar-menu-list" ><Home/>Beranda</Link>
          {user && user.role === "admin" &&(
            <div>
              <Link to="/aspek" className="sidebar-menu-list"><FileText/>Aspek Penilaian</Link>
              <Link to="/jalur" className="sidebar-menu-list-user"><FileText/>Jalur Penerimaan</Link>
            </div>
          )}
          <Link to="/pendaftaran" className="sidebar-menu-list"><UserPlus/>Daftar</Link>
          <Link to="/hasil" className="sidebar-menu-list"><Award/>Hasil</Link>
          {user && user.role === "admin" &&(
            <div>
              <label >Admin</label>
              <Link to="/userlist" className="sidebar-menu-list-user"><User/>User</Link>
            </div>
          )}
        <label>Settings</label>
        <button onClick={logout} className="sidebar-btn_logout"><LogOut/>Logout</button>
      </div>
    </div>
  )
  )
};

export default Sidebar;
