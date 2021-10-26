import React, { useState, useEffect } from 'react'
import * as api from "../../api/index"
import moment from "moment";
import { useHistory } from "react-router-dom";
import { AiFillDelete } from "react-icons/ai";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function NotificationPage() {
    const [notification, setNotification] = useState([]);
    const [user] = useState(JSON.parse(localStorage.getItem('profile')));
    const PF = "http://localhost:8800/images/";
    const history = useHistory();

    useEffect(() => {
        const notifications = api.getAllNotifications(user?.result.username);
        notifications.then((d) => { setNotification(d.data) });
    }, [notification])

    const deleteNotification = (id) =>{
        
        try {
            const res = api.deleteNotification(id);
            toast.success(res?.data);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="py-8 justify-center items-center flex">
            <div className="w-1/2 bg-white shadow rounded p-6">
                <div className="flex items-center justify-center border-b-2 pb-4">
                    <p className="text-2xl font-bold leading-5 text-gray-800">Notifications</p>
                </div>
                {notification.map((data) => {
                    return (
                        <div className="mt-6 flex hover:bg-gray-200 rounded-xl border-b pb-2 cursor-pointer">
                            <div onClick={() => history.push("/profile/" + data?.activityUser?.username)} className="w-10 flex flex-col items-center">
                                <img className="h-10 rounded-full" src={PF + data?.activityUser?.imageUrl} />
                                <div className="pt-4">
                                    <svg width={1} height={40} viewBox="0 0 1 47" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <line x1="0.5" y1="2.18557e-08" x2="0.499998" y2={47} stroke="#D1D5DB" strokeDasharray="2 2" />
                                    </svg>
                                </div>
                            </div>
                            <div className="px-3 w-full ">
                                <div className="flex justify-between ">
                                    <p onClick={() => history.push("/profile/" + data?.activityUser?.username)} className="text-sm font-semibold leading-normal text-gray-800">{data?.activityUser?.username}</p>
                                    <AiFillDelete onClick={()=>deleteNotification(data?._id)} className="text-red-500 w-6 h-6" />
                                </div>

                                <p className="text-xs leading-3 text-gray-500 pt-1">{moment(moment(data?.createdAt).format("DD/MM/YYYY"), "DD/MM/YYYY").fromNow()}</p>
                                <p onClick={() => history.push("/profile/" + data?.activityUser?.username)} className="pt-4 text-sm leading-4 text-gray-600">
                                    {data?.content}
                                </p>
                            </div>
                        </div>
                    )
                })}


            </div>
        </div>
    )
}

export default NotificationPage
