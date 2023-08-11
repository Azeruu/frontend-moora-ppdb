import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/FormLogin";
import Home from "./Pages/HomePage/Home";
import HasilPage from "./Pages/PageHasil";
import Pendaftaran from "./Pages/PageSiswa";
import UserList from "./Pages/PageUsers";
import AddUser from "./Pages/AddUser";
import EditUser from "./Pages/EditUser";
import AddSiswa from "./Pages/AddSiswa";
import EditSiswa from "./Pages/EditSiswa";
import Dashboard from "./Pages/PageDashboard";
import PageAspek from "./Pages/PageAspek";
import Daftar from "./components/Daftar";

function App() {
  return (
    <div className="Body">
      <Router>
        <Routes>
          <Route
            exact
            path="/"
            element={<Home />}
          />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/pendaftaran" element={<Pendaftaran />} />
          <Route path="/login" element={<Login />} />
          <Route path="/aspek" element={<PageAspek />} />
          <Route path="/daftar" element={<Daftar />} />
          <Route path="/hasil" element={<HasilPage />} />
          <Route path="/userlist" element={<UserList />} />
          <Route path="/userlist/adduser" element={<AddUser />} />
          <Route path="/userlist/edituser/:id" element={<EditUser />} />
          <Route path="/pendaftaran/addsiswa" element={<AddSiswa />} />
          <Route path="/pendaftaran/editsiswa/:id" element={<EditSiswa />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;