import './Sidebar.css';
import React from 'react';
import { SidebarData } from './SidebarData';
import { Link } from 'react-router-dom';


function Sidebar() {
    return (
        <div className="sidebar">
            <div className="sidebarWrapper">
                <div className="sidebarMenu">
                    <ul className='nav-menu-items'>
                        <li className='nav-text'>
                            timeinformation
                        </li>
                        <hr className="nav-hr" />
                        {SidebarData.map((item, index) => {
                            return (
                                <li className={item.cName}>
                                    <Link to={item.path}>
                                        {item.icon}
                                        <span>{item.title}</span>
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Sidebar
