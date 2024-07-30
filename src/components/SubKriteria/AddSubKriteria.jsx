import './AddSubKriteria.css';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from "../../lib/axios";

export default function AddSubKriteriaForm() {
  const [subkriteria, setSubKriteria] = useState({
    nama_kriteria: '',
    nilai_min: '',
    nilai_max: '',
    bobot: '',
    keterangan: ''
  });
  const [kriteria, setKriteria] = useState([]);
  const [kriteriaId, setKriteriaId] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  const getKriteria = async () => {
    const response = await axios.get('/kriteria');
    setKriteria(response.data);
  }

  useEffect(() => {
    getKriteria();
  }, []);

  const setNamaKriteria = (newValue) => {
    setSubKriteria({ ...subkriteria, nama_kriteria: newValue });
  };

  const setNilaiMin = (newValue) => {
    setSubKriteria({ ...subkriteria, nilai_min: newValue });
  };

  const setNilaiMax = (newValue) => {
    setSubKriteria({ ...subkriteria, nilai_max: newValue });
  };

  const setBobot = (newValue) => {
    setSubKriteria({ ...subkriteria, bobot: newValue });
  };

  const setKeterangan = (newValue) => {
    setSubKriteria({ ...subkriteria, keterangan: newValue });
  };

  const AddSubKriteria = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`/subkriteria`, {
        nama_kriteria: subkriteria.nama_kriteria,
        nilai_min: subkriteria.nilai_min,
        nilai_max: subkriteria.nilai_max,
        bobot: subkriteria.bobot,
        keterangan: subkriteria.keterangan,
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
                  const [id, nama_kriteria] = e.target.value.split(',');
                  setKriteriaId(id);
                  setNamaKriteria(nama_kriteria);
                }}
              >
                <option value="" disabled>Pilih Kriteria</option>
                {kriteria.map((item) => (
                  <option key={item.id} value={`${item.id},${item.nama_kriteria}`}>
                    {item.nama_kriteria} ({item.jalur_pendaftaran})
                  </option>
                ))}
              </select>

            </div>
          </div>
        </div>

        <div className="field">
          <label className="label">Nilai Min</label>
          <div className="control">
            <input
              type="text"
              className="input"
              value={subkriteria.nilai_min}
              onChange={(e) => setNilaiMin(e.target.value)}
              placeholder="Nilai Minimal"
            ></input>
          </div>
        </div>

        <div className="field">
          <label className="label">Nilai Max</label>
          <div className="control">
            <input
              type="text"
              className="input"
              value={subkriteria.nilai_max}
              onChange={(e) => setNilaiMax(e.target.value)}
              placeholder="Nilai Maximal"
            ></input>
          </div>
        </div>

        <div className="field">
          <label className="label">Bobot Kriteria</label>
          <div className="control">
            <input
              type="text"
              className="input"
              value={subkriteria.bobot}
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
              value={subkriteria.keterangan}
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
