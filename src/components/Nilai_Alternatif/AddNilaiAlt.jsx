// import { useForm } from 'react-hook-form';
import './AddNilaiAlt.css';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "../../lib/axios";

export default function Daftar() {
  const [alternatif, setAlternatif] = useState('');
  const [kriteria, setKriteria] = useState('');
  let [nilai_real, setNilaiReal] = useState('');
  const [existingData, setExistingData] = useState([]);
  const [ambilAlt, setAmbilAlt] = useState([]);
  const [ambilKriteria, setAmbilKriteria] = useState([]);
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      // Periksa apakah nama_alternatif dan nama_kriteria sudah ada
      const isDataExist = existingData.some(
        (data) =>
          data.nama_alternatif === alternatif && data.nama_kriteria === kriteria
      );
      if (isDataExist) {
        alert("Data Alternatif dengan Kriteria Tersbut Sudah Ada! Mohon di cek Kembali");
        navigate(`/nilai_alternatif`);
        return;
      }
        let fuzzyValue, keteranganValue;
        if (kriteria === "Rata - Rata Nilai Rapot") {
          if (nilai_real <= 70) {
              fuzzyValue = 1;
              keteranganValue = "Kurang Baik";
          } else if (nilai_real > 70 && nilai_real <= 80) {
              fuzzyValue = 2;
              keteranganValue = "Cukup";
          } else if (nilai_real > 80 && nilai_real <= 90) {
              fuzzyValue = 3;
              keteranganValue = "Baik";
          } else if (nilai_real > 90) {
              fuzzyValue = 4;
              keteranganValue = "Sangat Baik";
          }
      } else if (kriteria === "Usia") {
        if (nilai_real <= 10) {
          fuzzyValue = 1;
          keteranganValue = "Kurang Baik";
      } else if (nilai_real = 11) {
          fuzzyValue = 2;
          keteranganValue = "Cukup";
      } else if (nilai_real = 12) {
          fuzzyValue = 3;
          keteranganValue = "Baik";
      } else if (nilai_real = 13) {
          fuzzyValue = 4;
          keteranganValue = "Sangat Baik";
      }
      } else if (kriteria === "Jarak") {
        if (nilai_real > 2000) {
          fuzzyValue = 1;
          keteranganValue = "Kurang Baik";
      } else if (nilai_real > 1000 && nilai_real <= 2000) {
          fuzzyValue = 2;
          keteranganValue = "Cukup";
      } else if (nilai_real > 500 && nilai_real <= 1000) {
          fuzzyValue = 3;
          keteranganValue = "Baik";
      } else if (nilai_real < 500) {
          fuzzyValue = 4;
          keteranganValue = "Sangat Baik";
      }
      }
      const response = await axios.post("/nilai_alternatif",{
        nama_alternatif:alternatif,
        nama_kriteria:kriteria,
        nilai_real:nilai_real,
        nilai_fuzzy:fuzzyValue,
        keterangan:keteranganValue
      });
      console.log(response);
      alert("Data Alternatif Berhasil Di Input")
      navigate(`/nilai_alternatif`);
    } catch (e) {
      console.log("error dalam submit data :", e.response.msg);
      alert(e.response.data.msg);
    }
  };
  const getAlternatif = async(data) =>{
    const response = await axios.get("/alternatif", data);
    setAmbilAlt(response.data);
  }
  const getKriteria = async(data) =>{
    const response = await axios.get("/kriteria", data);
    setAmbilKriteria(response.data);
  }
  const getNilaiAlternatif = async(data)=>{
    const response = await axios.get("/nilai_alternatif", data);
    setExistingData(response.data);
  }
  useEffect(() => {
    getNilaiAlternatif();
    getAlternatif();
    getKriteria();
}, []);

  return (
    <div className="Daftar-container">
      <div className="daftar-navbar">
        <h2 className="daftar-judul">Input Data Alternatif</h2>
      </div>
      <form onSubmit={onSubmit}>
      {/* <p>{msg}</p> */}
      <div className="field">
            <label className="label">Nama Alternatif ( Siswa )</label>
            <div className="control">
              <div className="select">
                <select
                  value={alternatif}
                  onChange={(e) => setAlternatif(e.target.value)}
                >
                  <option value="">Pilih Alternatif</option>
                  {ambilAlt.map((item) => (
                    <option key={item.id} value={item.nama_alternatif}>
                      {item.nama_alternatif}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="field">
            <label className="label">Nama Kriteria</label>
            <div className="control">
              <div className="select">
                <select
                  value={kriteria}
                  onChange={(e) => setKriteria(e.target.value)}
                >
                  <option value="">Pilih Kriteria</option>
                  {ambilKriteria.map((item) => (
                    <option key={item.id} value={item.nama_kriteria}>
                      {item.nama_kriteria}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="field">
            <label className="label">Nilai Real</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={nilai_real}
                onChange={(e) => setNilaiReal(e.target.value)}
                placeholder="Kode Alternatif"
              ></input>
            </div>
          </div>
          
          <div className="btn-field">
            <Link to={`/nilai_alternatif`} className="action-btn">
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

