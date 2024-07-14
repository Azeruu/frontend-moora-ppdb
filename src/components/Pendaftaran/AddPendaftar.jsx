// import { useForm } from 'react-hook-form';
import './AddPendaftar.css';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "../../lib/axios";

export default function Daftar() {
  const [kode_alternatif, setKodeAlternatif] = useState('');
  const [kodeAlternatif2, setKodeAlternatif2] = useState([]);
  const [nama_alternatif, setNamaAlternatif] = useState('');
  const [jalur, setJalur] = useState([]);
  const [jalurId, setJalurId] = useState([]);
  const [ambilJalur, setAmbilJalur] = useState([]);
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
        await axios.post("/alternatif",{
          kode_alternatif:kode_alternatif,
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
      const kodeAlternatifValues = response.data.map(item => item.kode_alternatif);
      setKodeAlternatif2(kodeAlternatifValues);
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

  const generateNextKodeAlternatif = () => {
    // Ambil kode terakhir
    const lastKode = kodeAlternatif2[kodeAlternatif2.length-1];
    console.log(lastKode)
    if (lastKode && typeof lastKode === 'string') {
      const [letter, number] = lastKode.match(/[A-Za-z]+|[0-9]+/g);
  
      // Tambahkan 1 ke angka
      const nextNumber = parseInt(number, 10) + 1;
  
      // Gabungkan kembali huruf dan angka, pastikan angka dikonversi ke string
      const newCode = `${letter}${nextNumber}`;
  
      // Atur state kode alternatif baru
      setKodeAlternatif(newCode);
    } else {
      // Handle jika lastKode kosong atau undefined
      // Contoh: atur kode awal jika tidak ada kode sebelumnya
      setKodeAlternatif('A1'); // Misalnya, atur kode awal sesuai kebutuhan Anda
    }
  };

  return (
    <div className="add-alternatif-column">
        <h2 className="add-alternatif-judul">Tambah Data Pendaftaran</h2>
        <p className="list-rekap-subjudul">Setiap user hanya bisa mendaftar 1 kali</p>
      <button className="btnadd" onClick={generateNextKodeAlternatif}>generate</button>
      <form onSubmit={onSubmit}>
      {/* <p>{msg}</p> */}
          <div className="field">
            <label className="label">Kode Siswa/i</label>
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

