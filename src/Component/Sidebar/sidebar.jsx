import React,{useState} from 'react';
import Logo from '../../assets/image/Logo.svg';
import Group from '../../assets/image/Group.svg';
import label from '../../assets/image/label.svg';
import home from '../../assets/image/home.svg';
import call from '../../assets/image/call.svg';
import msg from '../../assets/image/msg.svg';
import tool from '../../assets/image/tool.svg';
import serch from '../../assets/image/serch.svg';
import online from '../../assets/image/online.svg';
import Componenttool from '../../assets/image/Componenttool.svg';
import Component from '../../assets/image/Component.svg';
import logout from '../../assets/image/logout.svg';
import { useNavigate } from "react-router-dom";

function Sidebar({ isLoggedIn, setIsLoggedIn }){
    const navigate = useNavigate();
    

    const handleSignOut = () => {
        localStorage.removeItem('User');
        setIsLoggedIn(false); 
        navigate('/');
    };
    
    return (
        <>
        <div className="sidebar d-flex flex-column">
                <img src={Logo} width={55} height={55}/>
                <img src={Group}width={60} height={60}/>
                <img src={label}width={60} height={60}/>
                <img src={home}width={60} height={60}/>
                <img src={call}width={60} height={60}/>
                <img src={msg}width={60} height={60}/>
                <img src={tool}width={60} height={60}/>
                <img src={serch}width={60} height={60}/>
                <img src={online}width={60} height={60}/>
                <img src={Componenttool}width={60} height={60}/>
                <img src={Component}width={60} height={60}/>
                <a  onClick={handleSignOut}>
                 <img src={logout} width={60} height={60} alt="Sign Out" />
                </a>
                <img src={online}width={60} height={60} />
        </div>
        </>
    )
}
export default Sidebar;