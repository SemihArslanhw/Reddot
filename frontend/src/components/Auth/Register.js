import React, { useState } from 'react';
import axios from "axios";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (email === "" || name === "" || password === "" || confirmPassword === "") {
            toast.error("Please fill all required forms.")
        } else {
            if (password === confirmPassword) {
                try {
                    await axios.post("auth/register", { name, username ,email, password });
                    toast.success(`${name}, registered successfully.`)
                    setTimeout(() => {
                        history.push('/login')
                      }, 1000)
                } catch (error) {
                    toast.error(error.response.data);
                }
            } else {
                toast.error('Passwords are not matching!');
            }
        }

    }

    return (
        <div className="flex max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 lg:max-w-4xl mt-20">
            <div className="hidden items-center xl:flex bg-cover lg:block lg:w-1/2">
                <img className="object-contain" src="https://img.freepik.com/free-vector/login-concept-illustration_114360-757.jpg?size=338&ext=jpg" alt="register" />
            </div>

            <div className="w-full px-6 py-8 md:px-8 lg:w-1/2 border-l-2">
                <h2 className="text-2xl font-semibold text-center text-gray-700 dark:text-white">Reddot</h2>

                <p className="text-xl text-center text-gray-600 dark:text-gray-200">Register Now!</p>

                <div className="mt-4">
                    <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200" htmlFor="RegisteringEmailAddress">Email Address *</label>
                    <input onChange={(e)=>setEmail(e.target.value)} id="RegisteringEmailAddress" className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" type="email" />
                </div>
                <div className="mt-4">
                    <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200" htmlFor="RegisteringUsername">Username *</label>
                    <input onChange={(e)=>setUsername(e.target.value)} id="RegisteringUsername" className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" type="username" />
                </div>
                <div className="mt-4">
                    <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200" htmlFor="RegisteringFullName">Full Name *</label>
                    <input onChange={(e)=>setName(e.target.value)} id="RegisteringFullName" className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" type="name" />
                </div>
                <div className="mt-4">
                    <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200" htmlFor="RegisteringPassword">Password *</label>
                    <input id="RegisteringPassword" onChange={(e)=>setPassword(e.target.value)} className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" type="password" />
                </div>
                <div className="mt-4">
                    <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200" htmlFor="RegisteringConfirmPassword">Confirm Password *</label>
                    <input id="Registering" onChange={(e)=>setConfirmPassword(e.target.value)} className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" type="password" />
                </div>

                <div className="mt-8">
                    <button onClick={handleSubmit} className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded hover:bg-gray-600 focus:outline-none focus:bg-gray-600">
                        Register
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Register
