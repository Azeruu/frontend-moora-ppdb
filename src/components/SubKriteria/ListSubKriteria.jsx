import "./ListSubKriteria.css";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "../../lib/axios";

const ListSubKriteria = () => {
    const [subKriteria, setSubKriteria] = useState([]);
    const [jmlData, setJmlData] = useState(0);
    const [search, setSearch] = useState('');
    const navigate = useNavigate();

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const totalPages = Math.ceil(subKriteria.length / itemsPerPage);
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
    const filteredData = subKriteria.filter((nil) =>
        nil.nama_kriteria.toLowerCase().includes(search.toLowerCase()) ||
        nil.sub_kriteria.toLowerCase().includes(search.toLowerCase()) ||
        nil.jalur_pendaftaran.toLowerCase().includes(search.toLowerCase())
    );
    const currentData = filteredData.slice(startIndex, endIndex);
  // END Pagination

    const getSubKriteria = async () => {
        const response = await axios.get("/subkriteria");
        setSubKriteria(response.data);
    };
    const jumlahData = async () => {
        try {
        const response = await axios.get("/subkriteria");
        setJmlData(response.data.length);
        } catch (error) {
        console.log(error);
        }
    };

    useEffect(() => {
        getSubKriteria();
        jumlahData();
    }, []);

    const hapusSubKriteria = async (id) => {
        try {
        await axios.delete(`/subkriteria/${id}`);
        getSubKriteria();
        } catch (error) {
        console.log(error);
        }
    };
    const handleTambahButtonClick = () => {
        navigate(`/subkriteria/addSubKriteria`);
    };
    return (
        <div className="list-siswa-container">
        <div className="list-siswa-grid">
            <h1 className="list-siswa-judul">Data Sub Kriteria</h1>
            <p className="list-siswa-subjudul">Parameter yang digunakan untuk mengevaluasi dan membandingkan alternatif-alternatif yang tersedia</p>
            <div className="action-box">
                <button onClick={handleTambahButtonClick} className="btnadd-siswa">Tambah</button>
                <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Cari Kriteria/Sub Kriteria..."
                className="search-box"
                />
            </div>
            <div className="container-table-siswa">
                <table>
                    <thead>
                    <tr>
                        <th>No</th>
                        <th>Nama Kriteria</th>
                        <th>Jalur Pendaftaran</th>
                        <th>Sub Kriteria</th>
                        <th>Tipe Sub-Kriteria</th>
                        <th>Bobot Sub-Kriteria</th>
                        <th>Keterangan</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {currentData.map((nil, index) => (
                        <tr key={nil.id}>
                            <td>{startIndex + index + 1}</td>
                            <td>{nil.nama_kriteria}</td>
                            <td>{nil.jalur_pendaftaran}</td>
                            <td>{nil.sub_kriteria}</td>
                            <td>{nil.tipe_sub}</td>
                            <td>{nil.bobot}</td>
                            <td>{nil.keterangan}</td>
                            <td className="button-action">
                                <Link
                                to={`/subkriteria/editSubKriteria/${nil.id}`}
                                className="btnEdit-jalur"
                                >
                                Edit
                                </Link>
                                <button onClick={() => {
                                        if (window.confirm('Apakah Anda yakin ingin menghapus  data Sub Kriteria ini?')) {
                                        hapusSubKriteria(nil.id);
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

export default ListSubKriteria;
