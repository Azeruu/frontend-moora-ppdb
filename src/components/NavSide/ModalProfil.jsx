import React, { useState} from 'react'
import { useNavigate} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Logout, reset } from "../../features/authSlice";
import { User, LogOut, Settings } from 'feather-icons-react/build/IconComponents';
import logo from "../../image/userPng.png";
import "./ModalProfil.css";
import ModalEditProfil from './ModalEditProfil';
import ModalDatauser from './ModalDatauser';

const ModalProfil = ({ isOpen, isClose , isOpen2, isClose2 }) => {
    const [modal, setModal] = useState(false);
    const [modal2, setModal2] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);

    const openModal = () => {
      setModal(true);
    };
    const closeModal = () => {
      setModal(false);
    };
    const openModal2 = () => {
      setModal2(true);
    };
    const closeModal2 = () => {
      setModal2(false);
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
              <div className="profile-picture">
                <img className="foto-user" src={logo} alt="foto user" />
              </div>
              <div className="user-info">
                <h4>Username : {user && Huruf(user.username)}</h4>
                <h4>Role : {user && Huruf(user.role)}</h4>
                <h4>Email : {user && Huruf(user.email)}</h4>
              </div>
            </div>
              <div className="modal-user-settings"><button className='modal-button-user' onClick={openModal2}><User className='modal-user-icon'/>User</button></div>
              <div className="modal-user-settings"><button className='modal-button-setting' onClick={openModal}><Settings className='modal-user-icon'/>Settings</button></div>
              <button className='modal-btn-logout' onClick={logout}><LogOut/> Logout</button>
          </div>
        </div>
        <ModalEditProfil isOpen={modal} isClose={closeModal}/>
        <ModalDatauser isOpen2={modal2} isClose2={closeModal2}/>
      </div>
    )
  )
}

export default ModalProfil