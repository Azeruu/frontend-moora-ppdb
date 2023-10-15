import "./Sidebar.css"
import { Link, useNavigate} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Logout, reset } from "../../features/authSlice";
import {Home, FileText, UserPlus, Award, User, LogOut} from "feather-icons-react/build/IconComponents";
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
            <Link to="/dashboard" className="sidebar-menu-list" ><Home/>Beranda</Link>
            {user && user.role === "admin" &&(
              <div>
                <Link to="/aspek" className="sidebar-menu-list"><FileText/>Aspek Penilaian</Link>
                <Link to="/jalur" className="sidebar-menu-list"><FileText/>Jalur Penerimaan</Link>
              </div>
            )}
            <Link to="/pendaftaran" className="sidebar-menu-list"><UserPlus/>Daftar</Link>
            <Link to="/hasil" className="sidebar-menu-list"><Award/>Hasil</Link>
        </div>
        {user && user.role === "admin" &&(
          <div>
            <label className="sidebar-label">ADMIN</label>
            <div className="grid-container">
                <div>
                  <Link to="/userlist" className="sidebar-menu-list"><User/>User</Link>
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
