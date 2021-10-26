import React, { useEffect, useState } from 'react'
import { BsChatSquareDots } from "react-icons/bs";

function Chat() {
    const [clickHandler , setClickHandler] = useState(false);
    const fakeApı = [{"username":"semih",},{"username":"ege" }]
    return (
        <div className="fixed top-3/4 left-3/4 ml-80 mt-50 ">
            <div className={(clickHandler === true ? "h-2/4 flex w-2/4 z-50 rounded-3xl bg-red-700 bottom-10 -right-1/4 mr-80  fixed": "hidden")}>
            <div className="w-1/3 flex flex-col bg-blue-700">
                <div className="h-1/4 w-full bg-yellow-400 justify-between items-center flex flex-col text-red-700">
                    <div className="w-full justify-between flex">
                        <p>Chat</p>
                    <p>(+)</p>
                    </div>
                    <p>All your chats on here</p>
                     </div>
                <div className="h-3/4 w-full bg-yellow-800">
                    {fakeApı.map((data)=>{
                        return(<p>{data.username}</p>)
                    })}
                </div>
            </div>
            <div className="w-2/3 flex flex-col bg-green-800">
                <div className="h-11 bg-blue-50 items-center justify-center">
                    <div className=" text-red-700 float-right mr-40 cursor-pointer" onClick={()=>{setClickHandler(false)}}>X</div>
                </div>
                <div className="h-full bg-indigo-700"></div>
            </div>




            </div>
            <BsChatSquareDots onClick={()=>setClickHandler(true)} className={(clickHandler === true ? "hidden" :  " w-16 h-16 cursor-pointer")}/>
       </div>
    )
}

export default Chat
