import "./ListPendaftar.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../lib/axios";

const ListPendaftar = () => {
  const [nilaiAlt, setNilaiAlt] = useState([]);
  const [alt, setAlt] = useState([]);
  const [kriteria, setKriteria] = useState([]);
  const [jmlData, setJmlData] = useState(0);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState(0);
  const [jalur, setJalur] = useState([]);
  const [filteredNilaiAlt, setFilteredNilaiAlt] = useState([]);
  const [filteredKriteria, setFilteredKriteria] = useState([]);
  const [jumlahAlternatifPerJalur, setJumlahAlternatifPerJalur] = useState([]);
  const itemsPerPage = 7;
  const navigate = useNavigate();

// Ambil data Nilai Alternatif, Kriteria, dan Jalur
  const getNilaiAlt = async () => {
    try {
      const response = await axios.get("/nilai_alternatif");
      const sortedData = response.data.sort((a, b) => a.nama_alternatif.localeCompare(b.nama_alternatif));
      setNilaiAlt(sortedData);
    } catch (error) {
      console.error("Error dalam fetching nilai alternatif: ", error);
    }
  };
// Ambil Data Kriteria
  const getKriteria = async () => {
    try {
      const response = await axios.get("/kriteria");
      const dataKriteria = response.data;
      // const filteredKriteria = dataKriteria.filter(kriteria => kriteria.jalur_pendaftaran === activeTab);
      setKriteria(dataKriteria);
      
      // console.log(dataKriteria);
      // console.log(currentJalur);
      // console.log(filteredKriteria);
    } catch (error) {
      console.error("Error dalam fetching kriteria: ", error);
    }
  };
// Ambil Data Jalur
  const getJalur = async () => {
    try {
      const response = await axios.get('/jalur');
      setJalur(response.data);
    } catch (error) {
      console.error("Error dalam fetching jalur: ", error);
    }
  };
// Ambil Data Jumlah Alternatif PerJalur
  const hitungJumlahAlternatifPerJalur = (dataAlternatif, dataJalur) => {
    const jumlahPerJalur = dataJalur.map(jalurItem => {
      const jumlah = dataAlternatif.filter(item => item.nama_jalur === jalurItem.nama_jalur).length;
      return { nama_jalur: jalurItem.nama_jalur, jumlah };
    });
    setJumlahAlternatifPerJalur(jumlahPerJalur);
  };

  useEffect(() => {
    if (alt.length > 0 && jalur.length > 0) {
      hitungJumlahAlternatifPerJalur(alt, jalur);
    }
  }, [alt, jalur]);

  useEffect(() => {
    const jumlahData = async () => {
      try {
        const response = await axios.get("/alternatif");
        setAlt(response.data);
        setJmlData(response.data.length);
      } catch (error) {
        console.log(error);
      }
    };
    getJalur();
    jumlahData();
    getKriteria();
    getNilaiAlt();
  }, []);

  useEffect(() => {
    // Mengfilter nilaiAlt berdasarkan jalur aktif
    if (jalur.length > 0) {
      const currentJalur = jalur[activeTab]?.nama_jalur;
      // Menggunakan filteredData untuk mencari data di nilaiAlt
      const filteredData = nilaiAlt.filter(item => item.jalur_pendaftaran === currentJalur);
      const filteredData2 = kriteria.filter(item => item.jalur_pendaftaran === currentJalur);

      // Membuat referensi untuk pencarian data
      const filteredNilaiAltData = nilaiAlt.filter(item =>
        filteredData.some(filteredItem => filteredItem.nama_alternatif === item.nama_alternatif)
      );

      setFilteredKriteria(filteredData2);
      setFilteredNilaiAlt(filteredNilaiAltData);
    }
  }, [activeTab, jalur, nilaiAlt]);

  // Menggabungkan data untuk setiap siswa
  const mergedData = filteredNilaiAlt.reduce((acc, curr) => {
    const { nama_alternatif, nama_kriteria, nilai_real } = curr;
    if (!acc[nama_alternatif]) {
      acc[nama_alternatif] = {};
    }
    acc[nama_alternatif][nama_kriteria] = nilai_real;
    return acc;
  }, {});

  // Pagination
  const totalPages = Math.ceil(Object.keys(mergedData).length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const filteredData = Object.entries(mergedData).filter(([namaSiswa, dataSiswa]) =>
    namaSiswa.toLowerCase().includes(search.toLowerCase())
  );
  const currentData = filteredData.slice(startIndex, endIndex);

  const handleClick = (value) => {
    if (value === "prev" && currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    } else if (value === "next" && currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    } else if (typeof value === "number" && value >= 1 && value <= totalPages) {
      setCurrentPage(value);
    }
  };

  // Fungsi untuk Search data
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  // Fungsi Hapus Nilai
  const hapusNilAlt = async (dataAlternatifId) => {
    try {
      let deletedCount = 0;
      let response;
      do {
        response = await axios.delete(`/nilai_alternatif/${dataAlternatifId}`);
        deletedCount += response.data.deletedCount;
      } while (response.data.deletedCount > 0);

      getNilaiAlt();
    } catch (error) {
      console.log(error);
    }
  };

  const handleTambahButtonClick = () => {
    navigate(`/daftar/addpendaftar`);
  };

  return (
    <div className="list-rekap-container">
      <div className="list-rekap-grid">
        <h1 className="list-rekap-judul"> Pendaftaran</h1>
        <p className="list-rekap-subjudul">Halaman data pendaftar dan untuk melakukan pendaftaran</p>
        
        <div className="tabs">
          {jalur.map((jalurItem, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={activeTab === index ? 'active' : ''}
            >
              {jalurItem.nama_jalur}({jumlahAlternatifPerJalur.find(item => item.nama_jalur === jalurItem.nama_jalur)?.jumlah || 0} / {jalurItem.jumlah_kuota})
            </button>
          ))}
        </div>

        <div className="action-box">
          <button onClick={handleTambahButtonClick} className="btnadd-siswa">Daftar</button>
          <input
            type="text"
            value={search}
            onChange={handleSearchChange}
            className="search-box"
            placeholder="Cari nama siswa..."
          />
        </div>
        <div className="container-table-siswa">
          <table>
            <thead>
              <tr>
                <th>No</th>
                <th>Nama Siswa</th>
                {filteredKriteria.map((item) => (
                  <th key={item.id}>{item.nama_kriteria}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentData.map(([namaSiswa, dataSiswa], index) => (
                <tr key={index}>
                  <td>{startIndex + index + 1}</td>
                  <td>{namaSiswa}</td>
                  {filteredKriteria.map((item) => (
                    <td key={item.id}>{dataSiswa[item.nama_kriteria] || '-'}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="pagination">
          <button onClick={() => handleClick("prev")} className="page-button">Prev</button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => handleClick(index + 1)}
              className={currentPage === index + 1 ? "page-button-active" : "page-button-nonactive"}
            >
              {index + 1}
            </button>
          ))}
          <button onClick={() => handleClick("next")} className="page-button">Next</button>
        </div>
        <p className="jumlah-data">Jumlah Data : {jmlData}</p>
        <p className="jumlah-data">Jumlah Page : {totalPages}</p>
      </div>
    </div>
  );
};

export default ListPendaftar;
