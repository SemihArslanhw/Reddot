import React from 'react'
import SubHeader from '../components/Headers/SubHeader'
import Header from '../components/Headers/Header'
import { ToastContainer } from 'react-toastify'
import NotificationPage from "../components/Notifications/NotificationPage";

const Notifications = () => {
    return (
        <div>
            <Header />
            <SubHeader />
            <ToastContainer />
            <NotificationPage />
        </div>
    )
}

export default Notifications
