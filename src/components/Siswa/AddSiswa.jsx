import { useForm } from 'react-hook-form';
import './AddSiswa.css'
import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'feather-icons-react/build/IconComponents';
import DaftarInputUserTextNumber from './DaftarInputUserTextNumber';

export default function Daftar() {
  const { handleSubmit, register, formState:{errors}} = useForm();
  const [step, setStep] = useState(1);
  const [ jalur, setJalur] = useState([]);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("http://localhost:5000/data_siswa", data);
      console.log("Data Berhasil Di Input", response.data);
      alert("Data Siswa Berhasil Di Input, Silahkan Lanjutkan Ke Input Nilai")
      navigate("/siswalist/addnilai");
    } catch (e) {
      console.log("error dalam submit data :", e);
      alert(e.response.data.msg);
    }
  };

  const getJalur = async(data) =>{
      const response = await axios.get("http://localhost:5000/jalur", data);
      setJalur(response.data);
  }
  useEffect(() => {
    getJalur();
}, []);

  const nextStep = () =>{
    setStep(step + 1);
  }
  const prevStep = () =>{
    setStep(step - 1);
  }

  return (
    <div className="Daftar-container">
      <div className="daftar-navbar">
        <h2 className="daftar-judul">Formulir Pendaftaran PPDB</h2>
        <div className='daftar-step'>
          <div className="step">
            <button className={`daftar-indicator ${step === 1 ?'daftar-indicator-active':''}`} onClick={()=>setStep(step - 1)}>1</button>
            <p>Data Diri</p>
          </div>
          <div className="step">
          {/* <p className={`indicator-line ${step === 2 ?'indicator-line-active':''}`}></p> */}
              <p className={`daftar-indicator ${step === 2 ?'daftar-indicator-active':''}`}>2</p>
            <p>Alamat </p>
          </div>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Langkah Pertama */}
        {step === 1 && (
          <div className='daftar-form'>
            <h2 className="daftar-judul-form">Form 1 : Data Diri</h2>

            <div className='daftar-input-box'>
              <label className="daftar-label">Jalur Pendaftaran</label>
              <select className='daftar-input'{...register("nama_jalur", {required:true})}>
                {jalur.map((path) => (
                  <option key={path.id} value={path.nama_jalur}>
                    {path.nama_jalur}
                  </option>
                ))}
              </select>
            </div>

              {<DaftarInputUserTextNumber errors={errors} register={register} regist_msg="NISN" label_msg="NISN" input_type="number"/>}
              {<DaftarInputUserTextNumber errors={errors} register={register} regist_msg="nama_lengkap" label_msg="Nama Lengkap" input_type="text" />}

            <div className='daftar-input-box'>
              <label className="daftar-label">Jenis Kelamin</label>
              <select {...register("jenis_kelamin", {required:true})} >
                <option value="Laki - Laki"> Laki - Laki</option>
                <option value="Perempuan">Perempuan</option>
              </select>
            </div>

              {<DaftarInputUserTextNumber errors={errors} register={register} regist_msg="NIK" label_msg="NIK" input_type="number" />}
              {<DaftarInputUserTextNumber errors={errors} register={register} regist_msg="tempat_lahir" label_msg="Tempat Lahir" input="text" />}
              {<DaftarInputUserTextNumber errors={errors} register={register} regist_msg="tgl_lahir" label_msg="Tanggal Lahir" input_type="date" />}
              {<DaftarInputUserTextNumber errors={errors} register={register} regist_msg="usia" label_msg="Usia" input_type="number" />}
              {<DaftarInputUserTextNumber errors={errors} register={register} regist_msg="asal_sekolah" label_msg="Asal Sekolah" input_type="text" />}

          </div>
        )}
        {/* Langkah Ke Dua */}
        {step === 2 && (
          <div className='daftar-form'>
            <h2 className="daftar-judul-form">Form 2 : Alamat </h2>
            {<DaftarInputUserTextNumber errors={errors} register={register} regist_msg="nama_jalan" label_msg="Nama Jalan" input_type="text" />}
            {<DaftarInputUserTextNumber errors={errors} register={register} regist_msg="no_rumah" label_msg="Nomor Rumah" input_type="text" />}
            {<DaftarInputUserTextNumber errors={errors} register={register} regist_msg="RT" label_msg="RT" input_type="text" />}
            {<DaftarInputUserTextNumber errors={errors} register={register} regist_msg="RW" label_msg="RW" input_type="text" />}
            {<DaftarInputUserTextNumber errors={errors} register={register} regist_msg="Desa" label_msg="Desa " input_type="text" />}
            {<DaftarInputUserTextNumber errors={errors} register={register} regist_msg="Kecamatan" label_msg="Kecamatan " input_type="text" />}
            {<DaftarInputUserTextNumber errors={errors} register={register} regist_msg="jarak" label_msg="Jarak " input_type="text" />}
          </div>
        )}
        <div>
          {step > 1 && (
            <button type="button" className="btnNextPrev"onClick={prevStep}>Kembali</button>
          )}
          {step < 2 && (
            <button type="button" className="btnNextPrev"onClick={nextStep}>Selanjutnya</button>
          )}
          {step === 2 && <button type="submit" className="btnNextPrev">Submit</button>}
        </div>
      </form>
      </div>
  );
}

