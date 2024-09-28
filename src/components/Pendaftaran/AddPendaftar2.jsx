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
    const [subKriteriaData, setSubKriteriaData] = useState([]);


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
        const getSubKriteria = async () => {
            const response = await axios.get("/subkriteria");
            setSubKriteriaData(response.data);
        };
        
        getSubKriteria();
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
                const fuzzyDanKeterangan = Fuzzy(namaKriteria, nilai_real[namaKriteria]);
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
    
    const Fuzzy = (namaKriteria, nilaiReal) => {
        const relevantSubKriteria = subKriteriaData.filter(
            (sub) => sub.kriteriumId === dataKriteriumId[namaKriteria]
            );
        // console.log(relevantSubKriteria)
            for (const sub of relevantSubKriteria) {
                const {tipe_sub, sub_kriteria, bobot, keterangan } = sub;
                const split = sub_kriteria.replace(/[a-zA-Z]/g, '').split('-').map(Number);
                const split2 = Number(sub_kriteria.match(/\d+/)[0]);
                const nilai_real = Number(nilaiReal)
                // console.log(tipe_sub)
                // console.log(nilai_real)
                // console.log(split[0])
                // console.log(split[1])

                if (tipe_sub === 'range') {
                    // console.log("batas bawah :", split[0])
                    // console.log("batas atas :",split[1])
                    // console.log(nilaiReal)
                    // console.log("setelah diubah",nilai_real)

                    if (nilai_real >= split[0] && nilai_real <= split[1]) {
                        console.log('jarak sukses')
                        return { nilai_fuzzy: bobot, keterangan };
                    }
                    // break;
                } else if(tipe_sub=== 'satuan'){
                    // console.log(nilaiReal)
                    // console.log("setelah diubah",nilai_real)
                    // console.log(split2)
                    if (nilai_real === split2) {
                        console.log('usia sukses')
                        return { nilai_fuzzy: bobot, keterangan };
                    }
                    // break;
                }
            }
        
            return { nilai_fuzzy: 0, keterangan: 'Tidak ada yang cocok' };
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
