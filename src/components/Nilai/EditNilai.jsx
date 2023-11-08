import { useForm } from 'react-hook-form';
import '../Siswa/AddSiswa.css';
import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';
import { EditInputNilaiMapel } from './DaftarInputNilaiMapel';

export default function EditDaftar() {
    const { handleSubmit, register, formState: { errors }, setValue } = useForm();
    const [step, setStep] = useState(1);
    const navigate = useNavigate();
    // Simpan data nilai yang sudah ada dalam state
    const [existingNilai, setExistingNilai] = useState([]);
    const {id} = useParams();

    // Fungsi untuk mengambil data nilai yang sudah ada
    const fetchData = async () => {
        try {
        const response = await axios.get(`http://localhost:5000/data_nilai/${id}`);
        setExistingNilai(response.data);
        console.log(existingNilai);
        } catch (e) {
        console.log("error dalam mengambil data nilai:", e);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const onSubmit = async (data) => {
        try {
        // Proses pengiriman data nilai yang diubah
        await axios.patch(`http://localhost:5000/data_nilai/${id}`, data); // Ganti URL sesuai dengan endpoint yang sesuai
        alert("Data Nilai Berhasil Diubah");
        navigate("/siswalist");
        } catch (e) {
        console.log("error dalam submit data:", e);
        alert(e.response.data.msg);
        }
    };

    const nextStep = () => {
        setStep(step + 1);
    }

    const prevStep = () => {
        setStep(step - 1);
    }

    return (
        <div className="Daftar-container">
        <div className="daftar-navbar">
            <h2 className="daftar-judul">Edit Data Nilai</h2>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
            {/* Tampilkan nilai yang sudah ada berdasarkan mata pelajaran yang ingin diedit */}
            {step === 1 && (
            <div className='daftar-form'>
                <h2 className="daftar-judul-form">Nilai Rapor Semester 7 (Kelas 4 semester ganjil)</h2>
                {<EditInputNilaiMapel errors={errors} register={register} regist_nilai="pkn1" label_msg="Bidang Studi PKN" defaultValue={existingNilai.pkn1} input_type="text" />}
                {<EditInputNilaiMapel errors={errors} register={register} regist_nilai="bindo1" label_msg="Bidang Studi B.INDO" defaultValue={existingNilai.bindo1} input_type="text" />}
                {<EditInputNilaiMapel errors={errors} register={register} regist_nilai="mtk1" label_msg="Bidang Studi MTK" defaultValue={existingNilai.mtk1} input_type="text" />}
                {<EditInputNilaiMapel errors={errors} register={register} regist_nilai="ips1" label_msg="Bidang Studi IPS" defaultValue={existingNilai.ips1} input_type="text" />}
                {<EditInputNilaiMapel errors={errors} register={register} regist_nilai="ipa1" label_msg="Bidang Studi IPA" defaultValue={existingNilai.ipa1} input_type="text" />}
            </div>
            )}
            {step === 2 && (
            <div className='daftar-form'>
                <h2 className="daftar-judul-form">Nilai Rapor Semester 8 (Kelas 4 semester genap)</h2>
                {<EditInputNilaiMapel errors={errors} register={register} regist_nilai="pkn2" label_msg="Bidang Studi PKN" defaultValue={existingNilai.pkn2} input_type="text" />}
                {<EditInputNilaiMapel errors={errors} register={register} regist_nilai="bindo2" label_msg="Bidang Studi B.INDO" defaultValue={existingNilai.bindo2} input_type="text" />}
                {<EditInputNilaiMapel errors={errors} register={register} regist_nilai="mtk2" label_msg="Bidang Studi MTK" defaultValue={existingNilai.mtk2} input_type="text" />}
                {<EditInputNilaiMapel errors={errors} register={register} regist_nilai="ips2" label_msg="Bidang Studi IPS" defaultValue={existingNilai.ips2} input_type="text" />}
                {<EditInputNilaiMapel errors={errors} register={register} regist_nilai="ipa2" label_msg="Bidang Studi IPA" defaultValue={existingNilai.ipa2} input_type="text" />}
            </div>
            )}
            {step === 3 && (
            <div className='daftar-form'>
                <h2 className="daftar-judul-form">Nilai Rapor Semester 9 (Kelas 5 semester ganjil)</h2>
                {<EditInputNilaiMapel errors={errors} register={register} regist_nilai="pkn3" label_msg="Bidang Studi PKN" defaultValue={existingNilai.pkn3} input_type="text" />}
                {<EditInputNilaiMapel errors={errors} register={register} regist_nilai="bindo3" label_msg="Bidang Studi B.INDO" defaultValue={existingNilai.bindo3} input_type="text" />}
                {<EditInputNilaiMapel errors={errors} register={register} regist_nilai="mtk3" label_msg="Bidang Studi MTK" defaultValue={existingNilai.mtk3} input_type="text" />}
                {<EditInputNilaiMapel errors={errors} register={register} regist_nilai="ips3" label_msg="Bidang Studi IPS" defaultValue={existingNilai.ips3} input_type="text" />}
                {<EditInputNilaiMapel errors={errors} register={register} regist_nilai="ipa3" label_msg="Bidang Studi IPA" defaultValue={existingNilai.ipa3} input_type="text" />}
            </div>
            )}
            {step === 4 && (
            <div className='daftar-form'>
                <h2 className="daftar-judul-form">Nilai Rapor Semester 10 (Kelas 5 semester genap)</h2>
                {<EditInputNilaiMapel errors={errors} register={register} regist_nilai="pkn4" label_msg="Bidang Studi PKN" defaultValue={existingNilai.pkn4} input_type="text" />}
                {<EditInputNilaiMapel errors={errors} register={register} regist_nilai="bindo4" label_msg="Bidang Studi B.INDO" defaultValue={existingNilai.bindo4} input_type="text" />}
                {<EditInputNilaiMapel errors={errors} register={register} regist_nilai="mtk4" label_msg="Bidang Studi MTK" defaultValue={existingNilai.mtk4} input_type="text" />}
                {<EditInputNilaiMapel errors={errors} register={register} regist_nilai="ips4" label_msg="Bidang Studi IPS" defaultValue={existingNilai.ips4} input_type="text" />}
                {<EditInputNilaiMapel errors={errors} register={register} regist_nilai="ipa4" label_msg="Bidang Studi IPA" defaultValue={existingNilai.ipa4} input_type="text" />}
            </div>
            )}
            {step === 5 && (
            <div className='daftar-form'>
                <h2 className="daftar-judul-form">Nilai Rapor Semester 11 (Kelas 6 semester ganjil)</h2>
                {<EditInputNilaiMapel errors={errors} register={register} regist_nilai="pkn5" label_msg="Bidang Studi PKN" defaultValue={existingNilai.pkn5} input_type="text" />}
                {<EditInputNilaiMapel errors={errors} register={register} regist_nilai="bindo5" label_msg="Bidang Studi B.INDO" defaultValue={existingNilai.bindo5} input_type="text" />}
                {<EditInputNilaiMapel errors={errors} register={register} regist_nilai="mtk5" label_msg="Bidang Studi MTK" defaultValue={existingNilai.mtk5} input_type="text" />}
                {<EditInputNilaiMapel errors={errors} register={register} regist_nilai="ips5" label_msg="Bidang Studi IPS" defaultValue={existingNilai.ips5} input_type="text" />}
                {<EditInputNilaiMapel errors={errors} register={register} regist_nilai="ipa5" label_msg="Bidang Studi IPA" defaultValue={existingNilai.ipa5} input_type="text" />}
            </div>
            )}
            {/* ... Sisakan langkah-langkah berikutnya hingga selesai */}
            <div>
            {step > 1 && (
                <button type="button" className="btnNextPrev" onClick={prevStep}>Kembali</button>
            )}
            {step < 5 && (
                <button type="button" className="btnNextPrev" onClick={nextStep}>Selanjutnya</button>
            )}
            {step === 5 && <button type="submit" className="btnNextPrev">Submit</button>}
            </div>
        </form>
        </div>
    );
}
