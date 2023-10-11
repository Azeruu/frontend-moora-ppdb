import { useState, useEffect } from "react";
import "./Addsiswa.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getMe } from "../../features/authSlice";
import ArrowLeft from "feather-icons-react/build/IconComponents/ArrowLeft";

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

  const [NISN, setNISN] = useState("");
  const [nama_lengkap, setNama] = useState("");
  const [jenis_kelamin, setJk] = useState("Laki-Laki");
  const [tempat_lahir, setTtl] = useState("");
  const [tgl_lahir, setTgl] = useState("");
  const [agama, setAgama] = useState("");
  const [alamat, setAlamat] = useState("");
  const [no_telp, setTelp] = useState("");
  const [email, setEmail] = useState("");
  const [asal_sekolah, setAsal] = useState("");
  const [no_STTB, setSttb] = useState("");
  const [no_SKHUN, setSkhun] = useState("");
  const [tahun_ijazah, setIThIjazah] = useState("");
  const [nilai_UAS, setNilaiUas] = useState("");
  const [jarak, setJarak] = useState("");

  const saveSiswa = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/data_siswa", {
        NISN,
        nama_lengkap,
        jenis_kelamin,
        tempat_lahir,
        tgl_lahir,
        agama,
        alamat,
        no_telp,
        email,
        asal_sekolah,
        no_STTB,
        no_SKHUN,
        tahun_ijazah,
        nilai_UAS,
        jarak,
      });
      navigate("/pendaftaran");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="data">
      <div className="nav2">
        <Link to="/pendaftaran" className="btn-back-1">
          <ArrowLeft />
        </Link>
        <p className="proccess1">
          {" "}
          1<p className="proccess2"> 1</p>
        </p>
      </div>

      {/* Formulir Form */}
      <h2>Formulir Data Diri</h2>
      <div className="row">
        <form onSubmit={saveSiswa}>
          <div className="form-group">
            <label>NISN</label>
            <input
              type="text"
              placeholder="NISN ( Nomor Induk Siswa Nasional )"
              value={NISN}
              onChange={(e) => setNISN(e.target.value)}
            />
          </div>
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
            <label>Agama</label>
            <input
              type="text"
              placeholder="Agama"
              value={agama}
              onChange={(e) => setAgama(e.target.value)}
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
            <label>Asal Sekolah</label>
            <input
              type="text"
              placeholder="Asal Sekolah"
              value={asal_sekolah}
              onChange={(e) => setAsal(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Surat Tanda Tamat Belajar</label>
            <input
              type="text"
              placeholder="STTB"
              value={no_STTB}
              onChange={(e) => setSttb(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Surat Keterangan Hasil Ujian Nasional</label>
            <input
              type="text"
              placeholder="SKHUN"
              value={no_SKHUN}
              onChange={(e) => setSkhun(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Tahun Ijazah</label>
            <input
              type="text"
              placeholder="Tahun Ijazah"
              value={tahun_ijazah}
              onChange={(e) => setIThIjazah(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Nilai Ujian Akhir Sekolah " UAS "</label>
            <input
              type="text"
              placeholder="Nilai UAS"
              value={nilai_UAS}
              onChange={(e) => setNilaiUas(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Jarak Rumah ke Sekolah "KM"</label>
            <input
              type="text"
              placeholder="Jarak Rumah ke Sekolah"
              value={jarak}
              onChange={(e) => setJarak(e.target.value)}
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
      {/* END Formulir Form */}
    </div>
  );
};

export default Daftar;
