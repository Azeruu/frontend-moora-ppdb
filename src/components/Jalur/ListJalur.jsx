import "./ListJalur.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "../../lib/axios";

const ListJalur = () => {
  const [jalur, setJalur] = useState([]);
  const [jmlData, setJmlData] = useState(0);
  const [search, setSearch] = useState('');

  useEffect(() => {
    getJalur();
    jumlahData();
  }, []);
  // Batas
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(jalur.length / itemsPerPage);
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
  const filteredData = jalur.filter((jal) =>
  jal.nama_jalur.toLowerCase().includes(search.toLowerCase())
  );
  const currentData = filteredData.slice(startIndex, endIndex);
  
  // Batas
  const getJalur = async () => {
    const response = await axios.get("/jalur");
    setJalur(response.data);
  };
  const hapusJalur = async (id) => {
    try {
      await axios.delete(`/jalur/${id}`);
      getJalur();
    } catch (error) {
      console.log(error);
    }
  };
  const jumlahData = async () => {
    try {
      const response = await axios.get("/jalur");
      setJmlData(response.data.length);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="list-jalur-container">
      <div className="list-jalur-grid">
          <h1 className="list-jalur-judul">Jalur Pendaftaran</h1>
          <p className="list-rekap-subjudul">Kategori yang digunakan untuk mengatur proses penerimaan siswa baru berdasarkan kriteria tertentu</p>
          <div className="action-box">
            <Link to={`/jalur/addjalur`} className="btnadd-jalur">
              Tambah Jalur
            </Link>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari..."
              className="search-box"
            />
          </div>
          <div className="container-table-jalur">
            <table>
              <thead>
                <tr>
                  <th>No</th>
                  <th>ID Jalur</th>
                  <th>Nama Jalur</th>
                  <th>Persentase</th>
                  <th>Jumlah Kuota</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {currentData.map((jal, index) => (
                  <tr key={jal.uuid}>
                      <td>{startIndex+index + 1}</td>
                      <td>{jal.id}</td>
                      <td>{jal.nama_jalur}</td>
                      <td>{jal.persentase}</td>
                      <td>{jal.jumlah_kuota}</td>
                      <td className="button-action">
                        <Link
                          to={`/jalur/editjalur/${jal.id}`}
                          className="btnEdit-jalur"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => hapusJalur(jal.id)}
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

export default ListJalur;
