import './AddHasil.css'
import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from "../../lib/axios";

export default function AddHasilForm() {
  const [hasil, setHasil] = useState({
    nama_alternatif:'',
    jalur_pendaftaran:'',
    nilai:''
  });
  const {id} = useParams();
  const navigate = useNavigate();
  

const setAlternatif = (newValue) => {
  setHasil({ ...hasil, nama_alternatif: newValue });
};
const setJalurPendaftaran = (newValue) => {
  setHasil({ ...hasil, jalur_pendaftaran: newValue });
};
const setNilai = (newValue) => {
  setHasil({ ...hasil, nilai: newValue });
};

const createHasil = async (e) => {
  e.preventDefault();
  try {
    await axios.post(`/hasil`,{
      nama_alternatif:hasil.nama_alternatif,
      jalur_pendaftaran:hasil.jalur_pendaftaran,
      nilai:hasil.nilai
    });
    alert("Data Hasil Berhasil Di Tambah")
    navigate(`/hasil`);
  } catch (e) {
    console.log("error dalam submit data :", e.response.msg);
    alert(e.response.data.msg);
  }
};

  return (
    <div className="Daftar-container">
      <div className="daftar-navbar">
        <h2 className="daftar-judul">Input Data Hasil</h2>
      </div>
      <form onSubmit={createHasil}>
      {/* <p>{msg}</p> */}
          <div className="field">
            <label className="label">Nama Alternatif</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={hasil.nama_alternatif}
                onChange={(e) => setAlternatif(e.target.value)}
                placeholder="Nama Alternatif"
              ></input>
            </div>
          </div>
          <div className="field">
            <label className="label">Jalur Pendaftaran</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={hasil.jalur_pendaftaran}
                onChange={(e) => setJalurPendaftaran(e.target.value)}
                placeholder="Jalur Pendaftaran"
              ></input>
            </div>
          </div>
          <div className="field">
            <label className="label">Nilai</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={hasil.nilai}
                onChange={(e) => setNilai(e.target.value)}
                placeholder="Nilai"
              ></input>
            </div>
          </div>
          <div className="btn-field">
            <Link to={`/hasil`} className="action-btn">
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

