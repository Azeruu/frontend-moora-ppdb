import "./ListNilaiAlt.css";
import { useState, useEffect } from "react";
import { Link, useNavigate} from "react-router-dom";
import axios from "../../lib/axios";

const ListNilaiAlt = () => {
  const [nilaiAlt, setNilaiAlt] = useState([]);
  const [jmlData, setJmlData] = useState(0);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const getNilaiAlt = async () => {
    const response = await axios.get("/nilai_alternatif");
    setNilaiAlt(response.data);
  };
  useEffect(() => {
    getNilaiAlt();
  }, []);

  // Pagination
  const sortedData = [...nilaiAlt].sort((a, b) => {
    // Bandingkan nama alternatif
    return a.nama_alternatif.localeCompare(b.nama_alternatif);
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const handleClick = (value) => {
    if (value === "prev" && currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    } else if (value === "next" && currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    } else if (typeof value === "number" && value >= 1 && value <= totalPages) {
      setCurrentPage(value);
    }
  };
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const filteredData = sortedData.filter((jal) =>
  jal.nama_alternatif.toLowerCase().includes(search.toLowerCase())
  );
  const currentData = filteredData.slice(startIndex, endIndex);
  
  // Batas
  const hapusNilAlt = async (id) => {
    try {
      await axios.delete(`/nilai_alternatif/${id}`);
      getNilaiAlt();
    } catch (error) {
      console.log(error);
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
  }, []);

  const handleTambahButtonClick = () => {
      navigate(`/nilai_alternatif/addNilaiAlternatif`);
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
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari..."
              className="search-box"
            />
          </div>
        <div className="container-table-siswa">
          <table>
            <thead>
              <tr>
                <th>No</th>
                <th>Nama Alternatif(Siswa)</th>
                <th>Nama Kriteria</th>
                <th>Nilai Asli</th>
                <th>Nilai Fuzzy</th>
                <th>Keterangan</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((jal, index) => (
                <tr key={jal.id}>
                    <td>{startIndex+ index + 1}</td>
                    <td>{jal.nama_alternatif}</td>
                    <td>{jal.nama_kriteria}</td>
                    <td>{jal.nilai_real}</td>
                    <td>{jal.nilai_fuzzy}</td>
                    <td>{jal.keterangan}</td>
                    <td className="button-action">
                    <Link
                      to={`/nilai_alternatif/editNilaiAlternatif/${jal.id}`}
                      className="btnEdit-jalur"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => {
                        if (window.confirm('Apakah Anda yakin ingin menghapus  data Nilai Alternatif ini?')) {
                          hapusNilAlt(jal.id);
                        }
                      }}
                      className="btnHapus-jalur"
                    >
                      Hapus
                    </button>
                  </td>
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

export default ListNilaiAlt;
