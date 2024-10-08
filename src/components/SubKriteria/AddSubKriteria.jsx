import './AddSubKriteria.css';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "../../lib/axios";

export default function AddSubKriteriaForm() {
  const [dataSubkriteria, setDataSubKriteria] = useState({
    nama_kriteria: '',
    jalur_pendaftaran:'',
    sub_kriteria: '',
    tipe_sub:'',
    bobot: '',
    keterangan: ''
  });
  const [kriteria, setKriteria] = useState([]);
  const [kriteriaId, setKriteriaId] = useState('');
  const navigate = useNavigate();
  const tipe_sub = ['range', 'satuan'];

  const getKriteria = async () => {
    const response = await axios.get('/kriteria');
    setKriteria(response.data);
  }

  useEffect(() => {
    getKriteria();
  }, []);

  const setNamaKriteria = (nama_kriteria, jalur_pendaftaran) => {
    setDataSubKriteria({ 
      ...dataSubkriteria, 
      nama_kriteria, 
      jalur_pendaftaran
    });
  };

  const setSubKriteria = (newValue) => {
    setDataSubKriteria({ ...dataSubkriteria, sub_kriteria: newValue });
  };
  const setTipeSubKriteria = (newValue) => {
    setDataSubKriteria({ ...dataSubkriteria, tipe_sub: newValue });
  };
  const setBobot = (newValue) => {
    setDataSubKriteria({ ...dataSubkriteria, bobot: newValue });
  };
  
  const setKeterangan = (newValue) => {
    setDataSubKriteria({ ...dataSubkriteria, keterangan: newValue });
  };
  
  const AddSubKriteria = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`/subkriteria`, {
        nama_kriteria: dataSubkriteria.nama_kriteria,
        jalur_pendaftaran: dataSubkriteria.jalur_pendaftaran,
        sub_kriteria: dataSubkriteria.sub_kriteria,
        tipe_sub:dataSubkriteria.tipe_sub,
        bobot: dataSubkriteria.bobot,
        keterangan: dataSubkriteria.keterangan,
        kriteriumId: kriteriaId,
      });
      alert("Data Sub Kriteria Berhasil Di Tambah")
      navigate(`/subkriteria`);
    } catch (e) {
      console.log("error dalam submit data :", e.response.msg);
      alert(e.response.data.msg);
    }
  };

  return (
    <div className="add-kriteria-column">
      <h2 className="kriteria-judul">Tambah Sub Kriteria</h2>
      <form onSubmit={AddSubKriteria}>
        {/* <p>{msg}</p> */}

        <div className="field">
          <label className="label">Nama Kriteria</label>
          <div className="control">
            <div className="select">
              <select
                defaultValue=""
                onChange={(e) => {
                  const [id, nama_kriteria, jalur_pendaftaran] = e.target.value.split(',');
                  setKriteriaId(id);
                  setNamaKriteria(nama_kriteria, jalur_pendaftaran);
                }}
              >
                <option value="" disabled>--Pilih Kriteria--</option>
                {kriteria.map((item) => (
                  <option key={item.id} value={`${item.id},${item.nama_kriteria},${item.jalur_pendaftaran}`}>
                    {item.nama_kriteria} ({item.jalur_pendaftaran})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="field">
          <label className="label">Jalur Pendaftaran</label>
          <div className="control">
            <input
              type="text"
              className="disabled-input"
              value={dataSubkriteria.jalur_pendaftaran}
              disabled
              placeholder="Jalur Pendaftaran"
            ></input>
          </div>
        </div>

        <div className="field">
          <label className="label">Sub Kriteria</label>
          <div className="control">
            <input
              type="text"
              className="input"
              value={dataSubkriteria.sub_kriteria}
              onChange={(e) => setSubKriteria(e.target.value)}
              placeholder="Sub Kriteria"
            ></input>
          </div>
        </div>

        <div className="field">
            <label className="label">Tipe Sub-Kriteria</label>
            <div className="control">
              <div className="select">
                <select value={dataSubkriteria.tipe_sub} onChange={(e) => setTipeSubKriteria(e.target.value)}>
                  <option value="" disabled>--Pilih Tipe sub Kriteria--</option>
                  {tipe_sub.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

        <div className="field">
          <label className="label">Bobot Kriteria</label>
          <div className="control">
            <input
              type="text"
              className="input"
              value={dataSubkriteria.bobot}
              onChange={(e) => setBobot(e.target.value)}
              placeholder="Bobot Sub Kriteria"
            ></input>
          </div>
        </div>

        <div className="field">
          <label className="label">Keterangan</label>
          <div className="control">
            <input
              type="text"
              className="input"
              value={dataSubkriteria.keterangan}
              onChange={(e) => setKeterangan(e.target.value)}
              placeholder="Keterangan"
            ></input>
          </div>
        </div>

        <div className="btn-field">
          <Link to={`/subkriteria`} className="action-btn">
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
