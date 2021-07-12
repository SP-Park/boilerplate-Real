import './Sidebar.css';
import React from 'react';
import { SidebarData } from './SidebarData';
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";


function Sidebar() {

    const user = useSelector(state => state.user)

    // console.log(user)

        return (
            <div className="sidebar">
                <div className="sidebarWrapper">
                    <div className="sidebarMenu">
                        <ul className='nav-menu-items'>
                        
                            <li className='nav-text' style={{ color:'#f5f5f5', textAlign: 'center', height:'70px', marginTop: '10px' }}>
                                HELLO ! <br />
                                { user.userData && user.userData.name }
                                
                            </li>
                            <hr className="nav-hr" style={{ marginTop: 0, color: '#f5f5f5', height: 1, background: '#f5f5f5' }}/>
                        
                            {SidebarData.map((item, index) => {
                                return (
                                    <li key={index} className={item.cName}>
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
