import '../Siswa/AddSiswa.css';
export function DaftarInputNilaiMapel({ errors, register, label_msg, input_type, regist_nilai }) {
    return (
        <div>
            <div className='daftar-input-box'>
                <label className="daftar-label">{label_msg}</label>
                {/* <input type="hidden" name='nama_mapel' {...register("nama_mapel",{value:mapel})}/>
                <input type="hidden" name='kelas' {...register("kelas",{value:kelas})}/>
                <input type="hidden" name='semester_ke' {...register("semester_ke",{value:semester})}/> */}
                <input type={input_type} name="nilai" className="daftar-input" {...register(regist_nilai, { required: true })}/>
                {errors.label_msg && (
                    <span className="daftar-span">{label_msg} wajib diisi</span>
                )}
            </div>
        </div>
    );
}
