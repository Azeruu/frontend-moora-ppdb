import "./Kuota.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "../../lib/axios";

const Kuota = () => {
  const [kuota, setKuota] = useState([]);
  const [jmlData, setJmlData] = useState(0);
  const [search, setSearch] = useState('');

  useEffect(() => {
    getQuota();
    jumlahData();
  }, []);
  // Batas
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(kuota.length / itemsPerPage);
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
  const currentData = kuota.slice(startIndex, endIndex);
  
  // Batas
  const getQuota = async () => {
    const response = await axios.get("/quota");
    setKuota(response.data);
  };
  const hapusQuota = async (id) => {
    try {
      await axios.delete(`/quota/${id}`);
      getQuota();
    } catch (error) {
      console.log(error);
    }
  };
  const jumlahData = async () => {
    try {
      const response = await axios.get("/quota");
      setJmlData(response.data.length);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="list-jalur-container">
      <div className="list-jalur-grid">
          <h1 className="list-jalur-judul">Quota Pendaftaran</h1>
          <p className="list-rekap-subjudul">Kategori yang digunakan untuk mengatur proses penerimaan siswa baru berdasarkan kriteria tertentu</p>
          <div className="action-box">
            <Link to={`/jalur/addjalur`} className="btnadd-jalur">
              Tambah Quota
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
                  <th>ID</th>
                  <th>Jumlah Kuota Total</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {currentData.map((quota, index) => (
                  <tr key={quota.id}>
                      <td>{startIndex+index + 1}</td>
                      <td>{quota.id}</td>
                      <td>{quota.total_quota}</td>
                      <td className="button-action">
                        <Link
                          to={`/kuota/editkuota/${quota.id}`}
                          className="btnEdit-jalur"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => hapusQuota(quota.id)}
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

export default Kuota;
