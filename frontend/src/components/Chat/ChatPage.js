import React, { useEffect, useRef, useState } from 'react'
import { BsChatSquareDots, BsFillGearFill } from "react-icons/bs";
import { AiOutlineDelete, AiFillProfile, AiOutlineSend } from "react-icons/ai"
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import * as api from "../../api/index"
import { toast } from "react-toastify";

import 'react-toastify/dist/ReactToastify.css';
import MessageBox from './MessageBox';
import ConversationBox from './ConversationBox';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

function ChatPage() {
    const [chatingUser, setChatingUser] = useState(null);
    const [messages, setMessages] = useState([]);
    const [sendingMessage , setSendingMessage] = useState("");
    const [chatUser, setChatUser] = useState(null);
    const [conversation, setConversation] = useState([])
    const [currentUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const scroolRef = useRef()

    useEffect(() => {
        const getConversations = async () => {
            try {

                const res = await api.getConversations(currentUser.result._id);
                setConversation(res.data)

            } catch (error) {
                console.log(error);
            }
        }
        getConversations()
        console.log(conversation)
    }, [currentUser.result._id])

    useEffect(() => {
        const getMessages = async () => {
            try {
                const res = await api.getMessagesOfConversation(chatingUser?._id);
                setMessages(res.data);
            } catch (error) {
                console.log(error)
            }

        }
        getMessages()
        
    }, [chatingUser, messages])
    useEffect(()=>{
       
         //scroolRef.current?.scrollIntoView({behavior:"smooth"});
    },[messages])
    const sendMessagee = async () =>{
        try {
           const res =await api.sendMessage(chatingUser._id,currentUser.result._id,sendingMessage)
           console.log(res)
            setSendingMessage("");
        } catch (error) {
            console.log(error)
        }
        
        
    }
    return (
        <div className="container h-screen justify-between mx-auto flex gap-4 py-6">
            <div className="rounded-xl h-full w-1/4 bg-gray-700">

                <div className="rounded-t-xl h-1/6 flex px-6 py-8 justify-between items-center bg-gray-800">
                    <p className="text-2xl">Chat</p>
                    <BsChatSquareDots className="w-8 h-8" />
                </div>

                <div className="overflow-y-auto h-5/6 ">
                    {
                        conversation?.map((c) => {
                            return (<ConversationBox setChatUser={setChatUser} setChatingUser={setChatingUser} conversation={c} currentUser={currentUser}></ConversationBox>)
                        })
                    }

                </div>
            </div>

            <div className="rounded-xl w-3/4 col-span-2 bg-gray-800">
                <div className="rounded-t-xl flex px-6 py-8 justify-between items-center bg-gray-700">
                    <p className="text-2xl">{chatUser ? chatUser?.username : "Chat"}</p>
                    <Menu as="div" className="ml-3 relative inline-block text-left">
                        <div>
                            <Menu.Button className="inline-flex justify-center w-full rounded-md shadow-sm py-2 bg-transparent text-sm font-medium text-gray-500 hover:text-white">
                                <BsFillGearFill className="h-8 w-8" aria-hidden="true" />
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
                                                className={classNames(
                                                    active ? 'bg-gray-100 text-gray-900 flex' : 'text-gray-700',
                                                    'flex px-4 py-2 text-sm'
                                                )}
                                            >
                                                <AiFillProfile className="h-4 w-4 mx-2" aria-hidden="true" />
                                                View Profile
                                            </div>
                                        )}
                                    </Menu.Item>
                                    <Menu.Item>
                                        {({ active }) => (
                                            <div
                                                className={classNames(
                                                    active ? 'bg-gray-100 text-gray-900 flex' : 'text-gray-700',
                                                    'flex px-4 py-2 text-sm'
                                                )}
                                            >
                                                <AiOutlineDelete className="h-4 w-4 mx-2" aria-hidden="true" />
                                                Leave Chat
                                            </div>
                                        )}
                                    </Menu.Item>
                                </div>
                            </Menu.Items>
                        </Transition>
                    </Menu>
                </div>{

                    chatingUser ?
                       <>  <div className="flex flex-col justify-between p-3 h-4/5 overflow-y-auto">
                           <div>
                            {messages?.map(c => {

                                return (<div className="py-2" ref={scroolRef}> <MessageBox message={c}  own={c.sender === currentUser.result._id} /></div>)
                            })
                            }
                           </div>
                          
                        </div>  <div className=" flex items-center justify-between border-t-2 h-1/5 border-gray-400">
                                <input
                                    className="w-4/5 px-6 py-4 mt-5 rounded-full bg-gray-400 text-white outline-none ml-10"
                                    onChange={(m)=>{setSendingMessage(m.target.value)}}
                                    value={sendingMessage}
                                />
                                <span 
                                className="rounded-full bg-gray-300 hover:bg-gray-400 p-3 mr-10  cursor-pointer"
                                onClick={()=> sendMessagee()}
                                >
                                    <AiOutlineSend className="w-6 h-6 transform hover:rotate-12 hover:scale-125" />
                                </span>
                            </div> </>: <span> Start conversation </span>
                }

            </div>
        </div>


    )
}

export default ChatPage
