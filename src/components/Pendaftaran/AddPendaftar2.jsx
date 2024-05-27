import './AddPendaftar.css';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from "../../lib/axios";

export default function Daftar2() {
    const [alternatif, setAlternatif] = useState("");
    const [nilai_real, setNilaiReal] = useState({});
    const [alternatifId, setAlternatifId] = useState('');
    const [ambilAlt, setAmbilAlt] = useState([]);
    const [ambilKriteria, setAmbilKriteria] = useState([]);
    const [dataKriteriumId, setDataKriteriumId] = useState([]);
    const navigate = useNavigate();
    const {namaAlternatif} = useParams();

// START AMBIL DATA
const getAlternatif = async (data) => {
    const response = await axios.get("/alternatif", data);
    setAmbilAlt(response.data);
};
const getKriteria = async (data) => {
    const response = await axios.get("/kriteria", data);
    setAmbilKriteria(response.data);

    // Membuat objek untuk menyimpan ID kriteria berdasarkan nama kriterianya
    const kriteriaIdMap = {};
    response.data.forEach(kriteria => {
        kriteriaIdMap[kriteria.nama_kriteria] = kriteria.id;
    });
    setDataKriteriumId(kriteriaIdMap);
};
// END AMBIL DATA

useEffect(() => {
    if (namaAlternatif) {
        const selectedAlternatif = ambilAlt.find(item => item.nama_alternatif === namaAlternatif);
        if (selectedAlternatif) {
        setAlternatif(selectedAlternatif.nama_alternatif);
        setAlternatifId(selectedAlternatif.id);
        }
    }
}, [namaAlternatif, ambilAlt]);
    
useEffect(() => {
    getAlternatif();
    getKriteria();
}, []);

const handleInputChange = (namaKriteria, nilai) => {
    setNilaiReal(prevState => ({
        ...prevState,
        [namaKriteria]: nilai
    }));
};

// START SUBMIT
const onSubmit = async (e) => {
    e.preventDefault();
    try {
        const kriteriaIdArray = [];
        // Mendapatkan array kunci-kunci dari objek nilai_real
        const kriteriaKeys = Object.keys(nilai_real);
        // Iterasi melalui array kriteriaKeys untuk mengirim data untuk setiap kriteria
        for (const namaKriteria of kriteriaKeys) {
            const fuzzyDanKeterangan = await FuzzyAndKeterangan(namaKriteria, nilai_real[namaKriteria]);
            const { nilai_fuzzy, keterangan } = fuzzyDanKeterangan;

            const response = await axios.post("/nilai_alternatif", {
                nama_alternatif: alternatif,
                nama_kriteria: namaKriteria,
                nilai_real: nilai_real[namaKriteria], // Menggunakan nilai_real[namaKriteria] untuk mendapatkan nilai real kriteria saat ini
                nilai_fuzzy: nilai_fuzzy,
                keterangan: keterangan,
                dataAlternatifId: alternatifId,
                dataKriteriumId: dataKriteriumId[namaKriteria] ,
            });
            kriteriaIdArray.push(response.data.id);
        }
        alert("Data Alternatif Berhasil Diinput");
        navigate(`/daftar`);
    } catch (error) {
        console.error("Error:", error);
        alert("Terjadi kesalahan pada server");
    }
};
const FuzzyAndKeterangan = async (namaKriteria, nilai_real) => {
    let fuzzyValue, keteranganValue;

    if (namaKriteria === "Rata - Rata Nilai Rapot") {
        if (nilai_real <= 70) {
        fuzzyValue = 1;
        keteranganValue = "Kurang Baik";
        } else if (nilai_real > 70 && nilai_real <= 80) {
        fuzzyValue = 2;
        keteranganValue = "Cukup";
        } else if (nilai_real > 80 && nilai_real <= 90) {
        fuzzyValue = 3;
        keteranganValue = "Baik";
        } else if (nilai_real > 90) {
        fuzzyValue = 4;
        keteranganValue = "Sangat Baik";
        }
    } else if (namaKriteria === "Usia") {
        if (nilai_real <= 10) {
        fuzzyValue = 1;
        keteranganValue = "Kurang Baik";
        } else if (nilai_real == 11) {
        fuzzyValue = 2;
        keteranganValue = "Cukup";
        } else if (nilai_real == 12) {
        fuzzyValue = 3;
        keteranganValue = "Baik";
        } else if (nilai_real == 13) {
        fuzzyValue = 4;
        keteranganValue = "Sangat Baik";
        }
    } else if (namaKriteria === "Jarak") {
        if (nilai_real > 2000) {
        fuzzyValue = 1;
        keteranganValue = "Kurang Baik";
        } else if (nilai_real > 1000 && nilai_real <= 2000) {
        fuzzyValue = 2;
        keteranganValue = "Cukup";
        } else if (nilai_real > 500 && nilai_real <= 1000) {
        fuzzyValue = 3;
        keteranganValue = "Baik";
        } else if (nilai_real < 500) {
        fuzzyValue = 4;
        keteranganValue = "Sangat Baik";
        }
    }
    return {
        nilai_fuzzy: fuzzyValue,
        keterangan: keteranganValue
    };
};
// END SUBMIT

    return (
        <div className="add-nilaialt-column">
        <h2 className="add-nilaialt-judul">Tambah Data Pendaftar</h2>
        <form onSubmit={onSubmit}>
            {/* <p>{msg}</p> */}
            <div className="field">
            <label className="label">Nama Siswa Pendaftar</label>
                <div className="control">
                    <input
                        type="text"
                        className="input"
                        value={alternatif}
                        readOnly // Membuat input tidak bisa diedit
                    />
                </div>
            </div>
            {ambilKriteria.map((item) => (
            <div className="field" key={item.id}>
                <label className="label">{item.nama_kriteria}</label>
                <div className="control">
                <input
                    type="text"
                    className="input"
                    value={nilai_real[item.nama_kriteria] || ""}
                    onChange={(e) => handleInputChange(item.nama_kriteria, e.target.value)}
                    placeholder={`Nilai ${item.nama_kriteria}`}
                />
                </div>
            </div>
            ))}

            <div className="btn-field">
            <Link to={`/daftar/addpendaftar`} className="action-btn">
                Kembali
            </Link>
            <button type="submit" className="action-btn">
                Save
            </button>
            </div>
        </form>
        </div>
    );
}
