import DaftarCss from './css/Daftar.module.css';

export default function DaftarInputUserOption({ errors, register, label_msg, input_type }) {
    return (
        <div>
            <label className={DaftarCss.label}>{label_msg}</label>
            <input type={input_type} className={DaftarCss.input} {...register(label_msg, { required: true })} />
            {errors.NISN && (
                <span className={DaftarCss.span}>{label_msg} wajib diisi</span>
            )}
        </div>
    );
}