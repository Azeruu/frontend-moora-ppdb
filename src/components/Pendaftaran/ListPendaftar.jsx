import "./ListPendaftar.css";
import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate} from "react-router-dom";
import axios from "../../lib/axios";

const ListPendaftar = () => {
  const [nilaiAlt, setNilaiAlt] = useState([]);
  const [kriteria, setKriteria] = useState([]);
  const [jmlData, setJmlData] = useState(0);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;
  const navigate = useNavigate();

  // Ambil data Nilai Alternatif dan Kriteria
  const getNilaiAlt = async () => {
    const response = await axios.get("/nilai_alternatif");
    // Mengurutkan data berdasarkan nama_alternatif dari A ke Z
    const sortedData = response.data.sort((a, b) => {
      return a.nama_alternatif.localeCompare(b.nama_alternatif);
    });
    setNilaiAlt(sortedData);
  };
  const getKriteria = async () => {
    try {
      const response = await axios.get("/kriteria");
      setKriteria(response.data);
    } catch (error) {
      console.error("Error dalam fetching data: ", error);
    }
  };
  useEffect(() => {
    const jumlahData = async () => {
      try {
        const response = await axios.get("/alternatif");
        setJmlData(response.data.length);
      } catch (error) {
        console.log(error);
      }
    };
    jumlahData();
    getKriteria();
    getNilaiAlt();
  }, []);

  // Menggabungkan data untuk setiap siswa
  const mergedData = nilaiAlt.reduce((acc, curr) => {
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
  // Menggunakan data yang sudah difilter untuk render
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
          // Panggil endpoint untuk menghapus data dengan dataAlternatifId tertentu
          response = await axios.delete(`/nilai_alternatif/${dataAlternatifId}`);
          // Tambahkan jumlah data yang berhasil dihapus
          deletedCount += response.data.deletedCount;
      } while (response.data.deletedCount > 0); // Ulangi selama masih ada data yang dihapus

      // Setelah semua data yang memenuhi syarat telah dihapus, panggil getNilaiAlt
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
          <h1 className="list-rekap-judul"> Nilai Alternatif</h1>
          <p className="list-rekap-subjudul">Nilai Alternatif di setiap kriteria</p>
          <div className="action-box">
            <button onClick={handleTambahButtonClick} className="btnadd-siswa">Tambah</button>
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
                {kriteria.map((item, index) => (
                  <th key={index}>{item.nama_kriteria}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentData.map(([namaSiswa, dataSiswa], index) => (
                <tr key={index}>
                  <td>{startIndex + index + 1}</td>
                  <td>{namaSiswa}</td>
                  {kriteria.map((item, index) => (
                    <td key={index}>{dataSiswa[item.nama_kriteria]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div class="pagination">
          <button onClick={() => handleClick("prev")} class="page-button">Prev</button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => handleClick(index + 1)}
              className={currentPage === index + 1 ? "page-button-active" : "page-button-nonactive"}
            >
              {index + 1}
            </button>
          ))}
          <button onClick={() => handleClick("next")} class="page-button">Next</button>
        </div>
        <p className="jumlah-data">Jumlah Data : {jmlData}</p>
        <p className="jumlah-data">Jumlah Page : {totalPages}</p>
      </div>
    </div>
  );
};

export default ListPendaftar;
