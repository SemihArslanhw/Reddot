import React from 'react'
import SubHeader from '../components/Headers/SubHeader'
import Header from '../components/Headers/Header'
import { ToastContainer } from 'react-toastify'
import PostPage from '../components/Posts/PostPage'

const Post = () => {
    return (
        <div>
            <Header/>
            <SubHeader/>
            <ToastContainer/>
            <PostPage/>
        </div>
    )
}

export default Post
