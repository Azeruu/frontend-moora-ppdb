import React, { useState} from 'react'
import { useNavigate} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Logout, reset } from "../../features/authSlice";
import { User, LogOut, Settings } from 'feather-icons-react/build/IconComponents';
import logo from "../../image/react.png";
import "./ModalProfil.css";
import ModalEditProfil from './ModalEditProfil';

const ModalProfil = ({ isOpen, isClose }) => {
    const [modal, setModal] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);

    const openModal = () => {
      setModal(true);
    };
    const closeModal = () => {
      setModal(false);
    };

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
          {/* Header */}
          <div className="modal-header">
            <h2>Profil Pengguna</h2>
            <button className="modal-close" onClick={isClose}>
              &times;
            </button>
          </div>
          {/* konten */}
          <div className="modal-content">
            <div className="profil-detail">
              <div>
                <img className="foto-user" src={logo} alt="foto user"></img>
              </div>
              <div>
                <h4>{user && Huruf(user.username)}</h4>
                <h4>{user && Huruf(user.role)}</h4>
                <h4>{user && Huruf(user.email)}</h4>
              </div>
            </div>
              <div className="modal-user-settings"><a href='/akun'><User className='modal-user-icon'/> User</a></div>
              <div className="modal-user-settings"><button className='modal-button-setting' onClick={openModal}><Settings className='modal-user-icon'/>Settings</button></div>
              <button className='modal-btn-logout' onClick={logout}><LogOut/> Logout</button>
          </div>
        </div>
        <ModalEditProfil isOpen={modal} isClose={closeModal}/>
      </div>
    )
  )
}

export default ModalProfil