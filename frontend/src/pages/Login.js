import React from 'react'
import LoginComp from '../components/Auth/Login'
import Header from '../components/Headers/Header'
import { ToastContainer } from 'react-toastify'
const Login = () => {
    return (
        <div>
            <Header/>          
            <LoginComp />
            <ToastContainer/>
        </div>
    )
}

export default Login
