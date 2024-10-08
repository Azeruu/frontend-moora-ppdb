import "./ListSiswa.css";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "../../lib/axios";

const ListSiswa = () => {
  const [siswa, setSiswa] = useState([]);
  const [jmlData, setJmlData] = useState(0);
  const [isDataExists, setIsDataExists] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  
  // START PAGINATION
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(siswa.length / itemsPerPage);
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
  const filteredData = siswa.filter((sis) =>
  sis.nama_alternatif.toLowerCase().includes(search.toLowerCase())
  );
  const currentData = filteredData.slice(startIndex, endIndex);
  
  // END PAGINATION

  const getSiswa = async () => {
    const response = await axios.get("/alternatif");
    setSiswa(response.data);
  };
  useEffect(() => {
    const checkDataExistence = async () => {
      try {
        const response = await axios.get("/alternatif", {
          params: {
            userId: user.id,
          },
        });
        setIsDataExists(response.data.length > 0);
      } catch (error) {
        console.error('Error checking data existence:', error);
      }
    };
    const jumlahData = async () => {
      try {
        const response = await axios.get("/alternatif");
        setJmlData(response.data.length);
      } catch (error) {
        console.log(error);
      }
    };

    getSiswa();
    jumlahData();
    checkDataExistence();
  }, []);

  const handleDaftarButtonClick = () => {
    if (user.role === "admin") {
      navigate(`/alternatif/addAlternatif`);
    } else {
      if (isDataExists) {
        alert('Anda sudah melakukan input, tidak dapat melakukan input lebih dari 1 kali.');
      } else {
        navigate(`/alternatif/addAlternatif`);
      }
    }
  };

  const hapusSiswa = async (id) => {
    try {
      await axios.delete(`/alternatif/${id}`);
      getSiswa();
    } catch (error) {
      console.log(error);
    }
  };
  
  return (
    <div className="list-siswa-container">
      <div className="list-siswa-grid">
        <h1 className="list-siswa-judul">Data Alternatif</h1>
        <p className="list-siswa-subjudul">Opsi yang dipertimbangkan dalam proses pengambilan keputusan.</p>
        <div className="action-box">
          <button onClick={handleDaftarButtonClick} className="btnadd-siswa">Tambah</button>
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
                <th>Nama Alternatif</th>
                <th>Nama Jalur</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((sis, index) => (
                <tr key={sis.id}>
                  <td>{startIndex+index + 1}</td>
                  <td>{sis.nama_alternatif}</td>
                  <td>{sis.nama_jalur}</td>
                  <td className="button-action">
                    <Link
                      to={`/alternatif/editAlternatif/${sis.id}`}
                      className="btnEdit-jalur"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => {
                        if (window.confirm('Apakah Anda yakin ingin menghapus  data Alternatif ini?')) {
                          hapusSiswa(sis.id);
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

export default ListSiswa;
