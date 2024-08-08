import './EditSubKriteria.css'
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from "../../lib/axios";

export default function EditSubKriteriaForm() {
  const [dataSubkriteria, setDataSubKriteria] = useState({
    nama_kriteria: '',
    sub_kriteria: '',
    bobot: '',
    keterangan: '',
    tipe_subKriteria: ''
  });
  const [kriteria, setKriteria] = useState([]);
  const {id} = useParams();
  const navigate = useNavigate();
  
  const getKriteria = async()=>{
    const response = await axios.get('/kriteria');
    setKriteria(response.data);
  }

  useEffect(() => {
    const getSubKriteriaById = async(data) =>{
      try {
        const response = await axios.get(`/subkriteria/${id}`,data);
        setDataSubKriteria(response.data);
    } catch (e) {
      console.log("error dalam submit data :", e.response.msg);
    }
    };
    getKriteria();
    getSubKriteriaById();
}, [id]);

const setNamaKriteria = (newValue) => {
  setDataSubKriteria({ ...dataSubkriteria, nama_kriteria: newValue });
};

const setSubKriteria = (newValue) => {
  setDataSubKriteria({ ...dataSubkriteria, sub_kriteria: newValue });
};
const setBobot = (newValue) => {
  setDataSubKriteria({ ...dataSubkriteria, bobot: newValue });
};

const setKeterangan = (newValue) => {
  setDataSubKriteria({ ...dataSubkriteria, keterangan: newValue });
};
const setTipeSubKriteria = (newValue) => {
  setDataSubKriteria({ ...dataSubkriteria, tipe_subKriteria: newValue });
};

const updateKriteria = async (e) => {
  e.preventDefault();
  try {
    await axios.patch(`/subkriteria/${id}`,{
      nama_kriteria: dataSubkriteria.nama_kriteria,
        sub_kriteria: dataSubkriteria.sub_kriteria,
        bobot: dataSubkriteria.bobot,
        keterangan: dataSubkriteria.keterangan,
        tipe_subKriteria: dataSubkriteria.tipe_subKriteria,
    });
    alert("Data Sub-Kriteria Berhasil Di Update")
    navigate(`/subkriteria`);
  } catch (e) {
    console.log("error dalam submit data :", e.response.msg);
    alert(e.response.data.msg);
  }
};
const tipeSubKriteriaEnum = {
  NUMERIK: 'numerik',
  KATEGORI: 'kategori',
};

const pilihanTipeSubKriteria = Object.keys(tipeSubKriteriaEnum).map(key => ({
  value: tipeSubKriteriaEnum[key],
  label: tipeSubKriteriaEnum[key].charAt(0).toUpperCase() + tipeSubKriteriaEnum[key].slice(1)
}));

  return (
    <div className="edit-kriteria-column">
        <h2 className="kriteria-judul">Edit Data Kriteria</h2>
      <form onSubmit={updateKriteria}>
      {/* <p>{msg}</p> */}
      <div className="field">
            <label className="label">Nama Kriteria</label>
            <div className="control">
              <div className="select">
                <select value={dataSubkriteria.nama_kriteria} onChange={(e) => setNamaKriteria(e.target.value)}>
                  <option value="" disabled>Pilih Kriteria</option>
                  {kriteria.map((item, index) => (
                    <option key={index} value={item.nama_kriteria}>
                      {item.nama_kriteria} ({item.jalur_pendaftaran})
                    </option>
                  ))}
                </select>
              </div>
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

          <div className="field">
          <label className="label">Tipe Sub Kriteria</label>
          <div className="control">
            <select
              className="input"
              value={dataSubkriteria.tipe_subKriteria}
              onChange={(e) => setTipeSubKriteria(e.target.value)}
            >
              <option value="" disabled>
                --- Pilih Tipe SubKriteria ---
              </option>
              {pilihanTipeSubKriteria.map(pilihan => (
                <option key={pilihan.value} value={pilihan.value}>
                  {pilihan.label}
                </option>
              ))}
            </select>
          </div>
        </div>

          <div className="btn-field">
            <Link to={`/subkriteria`} className="action-btn">
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

