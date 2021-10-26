import React from 'react'
import SubHeader from '../components/Headers/SubHeader'
import CreatePostTabs from '../components/Posts/CreatePostTabs'
import Header from "../components/Headers/Header"
import { ToastContainer } from 'react-toastify'

function CreatePost() {
    
  return (
    <>
     <Header/>
     <SubHeader/>
     <ToastContainer/>
     <CreatePostTabs/>
    </>
  );
};

export default CreatePost

