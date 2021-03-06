import React, {useEffect} from 'react'; 
import Identicon from 'react-identicons';
import { Link } from "react-router-dom";

const Navbar = ({account}) =>{	
	const initOnChanged = () => {
		if (window.ethereum) {
		  window.ethereum.on("accountsChanged", () => {
			window.location.reload();
		  });
		  window.ethereum.on("chainChanged", () => {
			window.location.reload();
		  });
		}
	  };
	  useEffect(() => {
		initOnChanged();
	  }, []);

	  const disconnect = async (account) => {
		
	  }
    return (
		<nav className="bg-white shadow-lg mb-10">
			<div className="max-w-6xl mx-auto px-4 container">
				<div className="flex justify-between">
					<div className="flex space-x-7">
						<div>
							<Link to="/" className="flex py-4 ">
								
								<span className="font-semibold text-gray-500 text-lg">OneAct</span>
							</Link>
						</div>
						{/*
						<div className="hidden md:flex items-center space-x-1">
							<a href="" className="py-4 px-2 text-green-500 border-b-4 border-green-500 font-semibold ">Home</a>                            
						</div>
						*/}
					</div>
					<div className="hidden md:flex items-center space-x-3 ">
                        <Identicon string={account} size="25"/>
						<a href="#" className="py-2 px-2 font-medium text-gray-500 rounded transition duration-300">
                            {account}
                        </a>
						<a href="#" onClick={disconnect} className="py-2 px-2 font-medium text-white bg-green-500 rounded
						 hover:bg-green-400 transition duration-300">Logout</a>
					</div>
					
					<div className="md:hidden flex items-center">
						<button className="outline-none mobile-menu-button">
						<svg className=" w-6 h-6 text-gray-500 hover:text-green-500 "
							x-show="!showMenu"
							fill="none"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path d="M4 6h16M4 12h16M4 18h16"></path>
						</svg>
					</button>
					</div>
				</div>
			</div>
			<div className="hidden mobile-menu">
				<ul className="">
					<li className="active"><a href="index.html" className="block text-sm px-2 py-4 text-white bg-green-500 font-semibold">Home</a></li>
					<li><a href="#services" className="block text-sm px-2 py-4 hover:bg-green-500 transition duration-300">Services</a></li>
					<li><a href="#about" className="block text-sm px-2 py-4 hover:bg-green-500 transition duration-300">About</a></li>
					<li><a href="#contact" className="block text-sm px-2 py-4 hover:bg-green-500 transition duration-300">Contact Us</a></li>
				</ul>
			</div>
			
		</nav>
    )
}

export default Navbar;

/**
 * <!--
							<a href="" className="py-4 px-2 text-gray-500 font-semibold hover:text-green-500 transition duration-300">Services</a>
							<a href="" className="py-4 px-2 text-gray-500 font-semibold hover:text-green-500 transition duration-300">About</a>
							<a href="" className="py-4 px-2 text-gray-500 font-semibold hover:text-green-500 transition duration-300">Contact Us</a>
                            -->
 */