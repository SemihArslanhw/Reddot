import React, { useState, useEffect } from 'react';
import moment from "moment";
import { useHistory } from "react-router-dom";
import * as api from "../../api/index";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function Post({ post }) {
    const {
        _id,
        title,
        postType,
        postCategory,
        text,
        image,
        author,
        upVote,
        downVote,
        createdAt,
    } = post;
    const history = useHistory();
    const [currentUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const [isUpVoted, setIsUpVoted] = useState();
    const [isDownVoted, setIsDownVoted] = useState();
    const [comments, setComments] = useState();
    const PF = "http://localhost:8800/images/";

    useEffect(() => {
        setIsUpVoted(post.upVote.includes(currentUser?.result._id));
        setIsDownVoted(post.downVote.includes(currentUser?.result._id))
    }, [post])

    useEffect(() => {
        const postss = api.getComment(_id);
        postss.then((d) => { setComments(d.data) });

    }, [comments])

    const handleUpVote = () => {
        console.log(isUpVoted);
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

    return (
        <div className="max-w-4xl mx-auto overflow-hidden bg-gray-700 shadow-md flex flex-row rounded-lg my-20 cursor-pointer">

            {/* upVote Section */}
            <div onClick={handleUpVote} className={isUpVoted ? "mx-auto overflow-hidden px-3 hover:border-white border-green-500 border-2 shadow-md items-center flex bg-green-500 text-white text-4xl cursor-pointer" : "mx-auto overflow-hidden px-3 hover:border-white border-green-500 border-2 shadow-md items-center flex bg-green-500 opacity-75 text-white text-4xl cursor-pointer"}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 hover:animate-bounce" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 15.707a1 1 0 010-1.414l5-5a1 1 0 011.414 0l5 5a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414 0zm0-6a1 1 0 010-1.414l5-5a1 1 0 011.414 0l5 5a1 1 0 01-1.414 1.414L10 5.414 5.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
            </div>

            {/* Information Section */}
            <div className="flex flex-col w-full mx-auto overflow-hidden bg-gray-700 shadow-md ">
                <div className="flex px-6 pt-4 font-medium text-gray-500 items-center justify-between">
                    <p onClick={() => history.push(`/profile/${author}`)} className="cursor-pointer hover:underline">Posted by<br /> u/{author}</p>
                    <span className="rounded-full border-green-500 border-2 px-2 py-1 hover:text-white hover:bg-green-500 cursor-pointer mr-6">{postCategory}</span>
                    <p className="text-sm font-medium">{moment(moment(createdAt).format("DD/MM/YYYY"), "DD/MM/YYYY").fromNow()}</p>
                </div>
                <div onClick={() => history.push("/post/" + _id)} className="flex">
                    <h1 className="dark:text-white text-white text-2xl font-bold py-6 px-6 break-all">{title}</h1>
                </div>

                {/* Post Types */}
                {postType === "image" && (
                    <img onClick={() => history.push("/post/" + _id)} className="object-cover w-full max-h-96" src={PF + image} alt="Post" />)}

                {postType === "text" && (
                    <p onClick={() => history.push("/post/" + _id)} className="px-6 text-gray-300 break-words">{text}</p>)}

                {postType === "video" && (
                    <video className="object-cover w-full" src="./manzara.mp4" autoPlay={true} loop />)}

                {/* Bottom Section */}
                <div className="flex px-6 py-4 font-medium text-gray-500 items-center justify-between">

                    <a href={"/posts?=" + post._id} className="flex items-center hover:text-white cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z" clipRule="evenodd" />
                        </svg>
                        {comments?.length} Comments
                    </a>

                    <span className="flex items-center hover:text-white cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4.293 15.707a1 1 0 010-1.414l5-5a1 1 0 011.414 0l5 5a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414 0zm0-6a1 1 0 010-1.414l5-5a1 1 0 011.414 0l5 5a1 1 0 01-1.414 1.414L10 5.414 5.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                        {upVote.length - downVote.length} Vote
                    </span>
                    <span onClick={handleSave} className="flex items-center text-gray-300 cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                        </svg>
                        Save
                    </span>
                </div>
            </div>

            {/* downVote Section */}
            <div onClick={handleDownVote} className={isDownVoted ? "mx-auto overflow-hidden px-3 hover:border-white border-red-500 border-2 shadow-md items-center flex bg-red-500 text-white text-4xl cursor-pointer" : "mx-auto overflow-hidden px-3 hover:border-white border-red-500 border-2 shadow-md items-center flex  bg-red-500 opacity-75 text-white text-4xl cursor-pointer"}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 hover:animate-bounce" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M15.707 4.293a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 011.414-1.414L10 8.586l4.293-4.293a1 1 0 011.414 0zm0 6a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 111.414-1.414L10 14.586l4.293-4.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
            </div>
        </div>
    )
}

export default Post
