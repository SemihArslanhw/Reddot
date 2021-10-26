import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import PostCard from '../Posts/PostCard';
import { useParams } from "react-router-dom";
import * as api from "../../api/index"

function Profile() {
    const [user, setUser] = useState({});
    const [openTab, setOpenTab] = React.useState(1);
    const [currentUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const [posts, setPosts] = useState([]);
    const [savedPosts, setSavedPosts] = useState([]);
    const [loading, setLoading] = useState(0);
    const [savedPostloading, setSavedPostLoading] = useState(0);
    const username = useParams().username;
    const history = useHistory();
    const PF = "http://localhost:8800/images/";
    useEffect(() => {
        const userRes = api.getUser(username);
        userRes?.then((res) => {
            res?.data.saves.forEach((dat) => {
                const savedPost = api.getPost(dat?._id);
                if (savedPost) {
                    savedPost?.then((dats) => {
                        setSavedPosts(savedPosts => [...savedPosts, dats?.data]);
                    })
                }
            })
            setUser(res?.data)
        })

        const postRes = api.getPostByUser(username);
        postRes?.then((postRes) => {
            if (postRes.data.length === 0) {
                setLoading(1);
            }
            setPosts(postRes?.data)
        })
    }, [username]);

    return (
        <div className="flex flex-col my-20 justify-center items-center ">
            {/* Profile */}
            <div className="p-8 flex flex-col">
                <img className="rounded-t-xl max-h-60 object-cover w-full" src={PF+user?.coverImageUrl} alt="" />
                {user?._id === currentUser?.result._id &&
                    (<span className="flex justify-end mx-4 cursor-pointer" onClick={() => history.push("/editprofile/"+username)}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                        </svg>
                        <p>Edit Profile</p>
                    </span>)}
                    
                <div className="shadow-xl rounded-lg">
                    <div className="bg-white rounded-b-lg px-8">
                        <div className="relative flex justify-center">
                            <img className="w-32 h-32 rounded-full mr-4 shadow-lg absolute -mt-20" src={PF+user?.imageUrl} alt="Avatar of Jonathan Reinink" />
                        </div>
                        <div className="pt-8 pb-8 w-screen-2">
                            <h1 className="text-2xl font-bold text-gray-700">{user?.name}</h1>
                            <p className="text-sm text-gray-600 mt-4">{`u/${user?.username}`}</p>
                            <h1 className="text-2xl font-bold mt-6 text-gray-700">About Me</h1>
                            <p className="mt-6 text-gray-700">{user?.aboutMe}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Posts */}
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
                                        <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                                        <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                                    </svg>
                                    User's All Posts
                                </span>

                            </a>
                        </li>
                        {user?._id === currentUser?.result._id &&
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
                                            <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                                        </svg>
                                        Your Saved Posts
                                    </span>
                                </a>
                            </li>}
                    </ul>

                    <div className="relative flex flex-col min-w-0 break-words bg-gray-600 w-full mb-6 shadow-lg rounded">
                        <div className="px-4 py-5 flex-auto">
                            <div className="tab-content tab-space">
                                <div className={openTab === 1 ? "block" : "hidden"} id="link1">
                                    {posts.length === 0 ? loading === 0 ?
                                        <div className="border border-blue-300 shadow rounded-md p-4 w-96  mx-auto">
                                            <div className="animate-pulse flex space-x-4">
                                                <div className="rounded-full bg-blue-400 h-12 w-12">
                                                </div>
                                                <div className="flex-1 space-y-4 py-1">
                                                    <div className="h-4 bg-blue-400 rounded w-3/4">
                                                    </div>
                                                    <div className="space-y-2">
                                                        <div className="h-4 bg-blue-400 rounded">
                                                        </div>
                                                        <div className="h-4 bg-blue-400 rounded w-5/6">
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        : <div> No posted yet.</div>

                                        :
                                        posts?.map((post, i) => {
                                            return (<PostCard key={i} post={post} />)
                                        })}
                                </div>
                                <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                                    {
                                        savedPosts.length === 0 ? savedPostloading === 0 ?
                                            <div className="border border-blue-300 shadow rounded-md p-4 w-96  mx-auto">
                                                <div className="animate-pulse flex space-x-4">
                                                    <div className="rounded-full bg-blue-400 h-12 w-12">
                                                    </div>
                                                    <div className="flex-1 space-y-4 py-1">
                                                        <div className="h-4 bg-blue-400 rounded w-3/4">
                                                        </div>
                                                        <div className="space-y-2">
                                                            <div className="h-4 bg-blue-400 rounded">
                                                            </div>
                                                            <div className="h-4 bg-blue-400 rounded w-5/6">
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            : <div> No posted yet.</div>

                                            :
                                            savedPosts?.map((data, i) => {
                                                return (<PostCard key={i} post={data}></PostCard>)
                                            })
                                    }
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Profile