import React from 'react'
import SubHeader from '../components/Headers/SubHeader'
import Header from '../components/Headers/Header'
import { ToastContainer } from 'react-toastify'
import ProfileComp from "../components/User/Profile";

const Profile = () => {
    return (
        <div>
            <Header/>
            <SubHeader/>
            <ToastContainer/>
            <ProfileComp/>
        </div>
    )
}

export default Profile
