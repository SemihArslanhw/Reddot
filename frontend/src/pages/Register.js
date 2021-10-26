import React from 'react'
import RegisterComp from '../components/Auth/Register'
import Header from '../components/Headers/Header'
import { ToastContainer } from 'react-toastify'

const Register = () => {
    return (
        <div>
            <Header />
            <ToastContainer/>
            <RegisterComp />

        </div>
    )
}

export default Register
