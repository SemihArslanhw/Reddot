import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import NotificationBox from "../Notifications/NotificationBox";
import * as api from "../../api/index"

export default function IndexPage() {
    const [show, setShow] = useState(null);
    const [profile, setProfile] = useState(false);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const [isNotificationShow, setIsNotificationShow] = useState(false);
    const [notification, setNotification] = useState([]);
    const dispatch = useDispatch();
    const history = useHistory();
    const PF = "http://localhost:8800/images/";

    const logout = () => {
        dispatch({ type: 'LOGOUT' });
        history.push("/")
        setUser(null);
    }

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('profile')));
        const notifications = api.getNotifications(user?.result.username);
        notifications.then((d) => { setNotification(d.data) });
    }, [notification])

    return (
        <>
            <div className="bg-gray-200 h-full w-full">
                {/* Code block starts */}
                <nav className="w-full bg-gray-900 hidden xl:block shadow">
                    <div className="container px-6 h-16 flex justify-between items-center lg:items-stretch mx-auto">
                        <div className="flex justify-start items-center">
                            <div onClick={() => history.push("/")} className="mr-20 flex items-center cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 20 20" fill="white">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                                </svg>
                                <h3 className="text-4xl text-white font-bold tracking-normal leading-tight ml-3 hidden lg:block">Reddot</h3>
                            </div>
                            <ul className="hidden xl:flex items-center h-full">
                                <a className="flex" href="/">
                                    <li className="cursor-pointer h-full flex items-center text-white text-2xl font-light tracking-normal transition duration-150 ease-in-out hover:text-gray-300 focus:text-gray-300">
                                        <span className="mr-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                                            </svg>
                                        </span>
                                        Home
                                    </li>
                                </a>
                                <a className="flex" href="/trends">
                                    <li className="cursor-pointer h-full flex items-center text-2xl hover:text-gray-300 font-light text-white mx-10 tracking-normal transition duration-150 ease-in-out">
                                        <span className="mr-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                                            </svg>
                                        </span>
                                        Daily Trends
                                    </li>
                                </a>
                                <a className="flex" href="/submit">
                                    <li className="cursor-pointer h-full flex items-center text-2xl hover:text-gray-300 font-light text-white mr-10 tracking-normal transition duration-150 ease-in-out">
                                        <span className="mr-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                                            </svg>
                                        </span>
                                        Create Post
                                    </li>
                                </a>
                            </ul>
                        </div>
                        <div className="h-full hidden xl:flex items-center justify-end">
                            <div className="h-full flex">
                                <div className="px-6 h-full flex items-center justify-center border-l border-white text-white hover:animate-bounce">
                                    <input type="text" className="bg-transparent text-white focus:outline-none text-xs w-0 transition duration-150 ease-in-out" placeholder="Type something..." />
                                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-search cursor-pointer" width={28} height={28} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" />
                                        <circle cx={10} cy={10} r={7} />
                                        <line x1={21} y1={21} x2={15} y2={15} />
                                    </svg>
                                </div>
                                <div onClick={() => history.push("/chat")} className="w-20 h-full flex items-center justify-center border-l border-r border-white text-white hover:animate-bounce">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-messages cursor-pointer" width={28} height={28} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" />
                                        <path d="M21 14l-3 -3h-7a1 1 0 0 1 -1 -1v-6a1 1 0 0 1 1 -1h9a1 1 0 0 1 1 1v10" />
                                        <path d="M14 15v2a1 1 0 0 1 -1 1h-7l-3 3v-10a1 1 0 0 1 1 -1h2" />
                                    </svg>
                                </div>
                                <div onClick={() => setIsNotificationShow(!isNotificationShow)} className="w-20 h-full flex items-center justify-center border-r border-white cursor-pointer text-white hover:animate-bounce">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-bell" width={28} height={28} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" />
                                        <path d="M10 5a2 2 0 0 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6" />
                                        <path d="M9 17v1a3 3 0 0 0 6 0v-1" />
                                    </svg>
                                </div>

                                {isNotificationShow &&
                                    <div className="absolute right-0 mt-16 mr-72 bg-white rounded-md shadow-lg overflow-hidden z-20">
                                        <div className="py-2">
                                            {notification.map((data,i)=>{
                                                return (<NotificationBox key={i} notification={data} />)
                                            })}
                                        </div>
                                        <div onClick={()=>history.push("/notifications")} className="block cursor-pointer bg-gray-800 text-white text-center font-bold py-2">See all notifications</div>
                                    </div>
                                }


                                <div className="flex items-center pl-8 relative cursor-pointer">


                                    {profile && (
                                        <ul className="p-2 w-40 border-r bg-white absolute rounded left-0 shadow mt-16 top-0 ">
                                            <li onClick={() => history.push(`/profile/${user.result.username}`)} className="cursor-pointer text-gray-600 text-sm leading-3 tracking-normal py-2 hover:text-gray-300 focus:text-gray-300 focus:outline-none">
                                                <div className="flex items-center">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-user" width={20} height={20} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                        <path stroke="none" d="M0 0h24v24H0z" />
                                                        <circle cx={12} cy={7} r={4} />
                                                        <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                                                    </svg>
                                                    <span className="ml-2">My Profile</span>
                                                </div>
                                            </li>
                                            <li onClick={() => { logout(); setProfile(!profile) }} className="cursor-pointer text-gray-600 text-sm leading-3 tracking-normal mt-2 py-2 hover:text-gray-300 flex items-center focus:text-gray-300 focus:outline-none">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
                                                </svg>
                                                <span className="ml-2">Logout</span>
                                            </li>
                                        </ul>
                                    )}
                                    {user?.result ? (
                                        <div className="flex items-center" onClick={() => setProfile(!profile)}>
                                            <img className="rounded h-10 w-10 object-cover" src={PF + user?.result.imageUrl} alt={user?.result.name} />
                                            <p className="text-white text-md font-medium ml-2">{user?.result.name}</p>
                                        </div>
                                    ) : (
                                        <a href="/login" className="flex items-center">
                                            <button className="px-6 py-2 text-lg font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-gray-500 rounded-md dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 focus:outline-none focus:bg-gray-300">
                                                Sign In
                                            </button>
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
                {/* Navbar */}
                <nav>
                    <div className="py-4 px-6 w-full flex xl:hidden justify-between items-center bg-gray-900 fixed top-0 z-40">
                        <div className="w-24 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 20 20" fill="white">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                            </svg>
                            <p className="ml-2 text-white font-extrabold text-lg">Reddot</p>
                        </div>
                        <div>
                            <div id="menu" className="text-white" onClick={() => setShow(!show)}>
                                {show ? (
                                    " "
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-menu-2" width={24} height={24} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                        <line x1={4} y1={6} x2={20} y2={6} />
                                        <line x1={4} y1={12} x2={20} y2={12} />
                                        <line x1={4} y1={18} x2={20} y2={18} />
                                    </svg>
                                )}
                            </div>
                        </div>
                    </div>
                    {/*Mobile responsive sidebar*/}
                    <div className={show ? "absolute w-full h-full transform -translate-x-0 z-40" : "absolute w-full h-full transform -translate-x-full z-40"} id="mobile-nav">
                        <div className="bg-gray-900 opacity-50 w-full h-full" onClick={() => setShow(!show)} />
                        <div className="w-64 fixed overflow-y-auto z-40 top-0 bg-gray-900 shadow h-full flex-col justify-between xl:hidden pb-4 transition duration-150 ease-in-out">
                            <div className="px-6 h-full">
                                <div className="flex flex-col justify-between h-full w-full">
                                    <div>
                                        <div className="mt-6 flex w-full items-center justify-between">
                                            <div className="flex items-center justify-between w-full">
                                                <div className="flex items-center">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 20 20" fill="white">
                                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                                                    </svg>
                                                    <p className="text-3xl font-extrabold  text-white ml-3">Reddot</p>
                                                </div>
                                                <div id="cross" className="text-white" onClick={() => setShow(!show)}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-x" width={24} height={24} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                        <path stroke="none" d="M0 0h24v24H0z" />
                                                        <line x1={18} y1={6} x2={6} y2={18} />
                                                        <line x1={6} y1={6} x2={18} y2={18} />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                        <ul className="f-m-m">
                                            <a className="cursor-pointer" href="/">
                                                <li className="text-white pt-10">
                                                    <div className="flex items-center">
                                                        <div className="w-6 h-6 md:w-8 md:h-8 text-white">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                                                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                                                            </svg>
                                                        </div>
                                                        <p className="text-white font-light text-2xl xl:text-base ml-3">Home</p>
                                                    </div>
                                                </li>
                                            </a>
                                            <a className="cursor-pointer" href="/">
                                                <li className="text-white pt-8">
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center">
                                                            <div className="w-6 h-6 md:w-8 md:h-8 text-white">
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                                                    <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                                                                </svg>
                                                            </div>
                                                            <p className="text-white font-light text-2xl xl:text-base ml-3">Daily Trends</p>
                                                        </div>
                                                    </div>
                                                </li>
                                            </a>
                                            <a className="cursor-pointer" href="/">
                                                <li className="text-white pt-8">
                                                    <div className="flex items-center">
                                                        <div className="w-6 h-6 md:w-8 md:h-8 text-white">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                                                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                                                            </svg>
                                                        </div>
                                                        <p className="text-white font-light text-2xl xl:text-base ml-3">Create Post</p>
                                                    </div>
                                                </li>
                                            </a>
                                        </ul>
                                    </div>
                                    <div className="w-full pt-4">
                                        <div className="flex justify-center mb-4 w-full">
                                            <div className="relative w-full">
                                                <div className="text-gray-500 absolute ml-4 inset-0 m-auto w-4 h-4">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-search" width={16} height={16} viewBox="0 0 24 24" strokeWidth={1} stroke="#A0AEC0" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                        <path stroke="none" d="M0 0h24v24H0z" />
                                                        <circle cx={10} cy={10} r={7} />
                                                        <line x1={21} y1={21} x2={15} y2={15} />
                                                    </svg>
                                                </div>
                                                <input className=" focus:outline-none rounded w-full text-sm text-gray-500 bg-gray-200 pl-10 py-2" type="text" placeholder="Search" />
                                            </div>
                                        </div>
                                        <div className="border-t border-gray-700">
                                            <div className="w-full flex items-center justify-between pt-1">
                                                {user?.result ? (
                                                    <div className="flex flex-col">
                                                        <div className="flex items-center">
                                                            <img className="rounded h-10 w-10 object-cover" src={user?.result.imageUrl} alt={user?.result.name} />
                                                            <p className="text-white text-md font-medium ml-2">{user?.result.name}</p>
                                                        </div>
                                                        <button className="bg-gray-500 rounded-xl text-sm mt-2">Logout</button>
                                                    </div>
                                                ) : (
                                                    <a href="/login" className="flex items-center">
                                                        <button className="px-6 py-2 text-lg font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-gray-500 rounded-md dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 focus:outline-none focus:bg-gray-300">
                                                            Sign In
                                                        </button>
                                                    </a>
                                                )}
                                                <ul className="flex">
                                                    <li className="cursor-pointer text-white pt-5 pb-3">
                                                        <div className="w-6 h-6 md:w-8 md:h-8">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-messages" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                                <path stroke="none" d="M0 0h24v24H0z" />
                                                                <path d="M21 14l-3 -3h-7a1 1 0 0 1 -1 -1v-6a1 1 0 0 1 1 -1h9a1 1 0 0 1 1 1v10" />
                                                                <path d="M14 15v2a1 1 0 0 1 -1 1h-7l-3 3v-10a1 1 0 0 1 1 -1h2" />
                                                            </svg>
                                                        </div>
                                                    </li>
                                                    <li className="cursor-pointer text-white pt-5 pb-3 pl-3">
                                                        <div className="w-6 h-6 md:w-8 md:h-8">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-bell" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                                <path stroke="none" d="M0 0h24v24H0z" />
                                                                <path d="M10 5a2 2 0 0 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6" />
                                                                <path d="M9 17v1a3 3 0 0 0 6 0v-1" />
                                                            </svg>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
                {/* Sidebar ends */}
                {/* Code block ends */}
            </div>
        </>
    );
}
