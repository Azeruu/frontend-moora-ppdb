import './AddKriteria.css'
import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from "../../lib/axios";

export default function AddKriteriaForm() {
  const [kriteria, setKriteria] = useState({
    kode_kriteria:'',
    nama_kriteria:'',
    bobot_kriteria:''
  });
  const {id} = useParams();
  const navigate = useNavigate();
  

const setKodeKriteria = (newValue) => {
  setKriteria({ ...kriteria, kode_kriteria: newValue });
};
const setNamaKriteria = (newValue) => {
  setKriteria({ ...kriteria, nama_kriteria: newValue });
};
const setBobot = (newValue) => {
  setKriteria({ ...kriteria, bobot_kriteria: newValue });
};

const createKriteria = async (e) => {
  e.preventDefault();
  try {
    await axios.post(`/kriteria`,{
      kode_kriteria:kriteria.kode_kriteria,
      nama_kriteria:kriteria.nama_kriteria,
      bobot_kriteria:kriteria.bobot_kriteria
    });
    alert("Data Kriteria Berhasil Di Tambah")
    navigate(`/kriteria`);
  } catch (e) {
    console.log("error dalam submit data :", e.response.msg);
    alert(e.response.data.msg);
  }
};

  return (
    <div className="add-kriteria-column">
        <h2 className="kriteria-judul">Tambah Kriteria</h2>
      <form onSubmit={createKriteria}>
      {/* <p>{msg}</p> */}
          <div className="field">
            <label className="label">Kode Kriteria</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={kriteria.kode_kriteria}
                onChange={(e) => setKodeKriteria(e.target.value)}
                placeholder="Kode Kriteria"
              ></input>
            </div>
          </div>
          <div className="field">
            <label className="label">Nama Kriteria</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={kriteria.nama_kriteria}
                onChange={(e) => setNamaKriteria(e.target.value)}
                placeholder="Nama Kriteria"
              ></input>
            </div>
          </div>
          <div className="field">
            <label className="label">Bobot Kriteria</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={kriteria.bobot_kriteria}
                onChange={(e) => setBobot(e.target.value)}
                placeholder="Bobot Kriteria"
              ></input>
            </div>
          </div>
          <div className="btn-field">
            <Link to={`/kriteria`} className="action-btn">
              Kembali
            </Link>
            <button type="submit" className="action-btn">
              Simpan
            </button>
          </div>
      </form>
      </div>
    );
};

