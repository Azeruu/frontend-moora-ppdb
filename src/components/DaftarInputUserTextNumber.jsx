import './css/Daftar.css';

export default function DaftarInputUserTextNumber({ errors, register, label_msg, input_type }) {
    return (
        <div className='daftar-input-box'>
            <label className="daftar-label">{label_msg}</label>
            <input type={input_type} className="daftar-input"{...register(label_msg, { required: true })} />
            {errors.label_msg && (
                <span className="daftar-span">{label_msg} wajib diisi</span>
            )}
        </div>
    );
}
