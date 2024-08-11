import './AddKriteria.css'
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "../../lib/axios";

export default function AddKriteriaForm() {
  const [kriteria, setKriteria] = useState({
    nama_kriteria:'',
    jalur_pendaftaran:'',
    bobot_kriteria:'',
    tipe_data:''
  });
  const [jalur, setjalur] = useState([]);
  const tipe_data = ['Cost', 'Benefit'];

  // const {id} = useParams();
  const navigate = useNavigate();

  const getJalur = async()=>{
    const response = await axios.get('/jalur');
    setjalur(response.data);
  }
  useEffect(()=>{
    getJalur();
  },[]);

const setNamaKriteria = (newValue) => {
  setKriteria({ ...kriteria, nama_kriteria: newValue });
};
const setJalurPendaftaran = (newValue) => {
  setKriteria({ ...kriteria, jalur_pendaftaran: newValue });
};
const setBobot = (newValue) => {
  setKriteria({ ...kriteria, bobot_kriteria: newValue });
};
const setTipeData = (newValue) => {
  setKriteria({ ...kriteria, tipe_data: newValue });
};

const createKriteria = async (e) => {
  e.preventDefault();
  try {
    await axios.post(`/kriteria`,{
      nama_kriteria:kriteria.nama_kriteria,
      jalur_pendaftaran:kriteria.jalur_pendaftaran,
      bobot_kriteria:kriteria.bobot_kriteria,
      tipe_data:kriteria.tipe_data
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
            <label className="label">Jalur Pendaftaran</label>
            <div className="control">
              <div className="select">
                <select value={kriteria.jalur_pendaftaran} onChange={(e) => setJalurPendaftaran(e.target.value)}>
                  <option value="" disabled>--Pilih Jalur Pendaftaran--</option>
                  {jalur.map((item, index) => (
                    <option key={index} value={item.nama_jalur}>
                      {item.nama_jalur}
                    </option>
                  ))}
                </select>
              </div>
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
            <label className="label">Bobot Kriteria (%)</label>
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

          <div className="field">
            <label className="label">Tipe Data (Cost/Benefit)</label>
            <div className="control">
              <div className="select">
                <select value={kriteria.tipe_data} onChange={(e) => setTipeData(e.target.value)}>
                  <option value="" disabled>--Pilih Tipe Data--</option>
                  {tipe_data.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
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

