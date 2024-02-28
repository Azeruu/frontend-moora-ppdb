import './EditSiswa.css'
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from "../../lib/axios";

export default function EditSiswaForm() {
  const [alternatif, setAlternatif] = useState({
    kode_alternatif:'',
    nama_alternatif:'',
    nama_jalur:''
  });
  const [ambilJalur, setAmbilJalur] = useState([]);
  const {id} = useParams();
  const navigate = useNavigate();
  
  useEffect(() => {
    const getAlternatifById = async(data) =>{
      try {
        const response = await axios.get(`/alternatif/${id}`,data);
        setAlternatif(response.data);
    } catch (e) {
      console.log("error dalam submit data :", e.response.msg);
    }
    };
    const getJalur = async(data) =>{
      const response = await axios.get("/jalur", data);
      setAmbilJalur(response.data);
    };
    getAlternatifById();
    getJalur();
}, [id]);
const setKodeAlternatifBaru = (newValue) => {
  setAlternatif({ ...alternatif, kode_alternatif: newValue });
};
const setNamaAlternatifBaru = (newValue) => {
  setAlternatif({ ...alternatif, nama_alternatif: newValue });
};
const setJalurBaru = (newValue) => {
  setAlternatif({ ...alternatif, nama_jalur: newValue });
};

const updateAlternatif = async (e) => {
  e.preventDefault();
  try {
    await axios.patch(`/alternatif/${id}`,{
      kode_alternatif:alternatif.kode_alternatif,
      nama_alternatif:alternatif.nama_alternatif,
      nama_jalur:alternatif.nama_jalur
    });
    alert("Data Alternatif Berhasil Di Update")
    navigate(`/alternatif`);
  } catch (e) {
    console.log("error dalam submit data :", e.response.msg);
    alert(e.response.data.msg);
  }
};

  return (
    <div className="Daftar-container">
      <div className="daftar-navbar">
        <h2 className="daftar-judul">Input Data Alternatif</h2>
      </div>
      <form onSubmit={updateAlternatif}>
      {/* <p>{msg}</p> */}
          <div className="field">
            <label className="label">Kode Alternatif</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={alternatif.kode_alternatif}
                onChange={(e) => setKodeAlternatifBaru(e.target.value)}
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
                value={alternatif.nama_alternatif}
                onChange={(e) => setNamaAlternatifBaru(e.target.value)}
                placeholder="Nama Alternatif"
              ></input>
            </div>
          </div>
          <div className="field">
            <label className="label">Nama Jalur</label>
            <div className="control">
              <div className="select">
                <select
                  value={alternatif.jalur}
                  onChange={(e) => setJalurBaru(e.target.value)}
                >
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
};

