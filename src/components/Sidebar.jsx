import "./css/Sidebar.css"
import { Link, useNavigate} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Logout, reset } from "../features/authSlice";
import Home from "feather-icons-react/build/IconComponents/Home";
import FileText from "feather-icons-react/build/IconComponents/FileText";
import UserPlus from "feather-icons-react/build/IconComponents/UserPlus";
import Award from "feather-icons-react/build/IconComponents/Award";
import User from "feather-icons-react/build/IconComponents/User";
import LogOut from "feather-icons-react/build/IconComponents/LogOut";

const DashboardMenu = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {user} = useSelector((state) => state.auth);

  const logout = () =>{
    dispatch(Logout());
    dispatch(reset());
    navigate("/login")
  }

  return(
    <div className="dbs">
      <div className="dashboard-menu">
          <div className="menu-content">
            <label className="label-general">General</label>
              <Link to="/dashboard" className="menu-list" ><Home/>Beranda</Link>
              <Link to="/aspek" className="menu-list"><FileText/>Aspek Penilaian</Link>
              <Link to="/pendaftaran" className="menu-list"><UserPlus/>Daftar</Link>
              <Link to="/hasil" className="menu-list"><Award/>Hasil</Link>
              {user && user.role === "admin" &&(
                <div>
                  <label >Admin</label>
                  <Link to="/userlist" className="menu-list-user"><User/>User</Link>
                </div>
              )}
            <label>Settings</label>
              <button onClick={logout} className="btn_logout"><LogOut/>Logout</button>
          </div>
      </div>
    </div>
  )
};

export default DashboardMenu;
