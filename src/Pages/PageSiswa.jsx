import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../features/authSlice";
import ListSiswa from "../components/ListSiswa";
import Layout from "./Layout";

const PageSiswa = () => {
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
      <ListSiswa />
    </Layout>
  );
};

export default PageSiswa;
