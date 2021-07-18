import React, { useState } from 'react';
import { Link } from "react-router-dom";

function Submenu({ item,index }) {

    const [subnav, setSubnav] = useState(false);
    const showSubnav = () => setSubnav(!subnav);


    return (
        <>
        <li key={index} className={item.className} style={{ color: '#6b778c' }}>
        <Link to={item.path} 
        onClick={item.subNav && showSubnav }>
            <div style={{ display:'flex', justifyContent: 'space-between', width: '95%'  }}>
                <div>
                    {item.icon}
                    <span>{item.title}</span>
                </div>
                <div>
                    {item.subNav && subnav
                    ? item.iconOpened
                    : item.subNav
                    ? item.iconClosed
                    : null}
                </div>
            </div>
        </Link>
        </li>
        {subnav &&
          item.subNav.map((item, index) => {
            return (     
                <li key={index} className={item.className} style={{ alignItems: 'center', textDecoration: 'none', paddingLeft: '2rem' }}>
                    <Link to={item.path} style={{ paddingLeft: '0px'}}>
                        {item.icon}
                        <span>{item.title}</span>
                    </Link>
                </li>
            );
          })}
      </>
    )
}

export default Submenu
