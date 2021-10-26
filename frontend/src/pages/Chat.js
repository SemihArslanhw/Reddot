import React from 'react'
import SubHeader from '../components/Headers/SubHeader'
import Header from '../components/Headers/Header'
import { ToastContainer } from 'react-toastify'
import ChatPage from "../components/Chat/ChatPage"
const Chat = () => {
    return (
        <div>
            <Header/>
            <SubHeader/>
            <ToastContainer/>
            <ChatPage />
        </div>
    )
}

export default Chat
