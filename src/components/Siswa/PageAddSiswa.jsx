import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../../features/authSlice";
import AddSiswa from "./AddSiswa.jsx";
import Layout from "../Layout";

const PageDaftar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/login");
    }
    dispatch(getMe());
  }, [isError, navigate]);
  return (
      <Layout>
        <AddSiswa />
      </Layout>
  );
};

export default PageDaftar;
