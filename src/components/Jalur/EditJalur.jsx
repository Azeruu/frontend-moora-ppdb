import Layout from "../Layout";
import EditJalurForm from "./EditJalurForm";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../../features/authSlice";

const EditJalur = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isError, user } = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(getMe());
    }, [dispatch]);

    useEffect(() => {
        if (isError) {
        navigate("/login");
        }
        if (user && user.role !== "admin") {
        navigate("/dashboard2");
        }
    }, [isError, user, navigate]);

    return (
        <Layout>
        <EditJalurForm />
        </Layout>
    );
};

export default EditJalur;
