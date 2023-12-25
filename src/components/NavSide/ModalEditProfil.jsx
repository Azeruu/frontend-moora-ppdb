import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Logout, reset } from "../../features/authSlice";
import {
  User,
  LogOut,
  Settings,
} from "feather-icons-react/build/IconComponents";
import "./ModalEditProfil.css";
import axios from "../../lib/axios";

const ModalEditProfil = ({ isOpen, isClose }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { user } = useSelector((state) => state.auth);
  const [msg, setMsg] = useState("");
  const [users, setUsers] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });

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

  // Start UPDATE USER
  const updateUser = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`/users/${id}`, {
        username: users.username,
        email: users.email,
        password: users.password,
        confirmPassword: users.confirmPassword,
        role: users.role,
      });
      // navigate("/userlist");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };
// END UPDATE USER
  const Huruf = (user) => {
    return user.charAt(0).toUpperCase() + user.slice(1);
  };
  const setUsername = (newValue) => {
    setUsers({ ...users, username: newValue });
  };
  const setEmail = (newValue) => {
    setUsers({ ...users, email: newValue });
  };
  const setPassword = (newValue) => {
    setUsers({ ...users, password: newValue });
  };
  const setConfirmPassword = (newValue) => {
    setUsers({ ...users, confirmPassword: newValue });
  };
  const setRole = (newValue) => {
    setUsers({ ...users, role: newValue });
  };

  return (
    isOpen && (
      <div className="modal-edit-overlay">
        <div className="modal-edit">
          {/* START Header */}
          <div className="modal-edit-header">
            <h2>Edit User</h2>
            <button className="modal-close" onClick={isClose}>
              &times;
            </button>
          </div>
          {/* END Header */}

          {/* START konten */}
          <div className="modal-edit-content">
            <div className="edit-user-column">
              <div className="form-column">
                <h1 className="edit-user-judul">Edit User</h1>
                <form onSubmit={updateUser}>
                  <p>{msg}</p>
                  <div className="field">
                    <label className="label">Username</label>
                    <div className="control">
                      <input
                        type="text"
                        className="input"
                        value={user.username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Username"
                      ></input>
                    </div>
                  </div>
                  <div className="field">
                    <label className="label">Email</label>
                    <div className="control">
                      <input
                        type="email"
                        className="input"
                        value={user.email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                      ></input>
                    </div>
                  </div>
                  <div className="field">
                    <label className="label">Password</label>
                    <div className="control">
                      <input
                        type="text"
                        className="input"
                        value={user.password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                      ></input>
                    </div>
                  </div>
                  <div className="field">
                    <label className="label">Confirm Password</label>
                    <div className="control">
                      <input
                        type="text"
                        className="input"
                        value={user.confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm Password"
                      ></input>
                    </div>
                  </div>
                  <div className="field">
                    <label className="label">Role</label>
                    <div className="control">
                      <div className="select">
                        <select
                          className="option"
                          value={user.role}
                          onChange={(e) => setRole(e.target.value)}
                        >
                          <option value="admin">Admin</option>
                          <option value="user">User</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="btn-field">
                    <button type="submit" className="action-btn">
                      Update
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          {/* END Konten */}
        </div>
      </div>
    )
  );
};

export default ModalEditProfil;
