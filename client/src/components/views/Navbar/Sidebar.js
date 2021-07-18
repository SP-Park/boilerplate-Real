import './Sidebar.css';
import React from 'react';
import { useSelector } from "react-redux";
import SidebarData from './SidebarData';
import SubMenu from './Submenu';

function Sidebar() {

    const user = useSelector(state => state.user)

    function roles(role) {
        switch (role) {
            case 0:
                return 'USER';
            case 1:
                return 'ADMIN';
            case 2:
                return 'SUPER ADMIN';
            default:
                return 'No one';          
         }
    } 
    // console.log(user)
    if(user.userData && user.userData.isAuth == true ) {
        return (
            <div className="sidebar">
                <div className="sidebarWrapper">
                    <div className="sidebarMenu">
                        <ul className='nav-menu-items'>
                        
                            {/* <li className='nav-text' style={{ color:'rgb(107, 119, 140)', textAlign: 'center', height:'70px', marginTop: '10px' }}>
                                HELLO ! <br />
                                { user.userData && user.userData.name }
                                
                            </li> */}


                            <li className='nav-text' style={{ color:'#6b778c', textAlign: 'center', height:'70px' }}>
                            <div style={{ backgroundColor: 'rgb(244, 245, 247)', display: 'inline-flex', alignItems: 'center', borderRadius: '16px', width: '90%',padding: '10px'  }}>

                            <div>
                                <img
                                    src='/people1.jpg'
                                    width="30"
                                    height="30"
                                    className="topAvatar"
                                    alt="avatar"
                                />
                            </div>
                            <div style={{ marginLeft: '10px' }}>
                            <p style={{ marginBottom: '0', fontSize: '14px', fontWeight: '500' }}>HELLO ! { user.userData && user.userData.name.toUpperCase() }</p>
                            <p style={{ marginBottom: '0', fontSize: '14px', fontWeight: '400' }}> {user.userData && roles(user.userData.role)}</p>
                               
                            </div>
                            </div>    
                            </li>

                            <hr className="nav-hr" style={{ marginTop: 0, color: 'rgb(107, 119, 140)', height: 1, background: 'rgb(107, 119, 140)' }}/>

                            {SidebarData.map((item, index) => {
                                return <SubMenu item={item} key={index} />
                            })}

                        </ul>
                    </div>
                </div>
            </div>
        )
    } else {
        return null
    }
       
}

export default Sidebar
