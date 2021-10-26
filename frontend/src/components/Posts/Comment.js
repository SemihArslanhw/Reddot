import React, { useState } from 'react'
import { AiFillEdit, AiOutlineDelete } from "react-icons/ai"
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import * as api from "../../api/index"
import { BsThreeDotsVertical } from "react-icons/bs"

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

function Comment({ data }) {
    const [commentUpdateMode, setCommentUpdateMode] = useState(false);
    const [reply, setReply] = useState("")
    const [isReply, setIsReply] = useState(false);
    const PF = "http://localhost:8800/images/";
    const [currentUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const [commentText, setCommentText] = useState("");

    const handleReply = () => {
        try {
            api.replyComment(data._id, reply, currentUser?.result, data.commentPost);
            toast.success("You replied!")
            setIsReply(!isReply)
        } catch (error) {
            console.log(error)
            toast.error(error)
        }
    }

    const handleUpdateComment = (comment_id, e) => {
        try {
            const res = api.updateComment(comment_id, commentText);
            toast.success("Comment updated!");
            setTimeout(() => {
                setCommentUpdateMode(false);
            }, 1000);

        } catch (error) {
            console.log(error);
            toast.error(error.response.data);
        }
    }

    const handleDeleteComment = (comment_id) => {
        try {
            const res = api.deleteComment(comment_id);
            toast.success(res.data);
        } catch (error) {
            console.log(error);
            toast.error(error.response.data);
        }
    }

    const handleUpVoteComment = (comment_id) => {
        try {
            if (!currentUser) {
                toast.warn("If you want to vote a post, you must login first!")
            } else {
                const res = api.upVoteComment(comment_id, currentUser?.result._id);
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

    const handleDownVoteComment = (comment_id) => {
        try {
            if (!currentUser) {
                toast.warn("If you want to vote a post, you must login first!")
            } else {
                const res = api.downVoteComment(comment_id, currentUser?.result._id);
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

    return (
        <div className="mx-6 my-4 flex flex-col border max-w-5xl border-gray-600 w-full p-3 rounded-lg">
            <div className="flex max-w-xl">
                <img className="w-12 h-12 rounded-full mx-4" src={PF + data.commentUser.imageUrl} alt={data.commentUser.username} />
                <p className="text-lg font-medium">{data.commentUser.username}</p>
            </div>
            <div className="border-l-2 border-gray-400 ml-10 mt-1">
                {commentUpdateMode ?
                    <textarea onChange={(e) => setCommentText(e.target.value)} value={commentText} className="block ml-6 text-2xl mt-4 mb-4 w-3/4 h-52 px-4 py-2 text-white bg-gray-600 rounded-lg border border-gray-500 focus:border-blue-500 focus:outline-none focus:ring" ></textarea>
                    :
                    <p className="text-base break-words ml-10">{data.commentText}</p>}
                {commentUpdateMode ?
                    <button onClick={() => handleUpdateComment(data._id)} className="flex items-center shadow bg-gray-500 ml-10 px-4 py-2 text-white hover:bg-gray-400">Update</button>
                    :
                    <>
                    </>
                }
                <div className="flex ml-10 mt-3 items-center">
                    <span onClick={() => handleUpVoteComment(data._id)} className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 hover:animate-bounce text-green-500" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4.293 15.707a1 1 0 010-1.414l5-5a1 1 0 011.414 0l5 5a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414 0zm0-6a1 1 0 010-1.414l5-5a1 1 0 011.414 0l5 5a1 1 0 01-1.414 1.414L10 5.414 5.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                    </span>
                    {data.upvotedBy.length - data.downvotedBy.length}
                    <span onClick={() => handleDownVoteComment(data._id)} className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 hover:animate-bounce text-red-500" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M15.707 4.293a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 011.414-1.414L10 8.586l4.293-4.293a1 1 0 011.414 0zm0 6a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 111.414-1.414L10 14.586l4.293-4.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                    </span>
                    <span onClick={() => setIsReply(!isReply)} className="flex items-center ml-6 text-gray-500 hover:text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M7.707 3.293a1 1 0 010 1.414L5.414 7H11a7 7 0 017 7v2a1 1 0 11-2 0v-2a5 5 0 00-5-5H5.414l2.293 2.293a1 1 0 11-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Reply
                    </span>
                    {data.commentUser.username === currentUser?.result.username &&
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
                                                    onClick={() => setCommentUpdateMode(true)}
                                                    className={classNames(
                                                        active ? 'bg-gray-100 text-gray-900 flex' : 'text-gray-700',
                                                        'flex px-4 py-2 text-sm'
                                                    )}
                                                >
                                                    <AiFillEdit className="h-4 w-4 mx-2" aria-hidden="true" />
                                                    Edit Comment
                                                </div>
                                            )}
                                        </Menu.Item>
                                        <Menu.Item>
                                            {({ active }) => (
                                                <div
                                                    onClick={() => handleDeleteComment(data._id)}
                                                    className={classNames(
                                                        active ? 'bg-gray-100 text-gray-900 flex' : 'text-gray-700',
                                                        'flex px-4 py-2 text-sm'
                                                    )}
                                                >
                                                    <AiOutlineDelete className="h-4 w-4 mx-2" aria-hidden="true" />
                                                    Delete Comment
                                                </div>
                                            )}
                                        </Menu.Item>
                                    </div>
                                </Menu.Items>
                            </Transition>
                        </Menu>}


                </div>
                <div className="flex flex-col">
                    {isReply &&
                        <>
                            <textarea placeholder="What are you thoughts?" value={reply} onChange={(e) => { setReply(e.target.value) }} className="block text-2xl mt-4 mb-4 w-3/4 h-44 ml-4 px-4 py-2 text-white bg-gray-600 rounded-lg border border-gray-500 focus:border-blue-500 focus:outline-none focus:ring" ></textarea>
                            <button onClick={handleReply} className="block text-2xl mt-4 mb-4 w-2/12 ml-4 px-4 py-2 text-white bg-gray-600 rounded-lg border border-gray-500 focus:border-blue-500 focus:outline-none focus:ring">Comment</button>
                        </>
                    }
                </div>
                {data?.replies.map((reply, i) => {
                    return (
                        <>
                            <div className="flex max-w-xl mt-4">
                                <img className="w-12 h-12 rounded-full mx-4" src={PF + reply.commentUser.imageUrl} alt={reply.commentUser.username} />
                                <p className="text-lg font-medium">{reply.commentUser.username}</p>
                            </div>
                            <div className="border-l-2 border-gray-400 ml-10">
                                <p className="text-base break-words ml-10">{reply.commentText}</p>
                            </div>
                        </>
                    )
                })}
            </div>
        </div>
    )
}

export default Comment
