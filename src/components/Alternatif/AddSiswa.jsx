// import { useForm } from 'react-hook-form';
import './Addsiswa.css';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "../../lib/axios";

export default function Daftar() {
  const [kode_alternatif, setKodeAlternatif] = useState('');
  const [nama_alternatif, setNamaAlternatif] = useState('');
  const [jalur, setJalur] = useState([]);
  const [ambilJalur, setAmbilJalur] = useState([]);
  const navigate = useNavigate();

  const onSubmit = async () => {
    try {
      const response = await axios.post("/alternatif",{
        kode_alternatif:kode_alternatif,
        nama_alternatif:nama_alternatif,
        nama_jalur:jalur
      });
      console.log(response);
      alert("Data Alternatif Berhasil Di Input")
      navigate(`/alternatif`);
    } catch (e) {
      console.log("error dalam submit data :", e.response.msg);
      alert(e.response.data.msg);
    }
  };
  
  useEffect(() => {
    const getJalur = async(data) =>{
      const response = await axios.get("/jalur", data);
      setAmbilJalur(response.data);
  }
    getJalur();
}, []);

  return (
    <div className="Daftar-container">
      <div className="daftar-navbar">
        <h2 className="daftar-judul">Input Data Alternatif</h2>
      </div>
      <form onSubmit={onSubmit}>
      {/* <p>{msg}</p> */}
          <div className="field">
            <label className="label">Kode Alternatif</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={kode_alternatif}
                onChange={(e) => setKodeAlternatif(e.target.value)}
                placeholder="Kode Alternatif"
              ></input>
            </div>
          </div>
          <div className="field">
            <label className="label">Nama Alternatif</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={nama_alternatif}
                onChange={(e) => setNamaAlternatif(e.target.value)}
                placeholder="Nama Alternatif"
              ></input>
            </div>
          </div>
          <div className="field">
            <label className="label">Nama Jalur</label>
            <div className="control">
              <div className="select">
                <select
                  value={jalur}
                  onChange={(e) => setJalur(e.target.value)}
                >
                  <option value="">Pilih Jalur Pendaftaran</option>
                  {ambilJalur.map((item) => (
                    <option key={item.id} value={item.nama_jalur}>
                      {item.nama_jalur}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="btn-field">
            <Link to={`/alternatif`} className="action-btn">
              Kembali
            </Link>
            <button type="submit" className="action-btn">
              Save
            </button>
          </div>
      </form>
      </div>
  );
}

