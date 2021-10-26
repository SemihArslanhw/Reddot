import React from 'react'
import { useHistory} from "react-router-dom";

function SubHeader() {
    const history = useHistory();
    return (
        <div className="bg-gray-800 xl:flex flex-row justify-center items-center hidden">
            <div className="p-3">
            <span onClick={()=>history.push("/category/Technology 👨‍💻")} className="mr-10 text-2xl text-white hover:animate-pulse cursor-pointer">Technology 👨‍💻</span>
            <span onClick={()=>history.push("/category/Games 🎮")} className="mr-10 text-2xl text-white hover:animate-pulse cursor-pointer">Games 🎮</span>
            <span onClick={()=>history.push("/category/Memes 🐸")} className="mr-10 text-2xl text-white hover:animate-pulse cursor-pointer">Memes 🐸</span>
            <span onClick={()=>history.push("/category/Nature 🌲")} className="mr-10 text-2xl text-white hover:animate-pulse cursor-pointer">Nature 🌲</span>
            <span onClick={()=>history.push("/category/Politics 🗳️")} className="mr-10 text-2xl text-white hover:animate-pulse cursor-pointer">Politics 🗳️</span>
            <span onClick={()=>history.push("/category/Finance 💸")} className="mr-10 text-2xl text-white hover:animate-pulse cursor-pointer">Finance 💸</span>
            <span onClick={()=>history.push("/category/Sport 🏅")} className="mr-10 text-2xl text-white hover:animate-pulse cursor-pointer">Sport 🏅</span>
            <span onClick={()=>history.push("/category/Other 🛃")} className="mr-10 text-2xl text-white hover:animate-pulse cursor-pointer">Other 🛃</span>
            </div>
        </div>
    )
}

export default SubHeader
