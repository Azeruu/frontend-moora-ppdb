import "./ListHasil.css";
import { useState, useEffect } from "react";
import axios from "axios";

const ListHasil = () => {
  const [rekap, setRekap] = useState([]);

  useEffect(() => {
    getRekapNilai();
  },[]);

  const getRekapNilai = async() =>{
    try {
      const response = await axios.get('http://localhost:5000/rekap_nilai');
      setRekap(response.data)
      console.log(rekap);
    } catch (error) {
      console.error('Gagal mengambil data dari API:', error);
    }
  }


  // Bobot kriteria
  const bobotNilaiPkn = 0.4;
  const bobotNilaiBindo = 0.4;
  const bobotNilaiMtk = 0.4;
  const bobotNilaiIps = 0.4;
  const bobotNilaiIpa = 0.4;
  const bobotJarak = 0.6;
  const bobotUmur = 0.2;

  // Normalisasi kriteria 
  const total_normalisasi = rekap.map(rekap => {
    const user_id = rekap.userId;
    const siswa_id = rekap.dataSiswaId;
    const nama_siswa = rekap.nama_lengkap;
    const normalizedPKN = (rekap.avrg_nilai_pkn - 60) / (100 - 60);
    const normalizedBINDO = (rekap.avrg_nilai_bindo - 60) / (100 - 60);
    const normalizedMTK = (rekap.avrg_nilai_mtk - 60) / (100 - 60);
    const normalizedIPS = (rekap.avrg_nilai_ips - 60) / (100 - 60);
    const normalizedIPA = (rekap.avrg_nilai_ipa - 60) / (100 - 60);
    const normalizedDistance = rekap.jarak / 10;
    const normalizedUsia = (18 - rekap.usia) / 18; // Normalisasi usia
    
    const skor_akhir =
      bobotNilaiPkn * normalizedPKN +
      bobotNilaiBindo * normalizedBINDO +
      bobotNilaiMtk * normalizedMTK +
      bobotNilaiIps * normalizedIPS +
      bobotNilaiIpa * normalizedIPA +
      bobotJarak * normalizedDistance +
      bobotUmur * normalizedUsia;

      return {
      user_id,
      siswa_id,
      nama_siswa,
      normalizedPKN,
      normalizedBINDO,
      normalizedMTK,
      normalizedIPS,
      normalizedIPA,
      normalizedDistance,
      normalizedUsia,
      skor_akhir,
    };
  });
  total_normalisasi.sort((a, b) => b.skor_akhir - a.skor_akhir);
console.log(total_normalisasi);

  return (
    <div className="list-jalur-container">
      <div className="list-jalur-grid">
          <h1 className="list-jalur-judul">Aspek </h1>
          {/* <Link to={`/Aspek/addAspek`} className="btnadd">
            Tambah Hasil
          </Link> */}
        <div className="list-jalur-table-container">
          <table className="table">
            <thead>
              <tr>
                <th>No</th>
                <th>ID Hasil</th>
                <th>User ID</th>
                <th>Siswa ID</th>
                <th>Nama Siswa</th>
                <th>Skor Akhir</th>
                <th>Peringkat</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {total_normalisasi.map((jal, index) => (
                <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{index + 1}</td>
                    <td>{jal.user_id}</td>
                    <td>{jal.siswa_id}</td>
                    <td>{jal.nama_siswa}</td>
                    <td>{jal.skor_akhir}</td>
                    <td>{index+1}</td>
                    {/* <td>
                      <Link
                        to={`/Aspek/editAspek/${jal.uuid}`}
                        className="btnEdit"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => hapusAspek(jal.uuid)}
                        className="btnHapus"
                      >
                        Hapus
                      </button>
                    </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* <div class="pagination">
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
        <p className="jumlah-data">Jumlah Page : {totalPages}</p> */}
      </div>
    </div>
  );
}

export default ListHasil;
