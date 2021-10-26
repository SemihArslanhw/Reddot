import React, { useEffect, useState } from 'react'
import Header from "../components/Headers/Header";
import PostCard from '../components/Posts/PostCard';
import SubHeader from '../components/Headers/SubHeader';
import CreatePostCard from '../components/Posts/CreatePostCard';
import * as api from "../api/index";
import { ToastContainer } from 'react-toastify'
import { useParams } from "react-router-dom";

const Category = () => {
    const [postss, setPosts] = useState();
    const category = useParams().category;
    useEffect(() => {
        const renderPosts = async () => {            
            try {
                const res = await api.getCategoryPosts(category);
                const posts = res.data;
                setPosts(posts);
            } catch (error) {
                console.log(error)
            }
        }
        renderPosts();
    }, [postss])

    return (
        <div>
            <Header />
            <SubHeader />
            <ToastContainer />
            <CreatePostCard />
            {postss?.map((post, i) => {
                return (<PostCard key={i} post={post} />)
            })}
        </div>
    )
}

export default Category
