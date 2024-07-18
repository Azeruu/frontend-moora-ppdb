// import { useSelector } from "react-redux";
import "./Info.css";

const Info = () => {
  // const {user} = useSelector((state) => state.auth);
  // const Huruf = (user) => {
  //   return user.charAt(0).toUpperCase() + user.slice(1);
  // };

  return (
    <table className="Info-container">
      <div className="Info">
        <h1 className="Info-judul">Informasi PPDB</h1>
        <h1>PETUNJUK TEKNIS (JUKNIS) PENERIMAAN PESERTA DIDIK BARU (PPDB) SMP NEGERI 1 CISOKA TAHUN PELAJARAN 2023/2024</h1>
        <h3>PERSYARATAN UMUM PPDB SMP</h3>
          <ol>
            <li>berusia paling tinggi 15 (lima belas) tahun pada tanggal 1 Juli 2023; dan</li>
            <li>memiliki ijazah SD/sederajat atau dokumen lain (SKL Asli) yang menjelaskan telah menyelesaikan kelas 6 (enam) SD/sederajat</li>
            <li>Bukti screenshot (tangkapan layar) atas nama siswa yang telah dicontreng lulus dari DAPODIK/EMISpada SD/MI asal.</li>
            <p>Syarat Usia (nomor 1) dibuktikan dengan Akta Kelahiran/Surat keterangan lahir yang dikeluarkan oleh pihak berwenang dan dilegalisir oleh Lurah/Kepala Desa.</p>
          </ol>
        <h1>Jalur Penerimaan Peserta Didik Baru (PPDB)</h1>
        <h2>Zonasi (minimal 50% = 198 orang min)</h2>
        <p>Persyaratan :</p>
        <ul>
          <li>Ijazah/SK Lulus</li>
          <li>Kartu Keluarga/Surat Keterangan Domisili (Minimal dari Desa)</li>
          <li>Foto Copy Akta Kelahiran / Surat keterangan lahir dari desa</li>
          <li>Print out NISN</li>
          <li>Screenshot (tangkapan layar) Lulus dari DAPODIK/EMIS</li>
          <li>Hasil Pengukuran Jarak Tempat Tinggal</li>
        </ul>

        <h2>Afirmasi (minimal 15% = 60 orang min)</h2>
        <p>Persyaratan :</p>
        <ul>
          <li>Ijazah/SK Lulus</li>
          <li>Kartu Keluarga/Surat Keterangan Domisili</li>
          <li>Foto Copy Akta kelahiran/surat keterangan dari desa</li>
          <li>Print out NISN</li>
          <li>Screenshot (tangkapan layar) Lulus dari DAPODIK/EMIS</li>
          <li>Foto copy kartu PIP (bagi yang memiliki)</li>
          <li>Surat Keterangan Tidak Mampu dan Surat Penyataan Kebenaran Dokumen</li>
        </ul>

        <h2>Perpindahan Tugas (maksimal 5% = 20 orang max)</h2>
        <p>Persyaratan :</p>
        <ul>
          <li>Ijazah/SK Lulus</li>
          <li>Kartu Keluarga/Surat Keterangan Domisili</li>
          <li>Foto Copy Akta kelahiran/surat keterangan dari desa</li>
          <li>Print out NISN</li>
          <li>Screenshot (tangkapan layar) Lulus dari DAPODIK/EMIS</li>
          <li>SK perpindahan tugas orang tua/wali dari pimpinan perusahaan tempat bekerja</li>
        </ul>

        <h2>Prestasi (maksimal 30% = 120 orang max)</h2>
        <p>Persyaratan :</p>
        <ul>
          <li>Ijazah/SK Lulus</li>
          <li>Kartu Keluarga/Surat Keterangan Domisili</li>
          <li>Foto copy Akta kelahiran</li>
          <li>Print out NISN</li>
          <li>Screenshot (tangkapan layar) Lulus dari DAPODIK/EMIS</li>
          <li>Nilai rata-rata rapor semester 7 s.d 11 (Bid. Studi PKn, B. Indonesia, Matematika, IPS, dan IPA)</li>
          <li>juara OSN/KSN tingkat Kab/Kota atau Piagam/Sertifikat (Piagam/sertifikat paling paling singkat 6 bulan atau paling lama 3 tahun dari tanggal PPDB.)</li>
        </ul>
        <h1>Penjelasan Jalur-Jalur Penerimaan Peserta Didik Baru (PPDB)</h1>
        <h2>Zonasi</h2>
        <p>Untuk Zonasi SMPN 1 Cisoka adalah jarak terdekat dari sekolah</p>
        <p>Zonasi dibuktikan dengan melampirkan Kartu Keluarga atau Surat Keterangan Domisili</p>

        <h2>Afirmasi</h2>
        <p>Jalur Afirmasi diperuntukkan bagi siswa yatim dan atau piatu, keluarga tidak mampu di dalam zonasi.</p>

        <h2>Perpindahan Tugas</h2>
        <p>Jalur Perpindahan Tugas melampirkan Surat Penugasan dari Kantor/Instansi yang memperkerjakan.</p>

        <h2>Prestasi</h2>
        <p>Jalur Prestasi diperuntukkan bagi peserta didik yang berdomisili di luar Zonasi (Kecamatan Cisoka dan Tigaraksa) jika kuota masih tersedia dari jalur Zonasi, Afirmasi, dan Perpindahan orang tua.</p>
        <p>Jalur Prestasi ditentukan oleh :</p>
        <ol>
          <li>Nilai rata-rata rapor kelas 4, kelas 5, dan kelas 6 semester ganjil (mata pelajaran PKn, B. Indonesia, Matematika, IPA, dan IPS).</li>
          <li>Prestasi bidang akademik atau non-akademik minimal tingkat Kabupaten/Kota. Dengan melampirkan Sertifikat/Piagam dari prestasi tersebut (sertifikat/piagam paling singkat 6 bulan atau paling lama 3 tahun dari tanggal PPDB).</li>
        </ol>

        <h2>Urutan Prioritas/Seleksi Setiap Jalur</h2>
        <p>1. Zonasi : Jarak --&gt; Nilai Rata-Rata Rapor --&gt; Prestasi --&gt; Usia</p>
        <p>2. Afirmasi dan Perpindahan Tugas : Jarak --&gt; Usia</p>
        <p>3. Prestasi : Rata-Rata Nilai Rapor atau Sertifikat/Piagam --&gt; Jarak --&gt; Usia</p>
      </div>
    </table>
  );
};

export default Info;
