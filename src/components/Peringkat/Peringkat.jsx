// import { useSelector } from "react-redux";
import React, { useEffect, useState } from 'react';
import axios from '../../lib/axios';
import "./Peringkat.css";

const Peringkat = () => {
  // const { user } = useSelector((state) => state.auth);
  const [hasil, setHasil] = useState([]);
  const [jmlData, setJmlData] = useState(0);
  const [search, setSearch] = useState("");
  const [currentTab, setCurrentTab] = useState(""); // State untuk menyimpan jalur pendaftaran yang aktif
  const [tabData, setTabData] = useState({}); // State untuk menyimpan data terkelompok berdasarkan jalur pendaftaran

  // Mengambil data hasil dari API
  const getHasil = async () => {
    try {
      const response = await axios.get("/hasil");
      const sortedHasil = response.data.sort((a, b) => b.poin - a.poin);
      sortedHasil.forEach((item, index) => {
        item.peringkat = index + 1;
      });
      setHasil(sortedHasil);
      setJmlData(sortedHasil.length);

      // Mengelompokkan hasil berdasarkan jalur pendaftaran
      const groupedData = {};
      sortedHasil.forEach((item) => {
        const jalur = item.jalur_pendaftaran;
        if (!groupedData[jalur]) {
          groupedData[jalur] = [];
        }
        groupedData[jalur].push(item);
      });
      setTabData(groupedData);
      setCurrentTab(Object.keys(groupedData)[0]); // Set tab pertama sebagai default
    } catch (error) {
      console.error("Gagal mengambil data dari API:", error);
    }
  };

  // Fungsi pencarian
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  // UseEffect untuk menjalankan pengambilan data pada saat pertama kali component dipasang
  useEffect(() => {
    getHasil();
  }, []);

  // Filter data berdasarkan pencarian
  const filteredData = tabData[currentTab]?.filter((item) =>
    item.nama_alternatif.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="list-peringkat-container">
      <div className="list-peringkat-grid">
        <h1 className="list-peringkat-judul">Peringkat Hasil Perhitungan</h1>

        <div className="action-box">
          <input
            type="text"
            value={search}
            onChange={handleSearch}
            placeholder="Cari ..."
            className="search-box"
          />
        </div>

        {/* Tab untuk Jalur Pendaftaran */}
        <div className="tabs-jalur">
          {Object.keys(tabData).map((jalur) => (
            <button
              key={jalur}
              className={`tab-button ${currentTab === jalur ? "active" : ""}`}
              onClick={() => setCurrentTab(jalur)}
            >
              {jalur}
            </button>
          ))}
        </div>

        <div className="list-peringkat-table-container">
          <table className="table">
            <thead>
              <tr>
                <th>No</th>
                <th>Nama Alternatif</th>
                <th>Jalur Pendaftaran</th>
                <th>Nilai Poin</th>
                <th>Peringkat</th>
              </tr>
            </thead>
            <tbody>
              {filteredData?.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.nama_alternatif}</td>
                  <td>{item.jalur_pendaftaran}</td>
                  <td>{item.poin.toFixed(2)}</td>
                  <td>{item.peringkat}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="jumlah-data">Jumlah Data: {jmlData}</p>
      </div>
    </div>
  );
};

export default Peringkat;
