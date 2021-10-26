import React from 'react'
import { useHistory } from "react-router-dom";
function NotificationBox({ notification }) {
    const PF = "http://localhost:8800/images/";
    const history = useHistory();
    return (
        <div onClick={()=>history.push("/profile/"+notification?.activityUser?.username)} className="flex items-center px-4 py-3 border-b hover:bg-gray-100 cursor-pointer -mx-2">
            <img className="h-8 w-8 rounded-full object-cover mx-1" src={PF + notification?.activityUser?.imageUrl} alt="avatar" />
            <p className="text-gray-600 text-sm font-medium mx-2 break-words">
                {notification.content}
            </p>
        </div>

    )
}

export default NotificationBox
