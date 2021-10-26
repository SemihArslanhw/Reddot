import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import * as api from "../../api/index"
import { useDispatch } from "react-redux";

const EditProfile = () => {
    const [user,setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const history = useHistory();
    const dispatch = useDispatch();
    const [coverFile, setCoverFile] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [name, setName] = useState("");
    const [aboutMe, setAboutMe] = useState("");
    const PF = "http://localhost:8800/images/";

    // const logout = () => {
    //     dispatch({ type: 'LOGOUT' });
    //     history.push("/login")
    //     setUser(null);
    // }

    const handleSubmit = (e) => {
        e.preventDefault();
        const username = user?.result.username;
        const updatedUser = {
            name,
            aboutMe
        };
        if (imageFile) {
            const data = new FormData();
            const filename = username + "_image" + "_" + imageFile.name;
            data.append("name", filename);
            data.append("file", imageFile);
            updatedUser.imageUrl = filename;
            try {
                api.uploadFile(data);
            } catch (error) {
                console.log(error);
                toast.error(error);
            }
        }
        if (coverFile) {
            const data = new FormData();
            const filename = username + "_cover" + "_" + coverFile.name;
            data.append("name", filename);
            data.append("file", coverFile);
            updatedUser.coverImageUrl = filename;
            try {
                api.uploadFile(data);
            } catch (error) {
                console.log(error);
                toast.error(error);
            }
        }
        try {
            console.log(updatedUser);
            api.updateUser(user?.result._id,updatedUser);
            toast.success("Your profile is updated!");
            history.push("/profile/"+user?.result.username)
        } catch (error) {
            console.log(error);
                toast.error(error);
        }

    }

    return (
        <div className="bg-gray-900">
            <div className="container mx-auto bg-gray-900 rounded">
                <div className="xl:w-full border-b border-gray-300 py-5 bg-gray-900">
                    <div className="flex w-11/12 mx-auto xl:w-full xl:mx-0 items-center">
                        <p className="text-lg text-gray-100 font-bold">Profile</p>
                    </div>
                </div>
                <div className="mx-auto flex justify-center">
                    <div className="xl:w-9/12 w-11/12 mx-auto xl:mx-0">
                        <div className="rounded relative mt-8 h-48">
                            {coverFile &&
                                <img src={URL.createObjectURL(coverFile)} alt="" className="absolute z-0 h-full w-full object-cover rounded-full shadow top-0 left-0 bottom-0 right-0" />}
                            {!coverFile &&
                                <img src={PF + user?.result.coverImageUrl} alt="" className="w-full h-full object-cover rounded absolute shadow" />}
                            <div className="absolute bg-black opacity-50 top-0 right-0 bottom-0 left-0 rounded" />
                            <div className="flex items-center px-3 py-2 rounded absolute right-0 mr-4 mt-4 cursor-pointer">
                                <p className="text-xs text-gray-100">Change Cover Photo</p>
                                <div className="ml-2 text-gray-100">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-edit" width={18} height={18} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" />
                                        <path d="M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />
                                        <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />
                                        <line x1={16} y1={5} x2={19} y2={8} />
                                    </svg>
                                </div>
                                <input
                                    type="file"
                                    id="fileInput"
                                    className="opacity-100"
                                    onChange={(e) => setCoverFile(e.target.files[0])}
                                />
                            </div>
                            <div className="w-20 h-20 rounded-full bg-cover bg-center bg-no-repeat absolute bottom-0 -mb-10 ml-12 shadow flex items-center justify-center">
                                {imageFile &&
                                    <img src={URL.createObjectURL(imageFile)} alt="" className="absolute z-0 h-full w-full object-cover rounded-full shadow top-0 left-0 bottom-0 right-0" />}
                                {!imageFile &&
                                    <img src={PF + user?.result.imageUrl} alt="" className="absolute z-0 h-full w-full object-cover rounded-full shadow top-0 left-0 bottom-0 right-0" />}
                                <div className="absolute bg-black opacity-50 top-0 right-0 bottom-0 left-0 rounded-full z-0" />
                                <div className="cursor-pointer flex flex-col justify-center items-center z-10 text-gray-100">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-edit" width={20} height={20} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" />
                                        <path d="M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />
                                        <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />
                                        <line x1={16} y1={5} x2={19} y2={8} />
                                    </svg>
                                    <input
                                        type="file"
                                        id="fileInput"
                                        className="opacity-0"
                                        onChange={(e) => setImageFile(e.target.files[0])}
                                    />
                                    <p className="text-xs text-gray-100">Edit Picture</p>
                                </div>
                            </div>
                        </div>
                        <div className="mt-16 flex flex-col xl:w-2/6 lg:w-1/2 md:w-1/2 w-full">
                            <label htmlFor="name" className="pb-2 text-sm font-bold text-gray-100">
                                Name
                            </label>
                            <input type="text" id="name" name="name" required className="border border-gray-300 dark:border-gray-700 pl-3 py-3 shadow-sm rounded text-sm focus:outline-none focus:border-indigo-700 bg-transparent placeholder-gray-500 text-gray-500 dark:text-gray-400" placeholder={user?.result.name} value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="mt-8 flex flex-col xl:w-3/5 lg:w-1/2 md:w-1/2 w-full">
                            <label htmlFor="about" className="pb-2 text-sm font-bold text-gray-100">
                                About Me
                            </label>
                            <textarea id="about" name="about" required className="bg-transparent border border-gray-300 dark:border-gray-700 pl-3 py-3 shadow-sm rounded text-sm focus:outline-none focus:border-indigo-700 resize-none placeholder-gray-500 text-gray-500 dark:text-gray-400" placeholder={user?.result.aboutMe} rows={5} value={aboutMe} onChange={(e) => setAboutMe(e.target.value)} />
                            <p className="w-full text-right text-xs pt-1 text-gray-500 dark:text-gray-400">Character Limit: 200</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container mx-auto w-11/12 xl:w-full">
                <div className="w-full py-4 sm:px-0 bg-gray-900 flex justify-end">
                    <button onClick={handleSubmit} className="bg-gray-700 focus:outline-none transition duration-150 ease-in-out hover:bg-indigo-600 rounded text-white px-8 py-2 text-lg font-medium">
                        Update
                    </button>
                </div>
            </div>
        </div>
    );
};
export default EditProfile;
