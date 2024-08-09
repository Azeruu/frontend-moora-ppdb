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
                    dataKriteriumId: dataKriteriumId[namaKriteria],
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

    const checkRange = (nilaiAktual, rangeString) => {
        const range = rangeString.replace(/[a-zA-Z]/g, '').split('-').map(Number);
        return nilaiAktual >= range[0] && nilaiAktual <= range[1];
    };

    const FuzzyAndKeterangan = async (namaKriteria, nilai_real) => {
        let fuzzyValue = null;
        let keteranganValue = null;
    
        const response = await axios.get(`/subkriteria?kriteriumId=${dataKriteriumId[namaKriteria]}`);
        const subKriteriaList = response.data;
    
        // console.log('SubKriteria List:', subKriteriaList);
    
        for (const subKriteria of subKriteriaList) {
            const { sub_kriteria, bobot, keterangan, tipe_subKriteria } = subKriteria;
            
            console.log('sub kriteria:', sub_kriteria); // Ini untuk mengecek tipe_subKriteria
            console.log('boobot:', bobot); // Ini untuk mengecek tipe_subKriteria
            console.log('keterangan:', keterangan); // Ini untuk mengecek tipe_subKriteria
            console.log('Tipe SubKriteria:', tipe_subKriteria); // Ini untuk mengecek tipe_subKriteria
    
            switch (tipe_subKriteria) {
                case "numerik":
                    if (checkRange(nilai_real, sub_kriteria)) {
                        return { nilai_fuzzy: bobot, keterangan };
                    }
                    break;
    
                case "kategori":
                    if (parseInt(sub_kriteria, 10) === parseInt(nilai_real, 10)) {
                        return { nilai_fuzzy: bobot, keterangan };
                    }
                    break;
    
                default:
                    console.error("Tipe sub-kriteria tidak valid");
                    break;
            }
        }
        return { nilai_fuzzy: fuzzyValue, keterangan: keteranganValue };
    };
    
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
