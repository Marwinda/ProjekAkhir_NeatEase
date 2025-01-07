import React from "react";
import logo from "./NeatEase.png"
import { Link } from "react-router-dom";

const Navibar = () => {
    return (
        <nav className="z-10 font-poppins border-b border-yellow-700 container max-w-screen-2xl h-10 flex justify-between items-center bg-yellow-400">
            <div className="ml-5">
                <Link to="/ProjekAkhir_NeatEase"><img src={logo} alt="NeatEase" w-4 /></Link>
            </div>
        </nav>
    );
};

export default Navibar;
