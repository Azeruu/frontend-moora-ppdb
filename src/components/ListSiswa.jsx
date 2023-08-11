import "./css/ListSiswa.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const ListSiswa = () => {
  const [siswa, setSiswa] = useState([]);
  const [jmlData, setJmlData] = useState(0);
  const [banyakData, setBanyakData] = useState(5);

  useEffect(() => {
    getSiswa();
  }, []);
  useEffect(() => {
    jumlahData();
  }, []);

  const tambahbatas = () => {
    setBanyakData(banyakData + 1);
  };
  const kurangibatas = () => {
    setBanyakData(banyakData - 1);
  };

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
    <div className="pendaftaran">
      <div className="pendaftaran-c1">
        <div className="daftar-atas">
          <h1 className="daftarsiswa">Daftar Siswa</h1>
          <Link to={`/pendaftaran/addsiswa`} className="btnadd">
            Daftar
          </Link>
        </div>
        <div className="table-container">
          <table className="table-pendaftaran">
            <thead>
              <tr>
                <th>Action</th>
                <th>No</th>
                <th>ID siswa</th>
                <th>NISN</th>
                <th>Nama Lengkap</th>
                <th>Jenis Kelamin</th>
                <th>Tempat Lahir</th>
                <th>Tanggal Lahir</th>
                <th>Agama</th>
                <th>Alamat</th>
                <th>No Telp.</th>
                <th>Email</th>
                <th>Asal Sekolah</th>
                <th>No. STTB</th>
                <th>No. SKHUN</th>
                <th>Tahun Ijazah</th>
                <th>Nilai UAS</th>
                <th>Jarak</th>
              </tr>
            </thead>
            <tbody>
              {siswa.slice(0, banyakData).map((sis, index) => (
                <tr key={sis.uuid}>
                  <td>
                    <Link
                      to={`/pendaftaran/editsiswa/${sis.uuid}`}
                      className="btnEdit"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => hapusSiswa(sis.uuid)}
                      className="btnHapus"
                    >
                      Hapus
                    </button>
                  </td>
                  <td>{index + 1}</td>
                  <td>{sis.uuid}</td>
                  <td>{sis.NISN}</td>
                  <td>{sis.nama_lengkap}</td>
                  <td>{sis.jenis_kelamin}</td>
                  <td>{sis.tempat_lahir}</td>
                  <td>{sis.tgl_lahir}</td>
                  <td>{sis.agama}</td>
                  <td>{sis.alamat}</td>
                  <td>{sis.no_telp}</td>
                  <td>{sis.email}</td>
                  <td>{sis.asal_sekolah}</td>
                  <td>{sis.no_STTB}</td>
                  <td>{sis.no_SKHUN}</td>
                  <td>{sis.tahun_ijazah}</td>
                  <td>{sis.nilai_UAS}</td>
                  <td>{sis.jarak}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="jumlah-data">Jumlah Data : {jmlData}</p>
        <label className="VLabel">View List</label>
        <div className="atur-jumlah">
          <button className="btn-data" onClick={kurangibatas}>
            -
          </button>
          <input
            className="input-banyakdata"
            onChange={(e) => setBanyakData(e.target.value)}
            value={banyakData}
            type="number"
          ></input>
          <button className="btn-data" onClick={tambahbatas}>
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default ListSiswa;
