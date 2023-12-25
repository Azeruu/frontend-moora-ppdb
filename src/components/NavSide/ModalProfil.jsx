import React,{useEffect, useState} from 'react'
import { useNavigate, useParams} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Logout, reset } from "../../features/authSlice";
import { User, LogOut, Settings } from 'feather-icons-react/build/IconComponents';
import logo from "../../image/react.png";
import "./ModalProfil.css"
import Modal from 'react-modal';
import axios from "../../lib/axios";

const ModalProfil = ({ isOpen, isClose }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [msg, setMsg] = useState("");
    const { id } = useParams();
    const { user } = useSelector((state) => state.auth);
    const [users, setUsers] = useState({
      username:'',
      email:'',
      password:'',
      confirmPassword:'',
      role:''
    });
    const [modalIsOpen, setModalIsOpen] = useState(false);

    useEffect(() => {
      const getUserById = async () => {
        try {
          const response = await axios.get(`/users/${id}`);
          setUsers(response.data);
        } catch (error) {
          if (error.response) {
            setMsg(error.response.data.msg);
          }
        }
      };
      getUserById();
    }, [id]);
    //UPDATE USER
    const updateUser = async (e) => {
      e.preventDefault();
      try {
        await axios.patch(`/users/${id}`, {
          username: user.username,
          email: user.email,
          password: user.password,
          confirmPassword: user.confirmPassword,
          role: user.role,
        });
        navigate("/userlist");
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };
// START open close Modal
    const openModal = () => {
      setModalIsOpen(true);
    }
    const closeModal = () => {
      setModalIsOpen(false);
    }
// END open close modal
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
              <div className="modal-user-settings"><button onClick={openModal}><Settings className='modal-user-icon'/> Settings</button></div>
              <button className='modal-btn-logout' onClick={logout}><LogOut/> Logout</button>
          </div>

          {/* Modal */}
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            contentLabel="Edit User Modal"
          >
            <div>
              <h2> User Setting</h2>
              <form onSubmit={updateUser}>
                {/* ... (code form lainnya) */}
                <button type="button" onClick={closeModal}>Close Modal</button>
              </form>
            </div>
          </Modal>

          {/* Footer */}
          <div className="modal-footer">
          </div>
        </div>
      </div>
    )
  )
}

export default ModalProfil