import React, { useState } from 'react'
import {useHistory} from "react-router-dom";

function CreatePostCard() {
    const [user] = useState(JSON.parse(localStorage.getItem('profile')));
    const history = useHistory();
    const PF = "http://localhost:8800/images/";
    return (
        <>
            {user && (
                <div className="container mx-auto bg-gray-700 max-w-2xl xl:mt-10 mt-20 cursor-pointer p-6 rounded-lg flex flex-row">
                    
                        <img onClick={()=>history.push("/profile/"+user?.result.username)} className="w-12 h-12 rounded-full mr-6" src={PF + user?.result.imageUrl} alt="profile" />
                    
                    <a className="flex w-full" href="/submit">
                        <input className="w-full rounded px-4 bg-gray-500 text-xl shadow-2xl" type="text" placeholder="Create a post"></input>
                    </a>
                    <a className="flex items-center" href="/submit">
                        <span className="items-center p-2 hover:bg-gray-300 hover:opacity-60 rounded-lg ml-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 20 20" fill="gray">
                                <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                            </svg>
                        </span>
                    </a>
                    <a className="flex items-center" href="/submit">
                        <span className="items-center p-2 hover:bg-gray-300 hover:opacity-60 rounded-lg ml-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 20 20" fill="gray">
                                <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                            </svg>
                        </span>
                    </a>
                </div>)}
            {!user && (
                <>
                </>
            )}
        </>
    )
}

export default CreatePostCard
