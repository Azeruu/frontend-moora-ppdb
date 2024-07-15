import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { User, Mail, Lock } from "feather-icons-react/build/IconComponents";
import "./ModalDatauser.css";
import axios from "../../lib/axios";
import logo from "../../image/userPng.png";

const ModalDatauser = ({ isOpen2, isClose2 }) => {
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

    return (
        isOpen2 && (
        <div className="modal-data-overlay">
            <div className="modal-data">
            {/* START Header */}
            <div className="modal-data-header">
                <h1>User Details</h1>
                <button className="modal-close" onClick={isClose2}>
                &times;
                </button>
            </div>
            {/* END Header */}

            {/* START konten */}
            <div className="modal-data-content">
                <div className="modal-data-container">
                    <div className="profile-picture2">
                        <img className="foto-user2" src={logo} alt="foto user" />
                    </div>
                    <div className="field-data">
                        <User />
                        <label className="label-data">Username</label>
                        <p className="user-detail">{user.username}</p>
                    </div>
                    <div className="field-data">
                        <Mail />
                        <label className="label-data">Email</label>
                        <div className="control">
                        <p className="user-detail">{user.email}</p>
                        </div>
                    </div>
                    <div className="field-data">
                        <User />
                        <label className="label-data">Role</label>
                        <div className="control">
                        <p className="user-detail">{user.role}</p>
                        </div>
                    </div>
                </div>
            </div>
            {/* END Konten */}
            </div>
        </div>
        )
    );
};

export default ModalDatauser;
