import './css/Daftar.css';

export function DaftarInputNilaiMapel({ errors, register, label_msg, input_type }) {
    return (
        <div>
             <div className='daftar-input-box'>
              <label className="daftar-label">{label_msg}</label>
              <input type="hidden" name='nama_mapel' {...register("nama_mapel",{value:"PKN"})}/>
              <input type="hidden" name='kelas' {...register("kelas",{value:"4"})}/>
              <input type="hidden" name='semester_ke' {...register("semester_ke",{value:"1"})}/>
              <input type="number" name="nilai" className="daftar-input" {...register("nilai", { required: true })}/>
              {errors.nilai && <span className="daftar-span">Nilai harus Diisi</span>}
            </div>
        </div>
    );
}
export  function DaftarInputNilaiMapel2({ errors, register, label_msg, input_type }) {
    return (
        <div>
             <div className='daftar-input-box'>
              <label className="daftar-label">{label_msg}</label>
              <input type="hidden" name='nama_mapel' {...register("nama_mapel",{value:"PKN"})}/>
              <input type="hidden" name='kelas' {...register("kelas",{value:"4"})}/>
              <input type="hidden" name='semester_ke' {...register("semester_ke",{value:"2"})}/>
              <input type="number" name="nilai" className="daftar-input" {...register("nilai", { required: true })}/>
              {errors.nilai && <span className="daftar-span">Nilai harus Diisi</span>}
            </div>
        </div>
    );
}
export  function DaftarInputNilaiMapel3({ errors, register, label_msg, input_type }) {
    return (
        <div>
             <div className='daftar-input-box'>
              <label className="daftar-label">{label_msg}</label>
              <input type="hidden" name='nama_mapel' {...register("nama_mapel",{value:"PKN"})}/>
              <input type="hidden" name='kelas' {...register("kelas",{value:"5"})}/>
              <input type="hidden" name='semester_ke' {...register("semester_ke",{value:"1"})}/>
              <input type="number" name="nilai" className="daftar-input" {...register("nilai", { required: true })}/>
              {errors.nilai && <span className="daftar-span">Nilai harus Diisi</span>}
            </div>
        </div>
    );
}
export  function DaftarInputNilaiMapel4({ errors, register, label_msg, input_type }) {
    return (
        <div>
             <div className='daftar-input-box'>
              <label className="daftar-label">{label_msg}</label>
              <input type="hidden" name='nama_mapel' {...register("nama_mapel",{value:"PKN"})}/>
              <input type="hidden" name='kelas' {...register("kelas",{value:"5"})}/>
              <input type="hidden" name='semester_ke' {...register("semester_ke",{value:"2"})}/>
              <input type="number" name="nilai" className="daftar-input" {...register("nilai", { required: true })}/>
              {errors.nilai && <span className="daftar-span">Nilai harus Diisi</span>}
            </div>
        </div>
    );
}
export  function DaftarInputNilaiMapel5({ errors, register, label_msg, input_type }) {
    return (
        <div>
             <div className='daftar-input-box'>
              <label className="daftar-label">{label_msg}</label>
              <input type="hidden" name='nama_mapel' {...register("nama_mapel",{value:"PKN"})}/>
              <input type="hidden" name='kelas' {...register("kelas",{value:"6"})}/>
              <input type="hidden" name='semester_ke' {...register("semester_ke",{value:"1"})}/>
              <input type={input_type} name="nilai" className="daftar-input" {...register("nilai", { required: true })}/>
              {errors.nilai && <span className="daftar-span">Nilai harus Diisi</span>}
            </div>
        </div>
    );
}
