import "./ListKriteria.css";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "../../lib/axios";

const ListKriteria = () => {
    const [kriteria, setKriteria] = useState([]);
    const [jmlData, setJmlData] = useState(0);
    const [search, setSearch] = useState('');
    const navigate = useNavigate();

    // Batas
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const totalPages = Math.ceil(kriteria.length / itemsPerPage);
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
    const filteredData = kriteria.filter((nil) =>
    nil.nama_kriteria.toLowerCase().includes(search.toLowerCase())
    );
    const currentData = filteredData.slice(startIndex, endIndex);
  // Batas

    const getKriteria = async () => {
        const response = await axios.get("/kriteria");
        setKriteria(response.data);
    };
    const jumlahData = async () => {
        try {
        const response = await axios.get("/kriteria");
        setJmlData(response.data.length);
        } catch (error) {
        console.log(error);
        }
    };

    useEffect(() => {
        getKriteria();
        jumlahData();
    }, []);

    const hapusKriteria = async (id) => {
        try {
        await axios.delete(`/kriteria/${id}`);
        getKriteria();
        } catch (error) {
        console.log(error);
        }
    };
    const handleTambahButtonClick = () => {
        navigate(`/kriteria/addKriteria`);
    };
    return (
        <div className="list-siswa-container">
        <div className="list-siswa-grid">
            <h1 className="list-siswa-judul">Data Kriteria</h1>
            <p className="list-siswa-subjudul">Parameter yang digunakan untuk mengevaluasi dan membandingkan alternatif-alternatif yang tersedia</p>
            <div className="action-box">
                <button onClick={handleTambahButtonClick} className="btnadd-siswa">Tambah</button>
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
                        <th>Kode Kriteria</th>
                        <th>Nama Kriteria</th>
                        <th>Jalur Pendaftaran</th>
                        <th>Bobot Kriteria(%)</th>
                        <th>Tipe Data (cost/benefit)</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {currentData.map((nil, index) => (
                        <tr key={nil.id}>
                            <td>{startIndex + index + 1}</td>
                            <td>{nil.kode_kriteria}</td>
                            <td>{nil.nama_kriteria}</td>
                            <td>{nil.jalur_pendaftaran}</td>
                            <td>{nil.bobot_kriteria}</td>
                            <td>{nil.tipe_data}</td>
                            <td className="button-action">
                                <Link
                                to={`/kriteria/editKriteria/${nil.id}`}
                                className="btnEdit-jalur"
                                >
                                Edit
                                </Link>
                                <button onClick={() => {
                                        if (window.confirm('Apakah Anda yakin ingin menghapus  data Kriteria ini?')) {
                                        hapusKriteria(nil.id);
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
            <button onClick={() => handleClick("prev")} class="page-button">
                Prev
            </button>
            {Array.from({ length: totalPages }, (_, index) => (
                <button
                key={index}
                onClick={() => handleClick(index + 1)}
                className={
                    currentPage === index + 1
                    ? "page-button-active"
                    : "page-button-nonactive"
                }
                >
                {index + 1}
                </button>
            ))}
            <button onClick={() => handleClick("next")} class="page-button">
                Next
            </button>
            </div>
            <p className="jumlah-data">Jumlah Data : {jmlData}</p>
            <p className="jumlah-data">Jumlah Page : {totalPages}</p>
        </div>
        </div>
    );
};

export default ListKriteria;
