import './EditNilaiAlt.css'
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from "../../lib/axios";

export default function EditNilaiAlt() {
  const [nilai_alternatif, setNilaiAlternatif] = useState({
    nama_alternatif:'',
    nama_kriteria:'',
    nilai_real:''
  });
  const [ambilNamaAlt, setAmbilNamaAlt] = useState([]);
  const [ambilNamaKriteria, setAmbilNamaKriteria] = useState([]);
  const {id} = useParams();
  const navigate = useNavigate();
  
  const getAlternatif = async(data) =>{
    const response = await axios.get("/alternatif", data);
    setAmbilNamaAlt(response.data);
  };
  const getKriteria = async(data) =>{
    const response = await axios.get("/kriteria", data);
    setAmbilNamaKriteria(response.data);
  };
  
  useEffect(() => {
    const getNilaiAlternatifById = async(data) =>{
      try {
        const response = await axios.get(`/nilai_alternatif/${id}`,data);
        console.log(response.data);
        setNilaiAlternatif(response.data);
    } catch (e) {
      console.log("error dalam mengambil data :", e.response.msg);
    }
    };
    getNilaiAlternatifById();
    getAlternatif();
    getKriteria();
}, [id]);

const setNamaAlternatifBaru = (newValue) => {
  setNilaiAlternatif({ ...nilai_alternatif, nama_alternatif: newValue });
};
const setNamaKriteriaBaru = (newValue) => {
  setNilaiAlternatif({ ...nilai_alternatif, nama_kriteria: newValue });
};
const setNilaiBaru = (newValue) => {
  setNilaiAlternatif({ ...nilai_alternatif, nilai_real: newValue });
};

const updateAlternatif = async (e) => {
  e.preventDefault();
    try {
      let fuzzyValue, keteranganValue;
      if (nilai_alternatif.nama_kriteria === "Rata - Rata Nilai Rapot") {
        if (nilai_alternatif.nilai_real <= 70) {
            fuzzyValue = 1;
            keteranganValue = "Kurang Baik";
        } else if (nilai_alternatif.nilai_real > 70 && nilai_alternatif.nilai_real <= 80) {
            fuzzyValue = 2;
            keteranganValue = "Cukup";
        } else if (nilai_alternatif.nilai_real > 80 && nilai_alternatif.nilai_real <= 90) {
            fuzzyValue = 3;
            keteranganValue = "Baik";
        } else if (nilai_alternatif.nilai_real > 90) {
            fuzzyValue = 4;
            keteranganValue = "Sangat Baik";
        }
        } else if (nilai_alternatif.nama_kriteria === "Usia") {
          if (nilai_alternatif.nilai_real <= 10) {
            fuzzyValue = 1;
            keteranganValue = "Kurang Baik";
          } else if (nilai_alternatif.nilai_real == 11) {
              fuzzyValue = 2;
              keteranganValue = "Cukup";
          } else if (nilai_alternatif.nilai_real == 12) {
              fuzzyValue = 3;
              keteranganValue = "Baik";
          } else if (nilai_alternatif.nilai_real == 13) {
              fuzzyValue = 4;
              keteranganValue = "Sangat Baik";
          }
        } else if (nilai_alternatif.nama_kriteria === "Jarak") {
          if (nilai_alternatif.nilai_real > 2000) {
            fuzzyValue = 1;
            keteranganValue = "Kurang Baik";
          } else if (nilai_alternatif.nilai_real > 1000 && nilai_alternatif.nilai_real <= 2000) {
              fuzzyValue = 2;
              keteranganValue = "Cukup";
          } else if (nilai_alternatif.nilai_real > 500 && nilai_alternatif.nilai_real <= 1000) {
              fuzzyValue = 3;
              keteranganValue = "Baik";
          } else if (nilai_alternatif.nilai_real < 500) {
              fuzzyValue = 4;
              keteranganValue = "Sangat Baik";
          }
        }
      try {
        await axios.patch(`/nilai_alternatif/${id}`,{
          nama_alternatif:nilai_alternatif.nama_alternatif,
          nama_kriteria:nilai_alternatif.nama_kriteria,
          nilai_real:nilai_alternatif.nilai_real,
          nilai_fuzzy:fuzzyValue,
          keterangan:keteranganValue
        });
        alert("Data Nilai Alternatif Berhasil Di Update")
        navigate(`/nilai_alternatif`);
      } catch (e) {
        console.log("error dalam submit data :", e.response);
        alert(e.response.data);
      }
    }catch (e) {
      console.log("error dalam submit data :", e.response);
      alert(e.response);
    };
  };

  return (
    <div className="edit-nilaialt-column">
        <h2 className="edit-nilaialt-judul">Edit Data Nilai Alternatif</h2>
      <form onSubmit={updateAlternatif}>
      {/* <p>{msg}</p> */}
      <div className="field">
            <label className="label">Nama Alternatif ( Siswa )</label>
            <div className="control">
              <div className="select">
                <select
                  value={nilai_alternatif.nama_alternatif}
                  onChange={(e) => setNamaAlternatifBaru(e.target.value)}
                >
                  <option value="">Pilih Alternatif</option>
                  {ambilNamaAlt.map((item) => (
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
                  value={nilai_alternatif.nama_kriteria}
                  onChange={(e) => setNamaKriteriaBaru(e.target.value)}
                >
                  <option value="">Pilih Kriteria</option>
                  {ambilNamaKriteria.map((item) => (
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
                value={nilai_alternatif.nilai_real}
                onChange={(e) => setNilaiBaru(e.target.value)}
                placeholder="Nilai"
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
};

