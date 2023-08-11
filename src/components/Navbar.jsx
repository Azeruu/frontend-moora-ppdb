import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Logout, reset } from "../features/authSlice";
import User from "feather-icons-react/build/IconComponents/User";
import Settings from "feather-icons-react/build/IconComponents/Settings";
import LogOut from "feather-icons-react/build/IconComponents/LogOut";
import "./css/Navbar.css";
import logo from "../image/react.png";

// import logo from "./react.png";
const Navbar = () => {
  const [option, setOption] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const logout = () => {
    dispatch(Logout());
    dispatch(reset());
    navigate("/login");
  };
  const Huruf = (user) => {
    return user.charAt(0).toUpperCase() + user.slice(1);
  }
  return (
    <div className="db-Navbar">
      <div className="dbs-header">
          <div className="menu-btn">Logo</div>
            <div className="user-btn" 
               onMouseEnter={() => setOption(true)}
               onMouseLeave={() => setOption(false)}
            >
              <User/>
            </div>
          <div className={`user-menu ${option ? 'ada' : ''}`}
              onMouseEnter={() => setOption(true)}
              onMouseLeave={() => setOption(false)}
          >
            <div className="user-content" >
              <div className="foto-user-container">
                <img className="foto-user" src={logo} alt="foto user"></img>
              </div>
              <h3>{user && Huruf(user.username)}</h3>
              <a href='facebook.com'><User/> User</a>
              <a href='facebook.com'><Settings/> Settings</a>
              <button onClick={logout}><LogOut/> Logout</button>
            </div>
          </div>   
        </div>
    </div>
  ); 
}

export default Navbar;
