import "./Sidebar.css"
import { NavLink, useNavigate} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Logout, reset } from "../../features/authSlice";
import {Home, FileText, UserPlus, Award, User, LogOut, PieChart, PenTool, Map, File} from "feather-icons-react/build/IconComponents";
import logo from "../../image/profile1.png";

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
            {user && user.role === "admin" &&(
              <div>
                <NavLink to="/aspek" className="sidebar-menu-list"><PenTool/>Aspek Penilaian</NavLink>
                <NavLink to="/jalur" className="sidebar-menu-list"><Map/>Jalur Penerimaan</NavLink>
              </div>
            )}
            <NavLink to="/siswalist" className="sidebar-menu-list"><UserPlus/>Daftar</NavLink>
            <NavLink to="/nilailist" className="sidebar-menu-list"><FileText/>Nilai</NavLink>
            <NavLink to="/rekapnilai" className="sidebar-menu-list"><PieChart/>Rekap Nilai</NavLink>
            <NavLink to="/hasil" className="sidebar-menu-list"><Award/>Hasil</NavLink>
            <NavLink to="/bukti" className="sidebar-menu-list"><File/>Berkas Bukti</NavLink>
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
