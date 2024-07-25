import "./Sidebar.css"
import { NavLink, useNavigate} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Logout, reset } from "../../features/authSlice";
import {Home, FileText, UserPlus, Award, User, LogOut, PieChart, Map, Edit} from "feather-icons-react/build/IconComponents";
import logo from "../../image/userPng.png";

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {user} = useSelector((state) => state.auth);
  
  const logout = () =>{
    dispatch(Logout());
    dispatch(reset());
    navigate("/login")
  }

  return(
    <div className='sidebar'>
      <div className="sidebar-content">
        <div className="sidebar-pp-container">
          <img src={logo} alt="logo" className="pp" />
        </div>
        <label className="sidebar-label">GENERAL</label>
        <div className="grid-container">
            <NavLink to="/dashboard" activeClassName="sidebar-menu-list.active" className="sidebar-menu-list" ><Home/>Beranda</NavLink>
            <NavLink to="/daftar" className="sidebar-menu-list"><Edit/>Pendaftaran</NavLink>
            {user && user.role === "admin" &&(
              <div>
                <NavLink to="/kuota/admin" className="sidebar-menu-list"><Map/>Quota Pendaftaran</NavLink>
                <NavLink to="/jalur" className="sidebar-menu-list"><Map/>Jalur Pendaftaran</NavLink>
                <NavLink to="/alternatif" className="sidebar-menu-list"><UserPlus/>Alternatif</NavLink>
                <NavLink to="/kriteria" className="sidebar-menu-list"><FileText/>Kriteria</NavLink>
                <NavLink to="/nilai_alternatif" className="sidebar-menu-list"><PieChart/>Nilai Alternatif</NavLink>
              </div>
            )}
            <NavLink to="/hasil" className="sidebar-menu-list"><Award/>Hasil Penilaian</NavLink>
        </div>
        {user && user.role === "admin" &&(
          <div>
            <label className="sidebar-label">ADMIN</label>
            <div className="grid-container">
                <div>
                  <NavLink to="/userlist" className="sidebar-menu-list"><User/>User</NavLink>
                </div>
            </div>
          </div>
        )}
        <label className="sidebar-label">SETTINGS</label>
        <div className="grid-container">
          <button onClick={logout} className="sidebar-btn_logout"><LogOut/>Logout</button>
        </div>
      </div>
    </div>
  )
};

export default Sidebar;
