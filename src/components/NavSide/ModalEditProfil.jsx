import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Logout, reset } from "../../features/authSlice";
import {
  User,
  Mail,
  Lock,
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
            <h1>Edit User</h1>
            <button className="modal-close" onClick={isClose}>
              &times;
            </button>
          </div>
          {/* END Header */}

          {/* START konten */}
          <div className="modal-edit-content">
              <div className="modal-edit-container">
                <form onSubmit={updateUser}>
                  <p>{msg}</p>
                  <div className="field-edit">
                  <User/>
                    <label className="label-edit">Username</label>
                    <div className="control">
                      <input
                        type="text"
                        className="input-edit"
                        value={user.username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Username"
                      ></input>
                    </div>
                  </div>
                  <div className="field-edit">
                    <Mail/>
                    <label className="label-edit">Email</label>
                    <div className="control">
                      <input
                        type="email"
                        className="input-edit"
                        value={user.email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                      ></input>
                    </div>
                  </div>
                  <div className="field-edit">
                    <Lock/>
                    <label className="label-edit">Password</label>
                    <div className="control">
                      <input
                        type="text"
                        className="input-edit"
                        value={user.password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                      ></input>
                    </div>
                  </div>
                  <div className="field-edit">
                  <Lock/>
                    <label className="label-edit">Confirm Password</label>
                    <div className="control">
                      <input
                        type="text"
                        className="input-edit"
                        value={user.confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm Password"
                      ></input>
                    </div>
                  </div>
                  <div className="field-edit">
                    <User/>
                    <label className="label-edit">Role</label>
                    <div className="control">
                      <div className="select-edit">
                        <select
                          className="option-edit"
                          value={user.role}
                          onChange={(e) => setRole(e.target.value)}
                          disabled
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
          {/* END Konten */}
        </div>
      </div>
    )
  );
};

export default ModalEditProfil;
