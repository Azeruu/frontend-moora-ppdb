import './EditKriteria.css'
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from "../../lib/axios";

export default function EditKriteriaForm() {
  const [kriteria, setKriteria] = useState({
    kode_kriteria:'',
    nama_kriteria:'',
    bobot_kriteria:''
  });
  const {id} = useParams();
  const navigate = useNavigate();
  
  useEffect(() => {
    const getKriteriaById = async(data) =>{
      try {
        const response = await axios.get(`/kriteria/${id}`,data);
        setKriteria(response.data);
    } catch (e) {
      console.log("error dalam submit data :", e.response.msg);
    }
    };
    getKriteriaById();
}, [id]);
const setKodeKriteriaBaru = (newValue) => {
  setKriteria({ ...kriteria, kode_kriteria: newValue });
};
const setNamaKriteriaBaru = (newValue) => {
  setKriteria({ ...kriteria, nama_kriteria: newValue });
};
const setBobotBaru = (newValue) => {
  setKriteria({ ...kriteria, bobot_kriteria: newValue });
};

const updateKriteria = async (e) => {
  e.preventDefault();
  try {
    await axios.patch(`/kriteria/${id}`,{
      kode_kriteria:kriteria.kode_kriteria,
      nama_kriteria:kriteria.nama_kriteria,
      bobot_kriteria:kriteria.bobot_kriteria
    });
    alert("Data Kriteria Berhasil Di Update")
    navigate(`/kriteria`);
  } catch (e) {
    console.log("error dalam submit data :", e.response.msg);
    alert(e.response.data.msg);
  }
};

  return (
    <div className="Daftar-container">
      <div className="daftar-navbar">
        <h2 className="daftar-judul">Input Data Kriteria</h2>
      </div>
      <form onSubmit={updateKriteria}>
      {/* <p>{msg}</p> */}
          <div className="field">
            <label className="label">Kode Kriteria</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={kriteria.kode_kriteria}
                onChange={(e) => setKodeKriteriaBaru(e.target.value)}
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
                onChange={(e) => setNamaKriteriaBaru(e.target.value)}
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
                onChange={(e) => setBobotBaru(e.target.value)}
                placeholder="Bobot Kriteria"
              ></input>
            </div>
          </div>
          <div className="btn-field">
            <Link to={`/kriteria`} className="action-btn">
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

