import './AddPendaftar.css';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from "../../lib/axios";

export default function Daftar2() {
    const [alternatif, setAlternatif] = useState("");
    const [jalur, setJalur] = useState("");
    const [nilai_real, setNilaiReal] = useState({});
    const [alternatifId, setAlternatifId] = useState('');
    const [ambilAlt, setAmbilAlt] = useState([]);
    const [ambilKriteria, setAmbilKriteria] = useState([]);
    const [dataKriteriumId, setDataKriteriumId] = useState({});
    const navigate = useNavigate();
    const {namaAlternatif, jalurId} = useParams();

    // START AMBIL DATA
    useEffect(()=>{
        const getKriteria = async () => {
            const response = await axios.get("/kriteria");
            const dataKriteria = response.data;
            const filteredKriteria = dataKriteria.filter(kriteria => kriteria.jalur_pendaftaran === jalur);
            setAmbilKriteria(filteredKriteria);

            // Membuat objek untuk menyimpan ID kriteria berdasarkan nama kriterianya
            const kriteriaIdMap = {};
            response.data.forEach(kriteria => {
                kriteriaIdMap[kriteria.nama_kriteria] = kriteria.id;
            });
            setDataKriteriumId(kriteriaIdMap);
        };

        const getAlternatif = async () => {
            const response = await axios.get("/alternatif");
            setAmbilAlt(response.data);
        };

        getKriteria();
        getAlternatif();
    },[jalur]);

    useEffect(() => {
        if (namaAlternatif && ambilAlt.length) {
            const selectedAlternatif = ambilAlt.find(item => item.nama_alternatif === namaAlternatif);
            if (selectedAlternatif) {
                setAlternatif(selectedAlternatif.nama_alternatif);
                setJalur(selectedAlternatif.nama_jalur);
                setAlternatifId(selectedAlternatif.id);
            }
        }
    }, [namaAlternatif, ambilAlt]);
    // END AMBIL DATA

    const handleInputChange = (namaKriteria, nilai) => {
        // console.log('namaKriteria:', namaKriteria, 'nilai:', nilai);
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
            const kriteriaKeys = Object.keys(nilai_real);
            for (const namaKriteria of kriteriaKeys) {
                const fuzzyDanKeterangan = await FuzzyAndKeterangan(namaKriteria, nilai_real[namaKriteria]);
                const { nilai_fuzzy, keterangan } = fuzzyDanKeterangan;

                const response = await axios.post("/nilai_alternatif", {
                    nama_alternatif: alternatif,
                    jalur_pendaftaran: jalur,
                    nama_kriteria: namaKriteria,
                    nilai_real: nilai_real[namaKriteria],
                    nilai_fuzzy: nilai_fuzzy,
                    keterangan: keterangan,
                    jalurId : jalurId,
                    dataAlternatifId: alternatifId,
                    kriteriumId: dataKriteriumId[namaKriteria],
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

    const FuzzyAndKeterangan = (namaKriteria, nilaiReal) => {
        let nilai_fuzzy = 0;
        let keterangan = "";
        
        // Logika untuk kriteria Jarak
        if (namaKriteria === "Jarak") {
            if (nilaiReal >= 0 && nilaiReal <= 500) {
                nilai_fuzzy = 5;
                keterangan = "sangat baik";
            } else if (nilaiReal > 500 && nilaiReal <= 750) {
                nilai_fuzzy = 4;
                keterangan = "Baik";
            } else if (nilaiReal > 750 && nilaiReal <= 1000) {
                nilai_fuzzy = 3;
                keterangan = "cukup";
            } else if (nilaiReal > 1000 && nilaiReal <= 1500) {
                nilai_fuzzy = 2;
                keterangan = "buruk";
            } else if (nilaiReal > 1500 && nilaiReal <= 2000) {
                nilai_fuzzy = 1;
                keterangan = "sangat buruk";
            }
        }
        
        // Logika untuk kriteria Usia
        if (namaKriteria === "Usia") {
            if (nilaiReal == 15) {
                nilai_fuzzy = 5;
                keterangan = "sangat baik";
            } else if (nilaiReal == 14) {
                nilai_fuzzy = 4;
                keterangan = "Baik";
            } else if (nilaiReal == 13) {
                nilai_fuzzy = 3;
                keterangan = "cukup";
            } else if (nilaiReal == 12) {
                nilai_fuzzy = 2;
                keterangan = "buruk";
            } else if (nilaiReal == 11) {
                nilai_fuzzy = 1;
                keterangan = "sangat buruk";
            }
        }
        
        return { nilai_fuzzy, keterangan };
        };

    // const FuzzyAndKeterangan = async (namaKriteria, nilai_real) => {
    //     const kriteriumId = dataKriteriumId[namaKriteria];
    //     try {
    //         const response = await axios.get(`/subkriteria?kriteriumId=${kriteriumId}`);
    //         const subKriteriaList = response.data;
    
    //         // Debugging: Cek data subKriteriaList
    //         // console.log('subKriteriaList:', subKriteriaList);
    
    //         for (const subKriteria of subKriteriaList) {
    //             const { nama_kriteria, sub_kriteria, bobot, keterangan } = subKriteria;
    //             const nilaiSubKriteria = sub_kriteria.replace(/[a-zA-Z]/g, '').split('-').map(Number);
    
    //             if (namaKriteria === 'Jarak') {
    //                 if (nilai_real >= nilaiSubKriteria[0] && nilai_real <= nilaiSubKriteria[1]) {
    //                     return { nilai_fuzzy: bobot, keterangan };
    //                 }
    //                 break;
    //             } else if (namaKriteria === 'Usia') {
    //                 if (nilai_real === Number(nilaiSubKriteria)) {
    //                     return { nilai_fuzzy: bobot, keterangan };
    //                 }
    //                 break;
    //             }
    //         }
    //     } catch (error) {
    //         console.error('Error fetching subkriteria:', error);
    //     }
    
    //     return { nilai_fuzzy: 0, keterangan: 'Tidak ada yang cocok' };
    // };
    
    
    // END SUBMIT

    return (
        <div className="add-nilaialt-column">
            <h2 className="add-nilaialt-judul">Tambah Data Pendaftar</h2>
            <form onSubmit={onSubmit}>
                <div className="field">
                    <label className="label">Nama Siswa Pendaftar</label>
                    <div className="control">
                        <input
                            type="text"
                            className="input"
                            value={alternatif}
                            readOnly
                        />
                    </div>
                    <div className="control">
                        <input
                            type="text"
                            className="input"
                            value={jalur}
                            readOnly
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
                                placeholder={`${item.nama_kriteria}`}
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
