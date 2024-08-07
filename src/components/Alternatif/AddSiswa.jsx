// import { useForm } from 'react-hook-form';
import './Addsiswa.css';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "../../lib/axios";

export default function Daftar() {
  const [nama_alternatif, setNamaAlternatif] = useState('');
  const [jalur, setJalur] = useState([]);
  const [jalurId, setJalurId] = useState([]);
  const [ambilJalur, setAmbilJalur] = useState([]);
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/alternatif",{
        nama_alternatif:nama_alternatif,
        nama_jalur:jalur,
        jalurId:jalurId
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
    const fetchDataAlternatif = async (data) => {
      try {
        const response = await axios.get(`/alternatif`, data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    const getJalur = async(data) =>{
      const response = await axios.get("/jalur", data);
      setAmbilJalur(response.data);
  }
    fetchDataAlternatif();
    getJalur();
}, []);

  return (
    <div className="add-alternatif-column">
        <h2 className="add-alternatif-judul">Tambah Alternatif</h2>
      <form onSubmit={onSubmit}>

      {/* <p>{msg}</p> */}
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
                value={`${jalurId},${jalur}`}
                onChange={(e) => {
                  const [id, nama_jalur] = e.target.value.split(',');
                  setJalur(nama_jalur);
                  setJalurId(id);
                  // Gunakan selectedOption.id sesuai kebutuhan
                }}
              >
                <option value="">Pilih Jalur Pendaftaran</option>
                {ambilJalur.map((item) => (
                  <option key={item.id} value={`${item.id},${item.nama_jalur}`}>
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

