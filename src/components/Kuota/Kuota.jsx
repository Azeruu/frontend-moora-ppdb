// import { useSelector } from "react-redux";
import React, { useEffect, useState } from 'react';
import axios from '../../lib/axios';
import "./Kuota.css";

const Kuota = () => {
  const [jalur, setJalur] = useState([]);
  const [alt, setAlt] = useState([]);
  const [jumlahAlternatifPerJalur, setJumlahAlternatifPerJalur] = useState([]);
  const [lastUpdated, setLastUpdated] = useState(null);

// Ambil Data Jalur
  const getJalur = async () => {
    try {
      const response = await axios.get('/jalur');
      setJalur(response.data);
    } catch (error) {
      console.error("Error dalam fetching jalur: ", error);
    }
  };

// Ambil Data Alternatif
  const ambilAlt = async () => {
    try {
      const response = await axios.get('/alternatif');
      setAlt(response.data);
    } catch (error) {
      console.error("Error dalam fetching Alternatif: ", error);
    }
  };
  
  useEffect(() => {
    setLastUpdated(new Date());
    ambilAlt();
    getJalur();
  }, []);

  useEffect(() => {
    if (alt.length > 0 && jalur.length > 0) {
      const jumlahPerJalur = jalur.map(jalurItem => {
        const jumlah = alt.filter(item => item.nama_jalur === jalurItem.nama_jalur).length;
        return { nama_jalur: jalurItem.nama_jalur, jumlah };
      });
      setJumlahAlternatifPerJalur(jumlahPerJalur);
    }
  }, [alt, jalur]);
  
  const formatDate = (date) => {
    if (!date) return '';
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(date).toLocaleDateString('id-ID', options);
  };

  return (
    <div className="Kuota">
      <div className="kuota-container">
        <h1 className="kuota-judul">Info Kuota</h1>
        <p className="update-time">Update terakhir: {formatDate(lastUpdated)}</p>
        <div className="tabs">
          {jalur.map((jalurItem, index) => {
            const jumlahAlternatif = jumlahAlternatifPerJalur.find(item => item.nama_jalur === jalurItem.nama_jalur)?.jumlah || 0;
            const persentaseTerpakai = (jumlahAlternatif / jalurItem.jumlah_kuota) * 100;
            return (
              <div className='kuota-card' key={index}>
                <h1 className="judul-jalur">{jalurItem.nama_jalur}</h1>
                <h2 className="jumlah-kuota"><span>{jumlahAlternatif}</span>/{jalurItem.jumlah_kuota}</h2>
                <div className="progress-container">
                  <progress className='kuota-progres-bar' value={persentaseTerpakai} max="100"></progress>
                  <p className="kuota-progres-persentase">{persentaseTerpakai.toFixed(0)}%</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Kuota;
