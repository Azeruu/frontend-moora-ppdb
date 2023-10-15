import React from 'react'
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Logout, reset } from "../../features/authSlice";
import { User, LogOut, Settings } from 'feather-icons-react/build/IconComponents';
import logo from "../../image/react.png";
import "./ModalProfil.css"

const ModalProfil = ({ isOpen, isClose }) => {
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
    isOpen && (
      <div className="modal-overlay">
        <div className="modal">
          <div className="modal-header">
            <h2>Profil Pengguna</h2>
            <button className="modal-close" onClick={isClose}>
              &times;
            </button>
          </div>
          <div className="modal-content">
            <div className="profil-detail">
              <img className="foto-user" src={logo} alt="foto user"></img>
              <h4>{user && Huruf(user.username)}</h4>
              <h4>{user && Huruf(user.role)}</h4>
              <h4>{user && Huruf(user.email)}</h4>
            </div>
            <a href='/akun'><User/> User</a>
            <a href='/akun'><Settings/> Settings</a>
            <button onClick={logout}><LogOut/> Logout</button>
          </div>
          <div className="modal-footer">
          </div>
        </div>
      </div>
    )
  )
}

export default ModalProfil