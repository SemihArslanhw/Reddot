import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from "react-router-dom";
import * as api from "../../api/index"
import moment from "moment";
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { BsThreeDotsVertical } from "react-icons/bs"
import { AiFillEdit, AiOutlineDelete } from "react-icons/ai"
import Comment from "./Comment";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

function PostPage() {
    const [post, setPost] = useState({});
    const [comment, setComment] = useState();
    const [comments, setComments] = useState();
    const [currentUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [updateMode, setUpdateMode] = useState(false);
    
    const post_id = useParams().post_id;
    const history = useHistory();
    const PF = "http://localhost:8800/images/";

    useEffect(() => {
        const postRes = api.getPost(post_id);
        postRes?.then((res) => {
            setPost(res?.data);
        })

    }, [post]);

    useEffect(() => {
        const postss = api.getComment(post_id);
        postss.then((d) => { setComments(d.data) });
    }, [comments])

    useEffect(() => {
        const getP = api.getPost(post_id);
        getP?.then((res) => {
            setTitle(res?.data.title);
            setText(res?.data.text);
        })
    }, [])

    const createComment = async () => {
        try {
            await api.createComment(currentUser.result, comment, post_id);
            toast.done("Thanks for comment");
            setComment("");
        } catch (error) {
            toast.error(error.message);
        }

    }

    const handleUpVote = () => {
        try {
            if (!currentUser) {
                toast.warn("If you want to vote a post, you must login first!")
            } else {
                const res = api.upVote(post._id, currentUser?.result._id);
                res?.then((resp) => {
                    if (resp.data === "Your upvote is returned!") {
                        toast.warn(resp.data);
                    } else {
                        toast.success(resp.data);
                    }
                })
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data);
        }

    }

    const handleDownVote = () => {
        try {
            if (!currentUser) {
                toast.warn("If you want to vote a post, you must login first!")
            } else {
                const res = api.downVote(post._id, currentUser?.result._id);
                res?.then((resp) => {
                    if (resp.data === "Your downvote is returned!") {
                        toast.warn(resp.data);
                    } else {
                        toast.success(resp.data);
                    }
                })
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data);
        }
    }

   

    const handleSave = () => {
        try {
            const res = api.savePost(post, currentUser?.result._id);
            res?.then((resp) => {
                if (resp.data === "Your save is returned!") {
                    toast.warn(resp.data);
                } else {
                    toast.success(resp.data);
                }
            })
        } catch (error) {
            console.log(error);
            toast.error(error.response.data);
        }
    }

    

    const handleDeletePost = () => {
        try {
            const res = api.deletePost(post._id);
            toast.success(res.data);
        } catch (error) {
            console.log(error);
            toast.error(error.response.data);
        }
    }

    const handleUpdatePost = () => {
        try {
            const res = api.updatePost(post._id, title, text);
            toast.success("Post updated!");
            setTimeout(() => {
                window.location.reload();
            }, 1000);

        } catch (error) {
            console.log(error);
            toast.error(error.response.data);
        }
    }

    

    return (
        <div className="w-screen-2 mx-auto overflow-hidden bg-gray-700 shadow-md flex flex-row rounded-lg my-20 cursor-pointer">

            {/* upVote Section */}
            <div className="flex flex-col ">
                <div onClick={handleUpVote} className=" mx-auto overflow-hidden px-3 py-20  hover:border-white border-green-500 border-2 shadow-md items-center flex hover:text-gray-800 bg-green-500 text-white text-4xl cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 15.707a1 1 0 010-1.414l5-5a1 1 0 011.414 0l5 5a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414 0zm0-6a1 1 0 010-1.414l5-5a1 1 0 011.414 0l5 5a1 1 0 01-1.414 1.414L10 5.414 5.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                </div>
                <div onClick={handleDownVote} className="mx-auto overflow-hidden px-3 py-20  hover:border-white border-red-500 border-2 shadow-md items-center flex hover:text-gray-800 bg-red-500 text-white text-4xl cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M15.707 4.293a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 011.414-1.414L10 8.586l4.293-4.293a1 1 0 011.414 0zm0 6a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 111.414-1.414L10 14.586l4.293-4.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                </div>
            </div>

            {/* Information Section */}
            <div className="flex flex-col w-full mx-auto overflow-hidden bg-gray-700 shadow-md">
                <div className="flex px-6 pt-4 font-medium text-gray-500 items-center justify-between">
                    <p onClick={() => history.push(`/profile/${post.author}`)} className="cursor-pointer hover:underline mr-12">Posted by u/{post.author}</p>
                    <span className="rounded-full border-green-500 border-2 px-2 py-1 hover:text-white hover:bg-green-500 cursor-pointer mr-6">{post.postCategory}</span>
                    <p className="text-sm font-medium">{moment(moment(post.createdAt).format("DD/MM/YYYY"), "DD/MM/YYYY").fromNow()}</p>
                    {post?.author === currentUser?.result?.username &&
                        <Menu as="div" className="ml-3 relative inline-block text-left">
                            <div>
                                <Menu.Button className="inline-flex justify-center w-full rounded-md shadow-sm py-2 bg-transparent text-sm font-medium text-gray-500 hover:text-white">
                                    <BsThreeDotsVertical className="-mr-1 ml-2 h-4 w-4" aria-hidden="true" />
                                </Menu.Button>
                            </div>

                            <Transition
                                as={Fragment}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                            >
                                <Menu.Items className="origin-top-left  absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                    <div className="py-1">
                                        <Menu.Item>
                                            {({ active }) => (
                                                <div
                                                    onClick={() => setUpdateMode(true)}
                                                    className={classNames(
                                                        active ? 'bg-gray-100 text-gray-900 flex' : 'text-gray-700',
                                                        'flex px-4 py-2 text-sm'
                                                    )}
                                                >
                                                    <AiFillEdit className="h-4 w-4 mx-2" aria-hidden="true" />
                                                    Edit Post
                                                </div>
                                            )}
                                        </Menu.Item>
                                        <Menu.Item>
                                            {({ active }) => (
                                                <div
                                                    onClick={() => { handleDeletePost(); history.push("/") }}
                                                    className={classNames(
                                                        active ? 'bg-gray-100 text-gray-900 flex' : 'text-gray-700',
                                                        'flex px-4 py-2 text-sm'
                                                    )}
                                                >
                                                    <AiOutlineDelete className="h-4 w-4 mx-2" aria-hidden="true" />
                                                    Delete Post
                                                </div>
                                            )}
                                        </Menu.Item>
                                    </div>
                                </Menu.Items>
                            </Transition>
                        </Menu>}
                </div>
                <div className="flex px-6">
                    {updateMode ?
                        <input autoFocus onChange={(e) => setTitle(e.target.value)} className="bg-gray-500 focus-within:outline-none focus:border-blue-500 border border-gray-400 focus:ring text-gray-300 rounded-lg py-2 px-4 break-all my-3 mb-4" type="text" value={title} />
                        :
                        <h1 className="dark:text-white text-white text-2xl font-bold py-6 px-6 break-all">{post.title}</h1>
                    }
                </div>

                {/* Post Types */}
                {post.postType === "image" && (
                    <img className="object-cover w-full px-12" src={PF + post.image} alt="Post" />)}

                {post.postType === "text" && (
                    (updateMode ?
                        <textarea onChange={(e) => setText(e.target.value)} value={text} className="block ml-6 text-2xl mt-4 mb-4 w-3/4 h-52 px-4 py-2 text-white bg-gray-600 rounded-lg border border-gray-500 focus:border-blue-500 focus:outline-none focus:ring" ></textarea>
                        :
                        <p className="px-12 text-gray-300 break-words">{post.text}</p>)

                )}
                {post.postType === "video" && (
                    <video className="object-cover w-full" src="./manzara.mp4" autoPlay={true} loop />)}

                {updateMode ?
                    <button onClick={handleUpdatePost} className="flex items-center shadow bg-gray-500 px-4 py-2 text-white hover:bg-gray-400">Update</button>
                    :
                    <>
                    </>
                }
                {/* Bottom Section */}
                <div className="flex px-6 py-8 font-medium text-gray-500 items-end">
                    <span className="flex items-center hover:text-white cursor-pointer mr-6">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z" clipRule="evenodd" />
                        </svg>
                        {comments?.length} Comments
                    </span>
                    <span className="flex items-center hover:text-white cursor-pointer mr-6">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4.293 15.707a1 1 0 010-1.414l5-5a1 1 0 011.414 0l5 5a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414 0zm0-6a1 1 0 010-1.414l5-5a1 1 0 011.414 0l5 5a1 1 0 01-1.414 1.414L10 5.414 5.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                        {(post.upVote?.length - post.downVote?.length)} Vote
                    </span>
                    <span onClick={handleSave} className="flex items-center hover:text-white cursor-pointer mr-6">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                        </svg>
                        Save
                    </span>
                    <span className="flex items-center hover:text-white cursor-pointer mr-6">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z" clipRule="evenodd" />
                        </svg>
                        Report
                    </span>
                </div>
                {/* Write Comment Section */}
                {currentUser?.result &&
                    <div className="flex flex-col px-6 items-start">
                        <div className="flex flex-row items-center">
                            <p className="text-lg font-medium">Comment as </p>
                            <p className="text-blue-500 text-lg ml-3">{currentUser?.result.username}</p>
                        </div>
                        <textarea placeholder="What are you thoughts?" value={comment} onChange={(e) => { setComment(e.target.value) }} className="block text-2xl mt-4 mb-4 w-3/4 h-52 px-4 py-2 text-white bg-gray-600 rounded-lg border border-gray-500 focus:border-blue-500 focus:outline-none focus:ring" ></textarea>
                        <button className="bg-gray-500 border border-gray-400 w-2/12 rounded-md hover:bg-gray-600 px-4 py-2 text-lg" onClick={() => { createComment() }}> Comment </button>
                    </div>}

                {/* Comments Section */}
                <div className="flex flex-col mb-32">
                    {comments?.map((data, i) => {
                        return (
                           <Comment key={i} data={data}/> 
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default PostPage
