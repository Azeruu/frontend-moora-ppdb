import "./ListRekapNilai.css";
import { useState, useEffect } from "react";
import axios from "../../lib/axios";

const ListRekapNilai = () => {
  const [rekapNilai, setRekapNilai] = useState([]);
  const [jmlData, setJmlData] = useState(0);

  useEffect(() => {
    getRekapNilai();
  }, []);
  useEffect(() => {
    jumlahData();
  }, []);

  // Batas
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(rekapNilai.length / itemsPerPage);

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
  const currentData = rekapNilai.slice(startIndex, endIndex);
  
  // Batas
  const getRekapNilai = async () => {
    const response = await axios.get("/nilai_alternatif");
    setRekapNilai(response.data);
  };
  // const hapusrekapNilai = async (id) => {
  //   try {
  //     await axios.delete(`/rekap_nilai/${id}`);
  //     getrekapNilai();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  const jumlahData = async () => {
    try {
      const response = await axios.get("/nilai_alternatif");
      setJmlData(response.data.length);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="list-rekap-container">
      <div className="list-rekap-grid">
          <h1 className="list-rekap-judul"> Nilai Alternatif</h1>
          <p className="list-rekap-subjudul">Nilai Alternatif di setiap kriteria</p>
        <div className="container-table-rekapnilai">
          <table>
            <thead>
              <tr>
                <th>No</th>
                <th>Nama Alternatif(Siswa)</th>
                <th>Nama Kriteria</th>
                <th>Nilai Asli</th>
                <th>Nilai Fuzzy</th>
                <th>Keterangan</th>
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

export default ListRekapNilai;
