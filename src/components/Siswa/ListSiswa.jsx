import "./ListSiswa.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const ListSiswa = () => {
  const [siswa, setSiswa] = useState([]);
  const [jmlData, setJmlData] = useState(0);

  useEffect(() => {
    getSiswa();
  }, []);
  useEffect(() => {
    jumlahData();
  }, []);

  // Batas
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(siswa.length / itemsPerPage);

  const handleClick = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    } else if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const currentData = siswa.slice(startIndex, endIndex);
  // Batas

  const getSiswa = async () => {
    const response = await axios.get("http://localhost:5000/data_siswa");
    setSiswa(response.data);
  };
  const hapusSiswa = async (uuid) => {
    try {
      await axios.delete(`http://localhost:5000/data_siswa/${uuid}`);
      getSiswa();
    } catch (error) {
      console.log(error);
    }
  };
  const jumlahData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/data_siswa");
      setJmlData(response.data.length);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="list-siswa-container">
      <div className="list-siswa-grid">
        <h1 className="list-siswa-judul">Daftar Siswa</h1>
        <Link to={`/siswalist/addsiswa`} className="btnadd">
          Daftar
        </Link>
        <div className="list-siswa-table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Action</th>
                <th>No</th>
                <th>ID siswa</th>
                <th>Jalur</th>
                <th>NISN</th>
                <th>Nama Lengkap</th>
                <th>Jenis Kelamin</th>
                <th>NIK</th>
                <th>Tempat Lahir</th>
                <th>Tanggal Lahir</th>
                <th>Usia</th>
                <th>Asal Sekolah</th>
                <th>Nama Jalan</th>
                <th>No. Rumah</th>
                <th>RT</th>
                <th>RW</th>
                <th>Desa</th>
                <th>Kecamatan</th>
                <th>Jarak Rumah Ke Sekolah</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((sis, index) => (
                <tr key={sis.id}>
                  <td>
                    <Link
                      to={`/siswalist/editsiswa/${sis.id}`}
                      className="btnEdit"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => hapusSiswa(sis.id)}
                      className="btnHapus"
                    >
                      Hapus
                    </button>
                  </td>
                  <td>{index + 1}</td>
                  <td>{sis.id}</td>
                  <td>{sis.nama_jalur}</td>
                  <td>{sis.NISN}</td>
                  <td>{sis.nama_lengkap}</td>
                  <td>{sis.jenis_kelamin}</td>
                  <td>{sis.NIK}</td>
                  <td>{sis.tempat_lahir}</td>
                  <td>{sis.tgl_lahir}</td>
                  <td>{sis.usia}</td>
                  <td>{sis.asal_sekolah}</td>
                  <td>{sis.nama_jalan}</td>
                  <td>{sis.no_rumah}</td>
                  <td>{sis.RT}</td>
                  <td>{sis.RW}</td>
                  <td>{sis.Desa}</td>
                  <td>{sis.Kecamatan}</td>
                  <td>{sis.jarak}</td>
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

export default ListSiswa;
