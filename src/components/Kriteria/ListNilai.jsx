import "./ListNilai.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "../../lib/axios";

const ListNilai = () => {
    const [nilai, setNilai] = useState([]);
    const [jmlData, setJmlData] = useState(0);

    // Batas
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;
    const totalPages = Math.ceil(nilai.length / itemsPerPage);

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

    const currentData = nilai.slice(startIndex, endIndex);
    // Batas

    useEffect(() => {
        getNilai();
    }, []);
    useEffect(() => {
        jumlahData();
    }, []);

    const getNilai = async () => {
        const response = await axios.get("/kriteria");
        setNilai(response.data);
    };
    const hapusNilai = async (id) => {
        try {
        await axios.delete(`/kriteria/${id}`);
        getNilai();
        } catch (error) {
        console.log(error);
        }
    };
    const jumlahData = async () => {
        try {
        const response = await axios.get("/kriteria");
        setJmlData(response.data.length);
        } catch (error) {
        console.log(error);
        }
    };
    return (
        <div className="list-nilai-container">
        <div className="list-nilai-grid">
            <h1 className="list-nilai-judul">Daftar Nilai</h1>
            <p className="list-nilai-subjudul">Daftar Nilai yang telah di input oleh Pendaftar</p>
            <div className="container-table-nilai">
                <table>
                    <thead>
                    <tr>
                        <th>No</th>
                        <th>Kode Kriteria</th>
                        <th>Nama Kriteria</th>
                        <th>Bobot Kriteria</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {currentData.map((nil, index) => (
                        <tr key={nil.id}>
                            <td>{startIndex + index + 1}</td>
                            <td>{nil.kode_kriteria}</td>
                            <td>{nil.nama_kriteria}</td>
                            <td>{nil.bobot_kriteria}</td>
                            <td>
                                <Link
                                to={`/kriteria/editKriteria/${nil.id}`}
                                className="btnEdit"
                                >
                                Edit
                                </Link>
                                <Link
                                to={`/kriteria/hapusKriteria/${nil.id}`}
                                className="btnHapus"
                                >
                                Edit
                                </Link>
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

export default ListNilai;
