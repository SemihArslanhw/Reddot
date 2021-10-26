import React from 'react'
import Header from "../components/Headers/Header";
import SubHeader from '../components/Headers/SubHeader';
import EditProfileComp from '../components/User/EditProfile';
import { ToastContainer } from 'react-toastify'
import { useParams } from "react-router-dom";

const EditProfile = () => {
    const username = useParams().username;
    return (
        <div>
            <Header />
            <SubHeader />
            <ToastContainer />
            <EditProfileComp />
        </div>
    )
}

export default EditProfile
