import React from 'react'

function MessageBox({ message, own }) {
    return (
        <div className={own ? "justify-end flex" : "flex flex-col mt-5 "}>
            <div className="flex items-center">
                {own ? 
                <>
                <p className="px-6 py-4 rounded-xl bg-green-700 mr-4 text-white max-w-xs">{message.text}</p>
                <img className="w-12 h-12 rounded-full" src="https://i.pinimg.com/550x/74/3c/6a/743c6ac45b3cad804af45a60485e73ae.jpg" alt="profile" />
                </>
                :
                <>
                <img className="w-12 h-12 rounded-full" src="https://i.pinimg.com/550x/74/3c/6a/743c6ac45b3cad804af45a60485e73ae.jpg" alt="profile" />
                <p className="px-6 py-4 rounded-xl bg-gray-700 ml-4 text-white max-w-xs">{message.text}</p>
                </>
                }
            </div>
            <div className="text-xs mt-2">

            </div>
        </div>
    )
}

export default MessageBox
