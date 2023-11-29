import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../../features/authSlice";
import ListNilai from "./ListNilai.jsx";
import Layout from "../Layout";

const PageListNilai = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isError } = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(getMe());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);

    useEffect(() => {
        if (isError) {
        navigate("/login");
        }
        dispatch(getMe());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isError, navigate]);
    return (
        <Layout>
        <ListNilai />
        </Layout>
    );
};

export default PageListNilai;
