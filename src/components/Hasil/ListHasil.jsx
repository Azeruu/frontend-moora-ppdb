import "./ListHasil.css";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "../../lib/axios";

const ListHasil = () => {
  const { user } = useSelector((state) => state.auth);
  const [hasil, setHasil] = useState([]);
  const [jmlData, setJmlData] = useState(0);
  const [search, setSearch] = useState("");
  const [currentTab, setCurrentTab] = useState(""); // State untuk menyimpan jalur pendaftaran yang aktif
  const [loading, setLoading] = useState(false);
  const [tabData, setTabData] = useState({}); // State untuk menyimpan data terkelompok berdasarkan jalur pendaftaran

  // handle untuk input dan update data
  const handleInputData = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/hasil");
      console.log(response.data);
      getHasil();
      alert("Data berhasil diinput!");
    } catch (error) {
      console.error("Gagal menginput data:", error);
      alert("Terjadi kesalahan saat menginput data");
    } finally {
      setLoading(false);
    }
  };

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
    <div className="list-hasil-container">
      <div className="list-hasil-grid">
        <h1 className="list-hasil-judul">Hasil Perhitungan MOORA</h1>
        <p className="list-rekap-subjudul">
          Berikut adalah hasil perhitungan SPK menggunakan metode MOORA
        </p>

        <div className="action-box">
          <input
            type="text"
            value={search}
            onChange={handleSearch}
            placeholder="Cari ..."
            className="search-box"
          />
        </div>

        {/* Tombol untuk Input Data */}
        <div className="input-data-container">
          <button
            onClick={handleInputData}
            className="btnadd"
            disabled={loading}
          >
            {loading ? "Menginput Data..." : "Input Data"}
          </button>
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

        <div className="list-hasil-table-container">
          <table className="table">
            <thead>
              <tr>
                <th>No</th>
                <th>Nama Alternatif</th>
                <th>Jalur Pendaftaran</th>
                <th>Nilai Poin</th>
                <th>Peringkat</th>
                {user.role === "admin" && <th>Action</th>}
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
                  {user.role === "admin" && (
                    <td>
                      <button
                        onClick={() => {
                          if (
                            window.confirm(
                              "Apakah Anda yakin ingin menghapus data ini?"
                            )
                          ) {
                            // Hapus data
                            axios
                              .delete(`/hasil/${item.id}`)
                              .then(() => getHasil())
                              .catch((error) => console.log(error));
                          }
                        }}
                        className="btnHapus"
                      >
                        Hapus
                      </button>
                    </td>
                  )}
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

export default ListHasil;
