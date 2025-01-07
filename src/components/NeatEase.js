import React from "react";
import logo from './NeatEase.png';
import { Link } from 'react-router-dom';
import ring from './ring.png';
import bg from './bg.png';

const NeatEase = () => {
    return (
        <div className="relative container flex h-screen items-center max-w-screen-2xl justify-center p4 bg-yellow-200 ">
            <img src={bg} alt="bg" className="absolute z-0 w-full h-full"></img>
            <img src={ring} alt="ring" className="z-20 absolute w-96 mr-96"></img>
            <div className="z-10 box flex flex-col items-center justify-center w-96 h-96 bg-yellow-400 rounded-tl-3xl rounded-br-3xl shadow-lg shadow-yellow-800">
                <h1 className="ml-10 mr-10 text-2xl text-yellow-900 text-secondary text-center font-poppins">Atur Tugasmu lebih Mudah dan Rapi dengan</h1>
                <img src={logo} alt="NeatEase" className="mr-8"/>
                
                <Link to="/TaskList">
                    <button className="bg-yellow-800 hover:bg-yellow-600 text-white p-2 rounded-2xl mt-10">Go to Task List</button>
                </Link>
            </div>
        </div>
    );
};

export default NeatEase;