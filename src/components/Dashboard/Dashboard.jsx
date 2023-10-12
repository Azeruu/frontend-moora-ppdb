import { useSelector } from "react-redux";
import './Dashboard.css';

const Dashboard = () => {
  const {user} = useSelector((state) => state.auth);
  const Huruf = (user) => {
    return user.charAt(0).toUpperCase() + user.slice(1);
  };

  return (
    <div className="welcome">
      <h1 className="tittle">Dashboard</h1>
      <h3>PETUNJUK TEKNIS (JUKNIS)
PENERIMAAN PESERTA DIDIK BARU (PPDB) SMP NEGERI 1 CISOKA
TAHUN PELAJARAN 2023/2024</h3>
<h3>PERSYARATAN UMUM PPDB SMP
</h3>
<ul>
  <li>berusia paling tinggi 15 (lima belas) tahun pada tanggal 1 Juli 2023; dan</li>
  <li>memiliki ijazah SD/sederajat atau dokumen lain (SKL Asli) yang menjelaskan telah menyelesaikan kelas
6 (enam) SD/sederajat
</li>
  <li>Bukti screenshot (tangkapan layar) atas nama siswa yang telah dicontreng lulus dari DAPODIK/EMIS
pada SD/MI asal.</li>
<p>Syarat Usia (nomor 1) dibuktikan dengan Akta Kelahiran/Surat keterangan lahir yang dikeluarkan oleh pihak
berwenang dan dilegalisir oleh Lurah/Kepala Desa.</p>
</ul>
    </div>
  );
}

export default Dashboard