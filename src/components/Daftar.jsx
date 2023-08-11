import { useForm } from 'react-hook-form';
import DaftarCss from './css/Daftar.module.css';
import React, { useState } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'feather-icons-react/build/IconComponents';

export default function Daftar() {
  const { handleSubmit, register, formState:{errors},} = useForm();
  const [step, setStep] = useState(1);

  const onSubmit = (data) => console.log(data);
  const nextStep = () =>{
    setStep(step + 1);
  }
  const prevStep = () =>{
    setStep(step - 1);
  }

  return (
    <div className={DaftarCss.container}>
      <Link to="/" className="btn-back-1">
        <ArrowLeft />
      </Link>
      <h2 className={DaftarCss.judul}>Formulir Pendaftaran PPDB</h2>
      <form className={DaftarCss.formCont} onSubmit={handleSubmit(onSubmit)}>
        {/* Langkah Pertama */}
        {step === 1 && (
          <div>
            <h1 className={DaftarCss.formJudul}>Form 1 : Data Diri</h1>
            <div>
              <label className={DaftarCss.label}>Jalur Pendaftaran</label>
              <select {...register("nama_jalur")}>
                <option value="Zonasi">Zonasi</option>
                <option value="Afirmasi">Afirmasi</option>
                <option value="Prestasi">Prestasi</option>
              </select>
            </div>
            <div>
              <label className={DaftarCss.label}>NISN</label>
              <input type="number"name="NISN" className={DaftarCss.input} {...register("NISN", { required: true })}/>
              {errors.NISN && (
                <span className={DaftarCss.span}>NISN wajib diisi</span>
              )}
            </div>
            <div>
              <label className={DaftarCss.label}>Nama Lengkap</label>
              <input type="text"name="nama" className={DaftarCss.input} {...register("nama", { required: true })}/>
              {errors.nama && (
                <span className={DaftarCss.span}>Nama wajib diisi</span>
              )}
            </div>
            <div>
              <label className={DaftarCss.label}>Jenis Kelamin</label>
              <select {...register("jenis_kelamin")}>
                <option value="Laki - Laki">Laki - Laki</option>
                <option value="Perempuan">Perempuan</option>
              </select>
            </div>
            <div>
              <label className={DaftarCss.label}>NIK</label>
              <input type="number" name="NIK" className={DaftarCss.input} {...register("NIK", { required: true })} />
              {errors.NIK && (
                <span className={DaftarCss.span}>NIK wajib diisi</span>
              )}
            </div>
            <div>
              <label className={DaftarCss.label}> Tempat Lahir</label>
              <input type="text" name="tempat_lahir" className={DaftarCss.input} {...register("tempat_lahir", { required: true })}/>
              {errors.tempat_lahir && (
                <span className={DaftarCss.span}>Tempat Lahir wajib diisi</span>
              )}
            </div>
            <div>
              <label className={DaftarCss.label}> Tanggal Lahir</label>
              <input type="number" name="tanggal_lahir" className={DaftarCss.input} {...register("tanggal_lahir", { required: true})}/>
              {errors.tanggal_lahir && (
                <span className={DaftarCss.span}>Tanggal Lahir wajib diisi</span>
              )}
            </div>
            <div>
              <label className={DaftarCss.label}>Usia</label>
              <input type="number" name="usia" className={DaftarCss.input} {...register("usia", { required: true })}/>
              {errors.usia && (
                <span className={DaftarCss.span}>Usia wajib diisi</span>
              )}
            </div>
            <div>
              <label className={DaftarCss.label}>Asal Sekolah</label>
              <input type="text" name="asal_sekolah" className={DaftarCss.input} {...register("asal_sekolah", { required: true })}/>
              {errors.asal_sekolah && (
                <span className={DaftarCss.span}>Asal Sekolah wajib diisi</span>
              )}
            </div>
          </div>
        )}
        {/* Langkah Ke Dua */}
        {step === 2 && (
          <div>
            <h2 className={DaftarCss.formJudul}>Form 2 : Alamat </h2>
            <div>
              <label className={DaftarCss.label}>Nama Jalan</label>
              <input type="text" name="nama_jalan" className={DaftarCss.input} {...register("nama_jalan", { required: true })}/>
              {errors.nama_jalan && <span className={DaftarCss.span}>Nama Jalan harus Diisi</span>}
            </div>
            <div>
              <label className={DaftarCss.label}>Nomor Rumah</label>
              <input type="number" name="no_rumah" className={DaftarCss.input} {...register("no_rumah", { required: true })}/>
              {errors.no_rumah && <span className={DaftarCss.span}>NO. rumah harus Diisi</span>}
            </div>
            <div>
              <label className={DaftarCss.label}>RT</label>
              <input type="number" name="RT" className={DaftarCss.input} {...register("RT", { required: true })}/>
              {errors.RT && <span className={DaftarCss.span}>RT harus Diisi</span>}
            </div>
            <div>
              <label className={DaftarCss.label}>RW</label>
              <input type="number" name="RW" className={DaftarCss.input} {...register("RW", { required: true })}/>
              {errors.RW && <span className={DaftarCss.span}>RW harus Diisi</span>}
            </div>
            <div>
              <label className={DaftarCss.label}>Desa/Kelurahan</label>
              <input type="text" name="desa" className={DaftarCss.input} {...register("desa", { required: true })}/>
              {errors.desa && <span className={DaftarCss.span}>Desa Jalan harus Diisi</span>}
            </div>
            <div>
              <label className={DaftarCss.label}>Kecamatan</label>
              <input type="text" name="kecamatan" className={DaftarCss.input} {...register("kecamatan", { required: true })}/>
              {errors.kecamatan && <span className={DaftarCss.span}>kecamatan Jalan harus Diisi</span>}
            </div>
            <div>
              <label className={DaftarCss.label}>Jarak Rumah Ke Sekolah</label>
              <input type="number" name="jarak" className={DaftarCss.input} {...register("jarak", { required: true })}/>
              {errors.jarak && <span className={DaftarCss.span}>Jarak harus Diisi</span>}
            </div>
          </div>
        )}
        {/* Langkah Ke Tiga */}
        {step === 3 && (
          <div>
            <h1 className={DaftarCss.formJudul}>Form 3 : Nilai</h1>
            <h2 className={DaftarCss.formJudul}>Nilai Rapor Semester 7 (Kelas 4 semester ganjil)</h2>
            <div>
              <label className={DaftarCss.label}>Bidang Studi PKN</label>
              <input type="hidden" name='nama_mapel' {...register("nama_mapel",{value:"PKN"})}/>
              <input type="hidden" name='kelas' {...register("kelas",{value:"4"})}/>
              <input type="hidden" name='semester_ke' {...register("semester_ke",{value:"1"})}/>
              <input type="number" name="nilai" className={DaftarCss.input} {...register("nilai", { required: true })}/>
              {errors.nilai && <span className={DaftarCss.span}>Nilai harus Diisi</span>}
            </div>
            <div>
              <label className={DaftarCss.label}>Bidang Studi B.Indonesia</label>
              <input type="hidden" name='nama_mapel' {...register("nama_mapel",{value:"B.Indonesia"})}/>
              <input type="hidden" name='kelas' {...register("kelas",{value:"4"})}/>
              <input type="hidden" name='semester_ke' {...register("semester_ke",{value:"1"})}/>
              <input type="number" name="nilai" className={DaftarCss.input} {...register("nilai", { required: true })}/>
              {errors.nilai && <span className={DaftarCss.span}>Nilai harus Diisi</span>}
            </div>
            <div>
              <label className={DaftarCss.label}>Bidang Studi Matematika</label>
              <input type="hidden" name='nama_mapel' {...register("nama_mapel",{value:"Matematika"})}/>
              <input type="hidden" name='kelas' {...register("kelas",{value:"4"})}/>
              <input type="hidden" name='semester_ke' {...register("semester_ke",{value:"1"})}/>
              <input type="number" name="nilai" className={DaftarCss.input} {...register("nilai", { required: true })}/>
              {errors.nilai && <span className={DaftarCss.span}>Nilai harus Diisi</span>}
            </div>
            <div>
              <label className={DaftarCss.label}>Bidang Studi IPS</label>
              <input type="hidden" name='nama_mapel' {...register("nama_mapel",{value:"IPS"})}/>
              <input type="hidden" name='kelas' {...register("kelas",{value:"4"})}/>
              <input type="hidden" name='semester_ke' {...register("semester_ke",{value:"1"})}/>
              <input type="number" name="nilai" className={DaftarCss.input} {...register("nilai", { required: true })}/>
              {errors.nilai && <span className={DaftarCss.span}>Nilai harus Diisi</span>}
            </div>
            <div>
              <label className={DaftarCss.label}>Bidang Studi IPA</label>
              <input type="hidden" name='nama_mapel' {...register("nama_mapel",{value:"IPA"})}/>
              <input type="hidden" name='kelas' {...register("kelas",{value:"4"})}/>
              <input type="hidden" name='semester_ke' {...register("semester_ke",{value:"1"})}/>
              <input type="number" name="nilai" className={DaftarCss.input} {...register("nilai", { required: true })}/>
              {errors.nilai && <span className={DaftarCss.span}>Nilai harus Diisi</span>}
            </div>
          </div>
        )}
        {step === 4 && (
          <div>
            <h1 className={DaftarCss.formJudul}>Form 3 : Nilai</h1>
            <h2 className={DaftarCss.formJudul}>Nilai Rapor Semester 8 (Kelas 4 semester genap)</h2>
            <div>
              <label className={DaftarCss.label}>Bidang Studi PKN</label>
              <input type="hidden" name='nama_mapel' {...register("nama_mapel",{value:"PKN"})}/>
              <input type="hidden" name='kelas' {...register("kelas",{value:"4"})}/>
              <input type="hidden" name='semester_ke' {...register("semester_ke",{value:"2"})}/>
              <input type="number" name="nilai" className={DaftarCss.input} {...register("nilai", { required: true })}/>
              {errors.nilai && <span className={DaftarCss.span}>Nilai harus Diisi</span>}
            </div>
            <div>
              <label className={DaftarCss.label}>Bidang Studi B.Indonesia</label>
              <input type="hidden" name='nama_mapel' {...register("nama_mapel",{value:"B.Indonesia"})}/>
              <input type="hidden" name='kelas' {...register("kelas",{value:"4"})}/>
              <input type="hidden" name='semester_ke' {...register("semester_ke",{value:"2"})}/>
              <input type="number" name="nilai" className={DaftarCss.input} {...register("nilai", { required: true })}/>
              {errors.nilai && <span className={DaftarCss.span}>Nilai harus Diisi</span>}
            </div>
            <div>
              <label className={DaftarCss.label}>Bidang Studi Matematika</label>
              <input type="hidden" name='nama_mapel' {...register("nama_mapel",{value:"Matematika"})}/>
              <input type="hidden" name='kelas' {...register("kelas",{value:"4"})}/>
              <input type="hidden" name='semester_ke' {...register("semester_ke",{value:"2"})}/>
              <input type="number" name="nilai" className={DaftarCss.input} {...register("nilai", { required: true })}/>
              {errors.nilai && <span className={DaftarCss.span}>Nilai harus Diisi</span>}
            </div>
            <div>
              <label className={DaftarCss.label}>Bidang Studi IPS</label>
              <input type="hidden" name='nama_mapel' {...register("nama_mapel",{value:"IPS"})}/>
              <input type="hidden" name='kelas' {...register("kelas",{value:"4"})}/>
              <input type="hidden" name='semester_ke' {...register("semester_ke",{value:"2"})}/>
              <input type="number" name="nilai" className={DaftarCss.input} {...register("nilai", { required: true })}/>
              {errors.nilai && <span className={DaftarCss.span}>Nilai harus Diisi</span>}
            </div>
            <div>
              <label className={DaftarCss.label}>Bidang Studi IPA</label>
              <input type="hidden" name='nama_mapel' {...register("nama_mapel",{value:"IPA"})}/>
              <input type="hidden" name='kelas' {...register("kelas",{value:"4"})}/>
              <input type="hidden" name='semester_ke' {...register("semester_ke",{value:"2"})}/>
              <input type="number" name="nilai" className={DaftarCss.input} {...register("nilai", { required: true })}/>
              {errors.nilai && <span className={DaftarCss.span}>Nilai harus Diisi</span>}
            </div>
          </div>
        )}
        {step === 5 && (
          <div>
            <h1 className={DaftarCss.formJudul}>Form 3 : Nilai</h1>
            <h2 className={DaftarCss.formJudul}>Nilai Rapor Semester 9 (Kelas 5 semester ganjil)</h2>
            <div>
              <label className={DaftarCss.label}>Bidang Studi PKN</label>
              <input type="hidden" name='nama_mapel' {...register("nama_mapel",{value:"PKN"})}/>
              <input type="hidden" name='kelas' {...register("kelas",{value:"5"})}/>
              <input type="hidden" name='semester_ke' {...register("semester_ke",{value:"1"})}/>
              <input type="number" name="nilai" className={DaftarCss.input} {...register("nilai", { required: true })}/>
              {errors.nilai && <span className={DaftarCss.span}>Nilai harus Diisi</span>}
            </div>
            <div>
              <label className={DaftarCss.label}>Bidang Studi B.Indonesia</label>
              <input type="hidden" name='nama_mapel' {...register("nama_mapel",{value:"B.Indonesia"})}/>
              <input type="hidden" name='kelas' {...register("kelas",{value:"5"})}/>
              <input type="hidden" name='semester_ke' {...register("semester_ke",{value:"1"})}/>
              <input type="number" name="nilai" className={DaftarCss.input} {...register("nilai", { required: true })}/>
              {errors.nilai && <span className={DaftarCss.span}>Nilai harus Diisi</span>}
            </div>
            <div>
              <label className={DaftarCss.label}>Bidang Studi Matematika</label>
              <input type="hidden" name='nama_mapel' {...register("nama_mapel",{value:"Matematika"})}/>
              <input type="hidden" name='kelas' {...register("kelas",{value:"5"})}/>
              <input type="hidden" name='semester_ke' {...register("semester_ke",{value:"1"})}/>
              <input type="number" name="nilai" className={DaftarCss.input} {...register("nilai", { required: true })}/>
              {errors.nilai && <span className={DaftarCss.span}>Nilai harus Diisi</span>}
            </div>
            <div>
              <label className={DaftarCss.label}>Bidang Studi IPS</label>
              <input type="hidden" name='nama_mapel' {...register("nama_mapel",{value:"IPS"})}/>
              <input type="hidden" name='kelas' {...register("kelas",{value:"5"})}/>
              <input type="hidden" name='semester_ke' {...register("semester_ke",{value:"1"})}/>
              <input type="number" name="nilai" className={DaftarCss.input} {...register("nilai", { required: true })}/>
              {errors.nilai && <span className={DaftarCss.span}>Nilai harus Diisi</span>}
            </div>
            <div>
              <label className={DaftarCss.label}>Bidang Studi IPA</label>
              <input type="hidden" name='nama_mapel' {...register("nama_mapel",{value:"IPA"})}/>
              <input type="hidden" name='kelas' {...register("kelas",{value:"5"})}/>
              <input type="hidden" name='semester_ke' {...register("semester_ke",{value:"1"})}/>
              <input type="number" name="nilai" className={DaftarCss.input} {...register("nilai", { required: true })}/>
              {errors.nilai && <span className={DaftarCss.span}>Nilai harus Diisi</span>}
            </div>
          </div>
        )}
        {step === 6 && (
          <div>
            <h1 className={DaftarCss.formJudul}>Form 3 : Nilai</h1>
            <h2 className={DaftarCss.formJudul}>Nilai Rapor Semester 10 (Kelas 5 semester genap)</h2>
            <div>
              <label className={DaftarCss.label}>Bidang Studi PKN</label>
              <input type="hidden" name='nama_mapel' {...register("nama_mapel",{value:"PKN"})}/>
              <input type="hidden" name='kelas' {...register("kelas",{value:"5"})}/>
              <input type="hidden" name='semester_ke' {...register("semester_ke",{value:"2"})}/>
              <input type="number" name="nilai" className={DaftarCss.input} {...register("nilai", { required: true })}/>
              {errors.nilai && <span className={DaftarCss.span}>Nilai harus Diisi</span>}
            </div>
            <div>
              <label className={DaftarCss.label}>Bidang Studi B.Indonesia</label>
              <input type="hidden" name='nama_mapel' {...register("nama_mapel",{value:"B.Indonesia"})}/>
              <input type="hidden" name='kelas' {...register("kelas",{value:"5"})}/>
              <input type="hidden" name='semester_ke' {...register("semester_ke",{value:"2"})}/>
              <input type="number" name="nilai" className={DaftarCss.input} {...register("nilai", { required: true })}/>
              {errors.nilai && <span className={DaftarCss.span}>Nilai harus Diisi</span>}
            </div>
            <div>
              <label className={DaftarCss.label}>Bidang Studi Matematika</label>
              <input type="hidden" name='nama_mapel' {...register("nama_mapel",{value:"Matematika"})}/>
              <input type="hidden" name='kelas' {...register("kelas",{value:"5"})}/>
              <input type="hidden" name='semester_ke' {...register("semester_ke",{value:"2"})}/>
              <input type="number" name="nilai" className={DaftarCss.input} {...register("nilai", { required: true })}/>
              {errors.nilai && <span className={DaftarCss.span}>Nilai harus Diisi</span>}
            </div>
            <div>
              <label className={DaftarCss.label}>Bidang Studi IPS</label>
              <input type="hidden" name='nama_mapel' {...register("nama_mapel",{value:"IPS"})}/>
              <input type="hidden" name='kelas' {...register("kelas",{value:"5"})}/>
              <input type="hidden" name='semester_ke' {...register("semester_ke",{value:"2"})}/>
              <input type="number" name="nilai" className={DaftarCss.input} {...register("nilai", { required: true })}/>
              {errors.nilai && <span className={DaftarCss.span}>Nilai harus Diisi</span>}
            </div>
            <div>
              <label className={DaftarCss.label}>Bidang Studi IPA</label>
              <input type="hidden" name='nama_mapel' {...register("nama_mapel",{value:"IPA"})}/>
              <input type="hidden" name='kelas' {...register("kelas",{value:"5"})}/>
              <input type="hidden" name='semester_ke' {...register("semester_ke",{value:"2"})}/>
              <input type="number" name="nilai" className={DaftarCss.input} {...register("nilai", { required: true })}/>
              {errors.nilai && <span className={DaftarCss.span}>Nilai harus Diisi</span>}
            </div>
          </div>
        )}
        {step === 7 && (
          <div>
            <h1 className={DaftarCss.formJudul}>Form 3 : Nilai</h1>
            <h2 className={DaftarCss.formJudul}>Nilai Rapor Semester 11 (Kelas 6 semester ganjil)</h2>
            <div>
              <label className={DaftarCss.label}>Bidang Studi PKN</label>
              <input type="hidden" name='nama_mapel' {...register("nama_mapel",{value:"PKN"})}/>
              <input type="hidden" name='kelas' {...register("kelas",{value:"6"})}/>
              <input type="hidden" name='semester_ke' {...register("semester_ke",{value:"1"})}/>
              <input type="number" name="nilai" className={DaftarCss.input} {...register("nilai", { required: true })}/>
              {errors.nilai && <span className={DaftarCss.span}>Nilai harus Diisi</span>}
            </div>
            <div>
              <label className={DaftarCss.label}>Bidang Studi B.Indonesia</label>
              <input type="hidden" name='nama_mapel' {...register("nama_mapel",{value:"B.Indonesia"})}/>
              <input type="hidden" name='kelas' {...register("kelas",{value:"6"})}/>
              <input type="hidden" name='semester_ke' {...register("semester_ke",{value:"1"})}/>
              <input type="number" name="nilai" className={DaftarCss.input} {...register("nilai", { required: true })}/>
              {errors.nilai && <span className={DaftarCss.span}>Nilai harus Diisi</span>}
            </div>
            <div>
              <label className={DaftarCss.label}>Bidang Studi Matematika</label>
              <input type="hidden" name='nama_mapel' {...register("nama_mapel",{value:"Matematika"})}/>
              <input type="hidden" name='kelas' {...register("kelas",{value:"6"})}/>
              <input type="hidden" name='semester_ke' {...register("semester_ke",{value:"1"})}/>
              <input type="number" name="nilai" className={DaftarCss.input} {...register("nilai", { required: true })}/>
              {errors.nilai && <span className={DaftarCss.span}>Nilai harus Diisi</span>}
            </div>
            <div>
              <label className={DaftarCss.label}>Bidang Studi IPS</label>
              <input type="hidden" name='nama_mapel' {...register("nama_mapel",{value:"IPS"})}/>
              <input type="hidden" name='kelas' {...register("kelas",{value:"6"})}/>
              <input type="hidden" name='semester_ke' {...register("semester_ke",{value:"1"})}/>
              <input type="number" name="nilai" className={DaftarCss.input} {...register("nilai", { required: true })}/>
              {errors.nilai && <span className={DaftarCss.span}>Nilai harus Diisi</span>}
            </div>
            <div>
              <label className={DaftarCss.label}>Bidang Studi IPA</label>
              <input type="hidden" name='nama_mapel' {...register("nama_mapel",{value:"IPA"})}/>
              <input type="hidden" name='kelas' {...register("kelas",{value:"6"})}/>
              <input type="hidden" name='semester_ke' {...register("semester_ke",{value:"1"})}/>
              <input type="number" name="nilai" className={DaftarCss.input} {...register("nilai", { required: true })}/>
              {errors.nilai && <span className={DaftarCss.span}>Nilai harus Diisi</span>}
            </div>
          </div>
        )}

        <div>
          {step > 1 && (
            <button type="button" className={DaftarCss.button} onClick={prevStep}>Kembali</button>
          )}
          {step < 7 && (
            <button type="button" className={DaftarCss.button} onClick={nextStep}>Selanjutnya</button>
          )}
          {step === 7 && <button type="submit" className={DaftarCss.button} >Submit</button>}
        </div>
      </form>
    </div>
  );
}

