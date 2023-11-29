import React, { useEffect } from 'react'
import Layout from '../Layout'
import EditBukti from './editBukti';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getMe } from '../../features/authSlice';

const PageEditBukti = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isError } = useSelector((state => state.auth));

    useEffect(() => {
        dispatch(getMe());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[dispatch]);

    useEffect(() => {
        if (isError) {
        navigate("/dashboard");
        }
        dispatch(getMe());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[isError,navigate]);

    return (
        <Layout>
            <EditBukti />
        </Layout>
    )
}

export default PageEditBukti