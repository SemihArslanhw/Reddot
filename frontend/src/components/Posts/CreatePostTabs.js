import React, { useState } from 'react'
import * as api from "../../api/index"
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { BiImageAdd } from "react-icons/bi";
import 'react-toastify/dist/ReactToastify.css';

function CreatePostTabs() {
    const [openTab, setOpenTab] = useState(1);
    const [titleValue, setTitleValue] = useState("");
    const [textValue, setTextValue] = useState("");
    const [file, setFile] = useState(null);
    const [user] = useState(JSON.parse(localStorage.getItem('profile')));
    const history = useHistory();

    const textPost = () => {
        const username = user?.result.username;
        var select = document.getElementById("categories");
        var option = select.options[select.selectedIndex]
        if (user?.result) {
            if (titleValue !== undefined) {
                try {
                    const res = api.createPost(titleValue, "text", option.value, textValue, "0", username);
                    toast.success("Post created successfully!");
                    setTimeout(() => {
                        history.push('/')
                    }, 1000)
                } catch (error) {
                    toast.error(error.response.data);
                }
            } else {
                toast.warn("Please enter a title to create a post.");
            }
        } else {
            toast.error("You must login for create a post!")
        }
    }

    const filePost = (e) => {
        e.preventDefault();
        const username = user?.result.username;
        var select = document.getElementById("categories");
        var option = select.options[select.selectedIndex];
        if (file) {
            const data = new FormData();
            const filename = username + "_" + file.name;
            data.append("name", filename);
            data.append("file", file);
            try {
                api.uploadFile(data);
            } catch (error) {
                console.log(error);
                toast.error(error);
            }
            try {                
                api.createPost(titleValue, "image", option.value, "", filename, username);
                toast.success("Post created successfully!");
                setTimeout(() => {
                    history.push('/')
                }, 1000)
            } catch (error) {
                console.log(error);
                toast.error(error);
            }
        } else {
            toast.error("You didn't add any file!");
        }
    }


    return (
        <div className="flex flex-wrap container mx-auto mt-20">
            <div className="w-full">
                <ul
                    className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row"
                    role="tablist"
                >
                    <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                        <a
                            className={
                                "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                                (openTab === 1
                                    ? "text-white bg-gray-700"
                                    : "text-gray-300 bg-gray-500")
                            }
                            onClick={e => {
                                e.preventDefault();
                                setOpenTab(1);
                            }}
                            data-toggle="tab"
                            href="#link1"
                            role="tablist"
                        >
                            <span className="flex flex-row text-2xl justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-3" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                                </svg>
                                Text
                            </span>

                        </a>
                    </li>
                    <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                        <a
                            className={
                                "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                                (openTab === 2
                                    ? "text-white bg-gray-700"
                                    : "text-gray-300 bg-gray-500")
                            }
                            onClick={e => {
                                e.preventDefault();
                                setOpenTab(2);
                            }}
                            data-toggle="tab"
                            href="#link2"
                            role="tablist"
                        >
                            <span className="flex flex-row text-2xl justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-3" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                                </svg>
                                Image & Video
                            </span>
                        </a>
                    </li>
                </ul>
                <div className="relative flex flex-col min-w-0 break-words bg-gray-700 w-full mb-6 shadow-lg rounded">
                    <div className="px-4 py-5 flex-auto">
                        <div className="tab-content tab-space">
                            <div className={openTab === 1 ? "block" : "hidden"} id="link1">
                                <input className="w-full py-3 rounded px-4 bg-gray-600 border-gray-500 border text-xl shadow-2xl" type="text" value={titleValue} onChange={(e) => { setTitleValue(e.target.value) }} placeholder="Title"></input>
                                <textarea placeholder="Text (Optional)" className="block text-2xl mt-4 w-full h-60 px-4 py-2 text-white bg-gray-600 border border-gray-500 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" value={textValue} onChange={(e) => { setTextValue(e.target.value) }}></textarea>
                                <select
                                    id="categories"
                                    name="categories"
                                    className=" h-full w-full py-2 pl-2 text-center pr-3 border-transparent bg-transparent text-white text-lg my-3 rounded-xl border-2 border-gray-500 bg-gray-500 focus-within:outline-none"
                                >
                                    <option>Technology 👨‍💻</option>
                                    <option>Games 🎮</option>
                                    <option>Memes 🐸</option>
                                    <option>Nature 🌲</option>
                                    <option>Politics 🗳️</option>
                                    <option>Finance 💸</option>
                                    <option>Sport 🏅</option>
                                    <option>Other 🛃</option>
                                </select>
                                <hr className="mt-4 mb-4" />
                                <button className="px-6 py-2 float-right bg-gray-600 rounded-full text-2xl" onClick={textPost}>Post</button>
                            </div>
                            <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                                
                                <input className="w-full py-3 rounded px-4 bg-gray-600 border-gray-500 border text-xl shadow-2xl" type="text" placeholder="Title" value={titleValue} onChange={(e) => { setTitleValue(e.target.value) }}></input>
                                <div className="flex items-center justify-center h-96 w-3/4 bg-gray-500 text-gray-400 hover:text-white hover:bg-gray-400 xl:ml-48 ml-16 shadow-xl rounded-lg my-4">
                                    {!file &&
                                    <>
                                    <BiImageAdd className="w-20 h-20" />
                                    <input
                                        type="file"
                                        id="fileInput"
                                        className="opacity-100"
                                        onChange={(e) => setFile(e.target.files[0])}
                                    />
                                    </>
                                    }
                                    {file &&
                                    <>
                                        <BiImageAdd className="w-20 h-20" onClick={()=>setFile(null)} />
                                        <img className="object-contain w-full h-full" src={URL.createObjectURL(file)} alt=""/>
                                    </>
                                    }
                                </div>
                                <select
                                    id="categories"
                                    name="categories"
                                    className=" h-full w-full py-2 pl-2 text-center pr-3 border-transparent bg-transparent text-white text-lg my-3 rounded-xl border-2 border-gray-500 bg-gray-500 focus-within:outline-none"
                                >
                                    <option>Technology 👨‍💻</option>
                                    <option>Games 🎮</option>
                                    <option>Memes 🐸</option>
                                    <option>Nature 🌲</option>
                                    <option>Politics 🗳️</option>
                                    <option>Finance 💸</option>
                                    <option>Sport 🏅</option>
                                    <option>Other 🛃</option>
                                </select>
                                <hr className="mt-4 mb-4" />
                                <button className="px-6 py-2 float-right bg-gray-600 rounded-full text-2xl" onClick={filePost}>Post</button>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreatePostTabs
