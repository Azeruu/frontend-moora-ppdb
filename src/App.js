import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/Login/Login";
import Dashboard from "./components/Dashboard/PageDashboard";
import UserList from "./components/User/PageUsers";
import AddUser from "./components/User/AddUser";
import EditUser from "./components/User/EditUser";
import Alternatif from "./components/Alternatif/PageSiswa";
import AddAlternatif from "./components/Alternatif/PageAddSiswa";
import EditAlternatif from "./components/Alternatif/PageEditSiswa";
import Jalur from "./components/Jalur/PageJalur";
import AddJalur from "./components/Jalur/AddJalur";
import EditJalur from "./components/Jalur/EditJalur";
import AddKriteria from "./components/Kriteria/PageAddKriteria"
import ListKriteria from "./components/Kriteria/PageListKriteria";
import EditKriteria from "./components/Kriteria/PageEditKriteria";
import NilaiAlternatif from "./components/Nilai_Alternatif/PageNilaiAlt";
import AddNilaiAlternatif from "./components/Nilai_Alternatif/PageAddNilaiAlt"
import EditNilaiAlternatif from "./components/Nilai_Alternatif/PageEditNilaiAlt"
import Hasil from "./components/Hasil/PageHasil";
import AddHasil from "./components/Hasil/PageAddHasil";
import EditHasil from "./components/Hasil/PageEditHasil";
import Pendaftar from "./components/Pendaftaran/PagePendaftar";
import AddPendaftar from "./components/Pendaftaran/PageAddPendaftar";
import AddPendaftar2 from "./components/Pendaftaran/PageAddPendaftar2";
import Home from "./components/Home/HomePage";
import Info from "./components/Informasi/InfoPage";
import KuotaPage from "./components/Kuota/KuotaPage";
import PeringkatPage from "./components/Peringkat/PeringkatPage";

function App() {
  return (
    <div className="Body">
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/info" element={<Info />} />
          <Route path="/kuota" element={<KuotaPage />} />
          <Route path="/peringkat" element={<PeringkatPage />} />
          {/* User */}
          <Route path="/userlist" element={<UserList />} />
          <Route path="/userlist/adduser" element={<AddUser />} />
          <Route path="/userlist/edituser/:id" element={<EditUser />} />
          {/* Alternatif */}
          <Route path="/alternatif" element={<Alternatif />} />
          <Route path="/alternatif/addAlternatif" element={<AddAlternatif />} />
          <Route path="/alternatif/editAlternatif/:id" element={<EditAlternatif />} />
          {/* Kriteria */}
          <Route path="/kriteria" element={<ListKriteria />} />
          <Route path="/kriteria/addKriteria/" element={<AddKriteria />} />
          <Route path="/kriteria/editKriteria/:id" element={<EditKriteria />} />
          {/* Nilai ALternatif */}
          <Route path="/nilai_alternatif" element={<NilaiAlternatif />} />
          <Route path="/nilai_alternatif/addNilaiAlternatif" element={<AddNilaiAlternatif />} />
          <Route path="/nilai_alternatif/editNilaiAlternatif/:id" element={<EditNilaiAlternatif />} />
          {/* Jalur */}
          <Route path="/jalur" element={<Jalur />} />
          <Route path="/jalur/addjalur" element={<AddJalur />} />
          <Route path="/jalur/editjalur/:id" element={<EditJalur />} />
          {/* Pendaftaran */}
          <Route path="/daftar" element={<Pendaftar />} />
          <Route path="/daftar/addpendaftar" element={<AddPendaftar />} />
          <Route path="/daftar/addpendaftar2/:namaAlternatif/:jalurId" element={<AddPendaftar2 />} />
          {/* <Route path="/daftar/edithasil/:id" element={<EditHasil />} /> */}
          {/* Hasil */}
          <Route path="/hasil" element={<Hasil />} />
          <Route path="/hasil/addhasil" element={<AddHasil />} />
          <Route path="/hasil/edithasil/:id" element={<EditHasil />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;