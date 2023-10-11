import "./Login.css";
import logosmp from "../../image/react.png"
// import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LoginUser, RegisterUser, reset } from "../../features/authSlice";
import {
  User,
  ArrowLeft,
  Mail,
  Key,
  Facebook, Instagram, Globe, Twitter
} from "feather-icons-react/build/IconComponents";

const Login = () => {
  const [toggle, setToggle] = useState(false);

  const tuker = () => {
    setToggle(!toggle);
  };

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (user || isSuccess) {
      navigate("/dashboard");
    }
    dispatch(reset());
  }, [user, isSuccess, dispatch, navigate]);

  const saveUser = async (e) => {
    e.preventDefault();
    dispatch(RegisterUser({ username, email, password, confirmPassword, role}));
    alert("Register Berhasil, Silahkan Login Kembali");
  };
  const Auth = (e) => {
    e.preventDefault();
    dispatch(LoginUser({ email, password }));
  };

  return (
    <div className="body-login">
      <div className="wc-word">
        <h1>
            SELAMAT DATANG di Website PPDB <span> SMPN 1 Cisoka</span>.
        </h1>
        <p>
          Website penerimaan murid baru smpn 1 cisoka yang dibuat untuk
          memudahkan para calon siswa untuk medaftar secara online
        </p>
      </div>
        {/* Bagian Box Form Loginnya */}
        <div className={`wrap ${toggle ? "active" : ""}`}>
          <div className="form-box login">
            {isError && <p className="pesan-error">{message}</p>}
            <h1 className="judul">Login</h1>
            {/* <img className='logo' src={logo} alt=''/> */}
            <form onSubmit={Auth}>
              <div className="input-box">
                <span>
                  <Mail className="icon" />
                </span>
                <input
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autocomplete="off"
                  required
                />
                <label>Email</label>
              </div>
              <div className="input-box">
                <span>
                  <Key className="icon" />
                </span>
                <input
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <label>Password</label>
              </div>
              <div className="remember">
                <label>
                  <input type="checkbox" /> Ingat Saya
                </label>
                <a href="/">Lupa Password</a>
              </div>
              <button type="submit" className="btn-login">
                {isLoading ? "Loading" : "Login"}
              </button>
              <div className="login-register">
                <p>
                  Belum Punya akun?
                  <a href="#regis" className="register-link" onClick={tuker}>
                    {" "}
                    Daftar Sekarang
                  </a>
                </p>
              </div>
            </form>
          </div>
          
          {/* Bagian Register */}
          <div className="form-box register">
            {isError && <p className="pesan-error">{message}</p>}
            <h1 className="judul">Register</h1>
            <form onSubmit={saveUser}>
              <div className="input-box">
                <span>
                  <User className="icon" />
                </span>
                <input
                  name="username"
                  type="text"
                  autocomplete="off"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
                <label>Username</label>
              </div>
              <div className="input-box">
                <span>
                  <Mail className="icon" />
                </span>
                <input
                  name="email"
                  type="email"
                  autocomplete="off"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <label>Email</label>
              </div>
              <div className="input-box">
                <span>
                  <Key className="icon" />
                </span>
                <input
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <label>Password</label>
              </div>
              <div className="input-box">
                <span>
                  <Key className="icon" />
                </span>
                <input
                  name="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <label>Konfirmasi Password</label>
              </div>
              <div className="input-box">
                <input
                  name="status"
                  type="text"
                  value="user"
                  onChange={(e) => setRole(e.target.value)}
                  readOnly
                />
                <label className="label-role">Role</label>
              </div>
              <div className="remember">
                <label>
                  <input type="checkbox" autoComplete="on" required/> Saya setuju sengan
                  Persyaratan dan Ketentuan
                </label>
              </div>
              <button type="submit" className="btn-login">
                {isLoading ? "Loading" : "Register"}
              </button>
              <div className="login-register">
                <p>
                  Sudah Punya akun?
                  <a href="#login" className="login-link" onClick={tuker}>
                    {" "}
                    Login
                  </a>
                </p>
              </div>
            </form>
          </div>
      </div>
    </div>
  );
};

export default Login;
