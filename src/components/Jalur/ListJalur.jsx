import "./ListJalur.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const ListJalur = () => {
  const [jalur, setJalur] = useState([]);
  const [jmlData, setJmlData] = useState(0);
  const [banyakData, setBanyakData] = useState(5);

  useEffect(() => {
    getJalur();
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

  const getJalur = async () => {
    const response = await axios.get("http://localhost:5000/jalur");
    setJalur(response.data);
  };
  const hapusJalur = async (uuid) => {
    try {
      await axios.delete(`http://localhost:5000/jalur/${uuid}`);
      getJalur();
    } catch (error) {
      console.log(error);
    }
  };
  const jumlahData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/jalur");
      setJmlData(response.data.length);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="pendaftaran">
      <div className="pendaftaran-c1">
        <div className="daftar-atas">
          <h1 className="daftarsiswa">Jalur Masuk</h1>
          <Link to={`/jalur/addjalur`} className="btnadd">
            Tambah Jalur
          </Link>
        </div>
        <div className="table-container">
          <table className="table-pendaftaran">
            <thead>
              <tr>
                <th>No</th>
                <th>ID Jalur</th>
                <th>Nama Jalur</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {jalur.slice(0, banyakData).map((jal, index) => (
                <tr key={jal.uuid}>
                    <td>{index + 1}</td>
                    <td>{jal.id}</td>
                    <td>{jal.nama_jalur}</td>
                    <td>
                      <Link
                        to={`/jalur/editjalur/${jal.uuid}`}
                        className="btnEdit"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => hapusJalur(jal.uuid)}
                        className="btnHapus"
                      >
                        Hapus
                      </button>
                    </td>
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

export default ListJalur;
