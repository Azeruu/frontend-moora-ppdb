// import { useForm } from 'react-hook-form';
import './AddPendaftar.css';
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
        await axios.post("/alternatif",{
          nama_alternatif:nama_alternatif,
          nama_jalur:jalur,
          jalurId:jalurId
      });
      // Navigasi ke form selanjutnya dengan menyertakan id dan jalurId sebagai query parameter
      navigate(`/daftar/addpendaftar2/${nama_alternatif}/${jalurId}`);
    } catch (e) {
      console.log("error dalam submit data :", e.response.msg);
      alert(e.response.data.msg);
    }
  };

  useEffect(() => {
  const fetchDataAlternatif = async () => {
    try {
      const response = await axios.get("/alternatif");
    } catch (error) {
      console.error('Error fetching data alternatif:', error);
    }
  };
  const getJalur = async () => {
    try {
      const response = await axios.get("/jalur");
      setAmbilJalur(response.data);
    } catch (error) {
      console.error('Error fetching data jalur:', error);
    }
  };
  fetchDataAlternatif();
  getJalur();
}, []);

  return (
    <div className="add-alternatif-column">
        <h2 className="add-alternatif-judul">Tambah Data Pendaftaran</h2>
        <p className="list-rekap-subjudul">Setiap user hanya bisa mendaftar 1 kali</p>
      <form onSubmit={onSubmit}>
      {/* <p>{msg}</p> */}
          <div className="field">
            <label className="label">Nama Siswa/i</label>
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
            <Link to={`/daftar`} className="action-btn">
              Kembali
            </Link>
            <button type="submit" className="action-btn">
              Next
            </button>
          </div>
      </form>
      </div>
  );
}

