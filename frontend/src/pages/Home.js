import React, { useEffect, useState } from 'react'
import Header from "../components/Headers/Header";
import PostCard from '../components/Posts/PostCard';
import SubHeader from '../components/Headers/SubHeader';
import CreatePostCard from '../components/Posts/CreatePostCard';
import Chat from "../components/Chat/Chat"
import * as api from "../api/index";
import { ToastContainer } from 'react-toastify'

const Home = () => {
    const [postss, setPosts] = useState();
    useEffect(() => {
      renderPosts();
        
    }, [postss])
  const renderPosts = async () => {
            try {
                const res = await api.getAllPost();
                const posts = res.data;

                setPosts(posts);
            } catch (error) {
                console.log(error)
            }
        }

    return (
        <div>
            <Header />
            <SubHeader />
            <ToastContainer />
            <CreatePostCard />
            <Chat/>
            {postss?.map((post, i) => {
                return (<PostCard key={i} post={post} />)
            })}
        </div>
    )
}

export default Home
