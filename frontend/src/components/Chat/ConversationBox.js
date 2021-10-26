import React, { useEffect, useState } from 'react'
import * as api from "../../api/index"

function ConversationBox({conversation , currentUser , setChatingUser , setChatUser}) {
    const [user , setUser] = useState(null);
    
    useEffect(()=>{
     const friendId = conversation?.members.find(m=> m !== currentUser.result._id)
     const getUser = async ()=>{
        try {
            const res = await api.getUserById(friendId)
            setUser(res.data)
            
        } catch (error) {
            console.log("olmadı moruk")
        } 
     }
     getUser()
     
    },[currentUser,conversation])
    return (
        <div className="flex flex-col cursor-pointer hover:bg-yellow-200 px-6 py-6 items-start bg-gray-500 border-b-2 border-gray-400" onClick={()=>{setChatingUser(conversation); setChatUser(user)} }>
            <div className="flex">
                <img className="w-12 h-12 rounded-full" src="https://i.pinimg.com/550x/74/3c/6a/743c6ac45b3cad804af45a60485e73ae.jpg" alt="profile" />
                <div>
                    <p className="text-lg font-medium ml-4">{user?.username}</p>
                    
                </div>
            </div>
        </div>
    )
}

export default ConversationBox
