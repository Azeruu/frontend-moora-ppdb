import { useState, useEffect } from "react";
import "./EditSiswa.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getMe } from "../../features/authSlice";

const Daftar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/login");
    }
    dispatch(getMe());
  }, [isError, navigate]);

  const [nama_lengkap, setNama] = useState("");
  const [tempat_lahir, setTtl] = useState("");
  const [tgl_lahir, setTgl] = useState("");
  const [alamat, setAlamat] = useState("");
  const [kota, setKota] = useState("");
  const [jenis_kelamin, setJk] = useState("Laki-Laki");
  const [no_telp, setTelp] = useState("");
  const [email, setEmail] = useState("");
  const [nama_wali, setWali] = useState("");
  const [asal_sekolah, setAsal] = useState("");
  const [agama, setAgama] = useState("");

  const saveSiswa = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/data_siswa", {
        nama_lengkap,
        tempat_lahir,
        tgl_lahir,
        alamat,
        kota,
        jenis_kelamin,
        no_telp,
        email,
        nama_wali,
        asal_sekolah,
        agama,
      });
      navigate("/pendaftaran");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="data">
      <h2>Formulir Data Diri</h2>
      <div className="row">
        <form onSubmit={saveSiswa}>
          <div className="form-group">
            <label>Nama Lengkap</label>
            <input
              type="text"
              placeholder="Nama Lengkap"
              value={nama_lengkap}
              onChange={(e) => setNama(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Tempat Lahir</label>
            <input
              type="text"
              placeholder="Tempat Lahir"
              value={tempat_lahir}
              onChange={(e) => setTtl(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Tanggal Lahir</label>
            <input
              type="date"
              placeholder="Tanggal Lahir"
              value={tgl_lahir}
              onChange={(e) => setTgl(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Alamat</label>
            <input
              type="text"
              placeholder="Alamat"
              value={alamat}
              onChange={(e) => setAlamat(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Kota/Kabupaten </label>
            <input
              type="text"
              placeholder="Kota/kabupaten"
              value={kota}
              onChange={(e) => setKota(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Jenis Kelamin</label>
            <div className="jk">
              <select
                className="option"
                value={jenis_kelamin}
                onChange={(e) => setJk(e.target.value)}
              >
                <option value="Laki-Laki">Laki - Laki</option>
                <option value="Perempuan">Perempuan</option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <label>No Hp/Telephone</label>
            <input
              type="text"
              placeholder="No Handphone"
              value={no_telp}
              onChange={(e) => setTelp(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="text"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Nama Orang Tua Wali</label>
            <input
              type="text"
              placeholder="Nama Orang Tua Wali"
              value={nama_wali}
              onChange={(e) => setWali(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Asal Sekolah</label>
            <input
              type="text"
              placeholder="Asal Sekolah"
              value={asal_sekolah}
              onChange={(e) => setAsal(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Agama</label>
            <input
              type="text"
              placeholder="Agama"
              value={agama}
              onChange={(e) => setAgama(e.target.value)}
            />
          </div>
          <div className="btn_action">
            <Link to="/pendaftaran" className="btn-back">
              Kembali
            </Link>
            <button className="btn-daftar" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Daftar;
