import './Sidebar.css';
import React, { useState } from 'react';
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';

function Sidebar(props) {

    const [expanded, setexpanded] = useState(false)

    const HandleClick = (event) => {
        setexpanded(!expanded)
        props.UpdateExpanded(expanded)
        
    }

    console.log(expanded)

    return (
        <div>
            <SideNav className="side_main" >
                <SideNav.Toggle onClick={HandleClick} value={expanded}/>
                {expanded &&
                    <SideNav.Nav>
                    <NavItem eventKey="timeInfo">
                        <NavIcon>
                            <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
                        </NavIcon>
                        <NavText>
                            time
                        </NavText>
                    </NavItem>
                    <NavItem eventKey="userInfo">
                        <NavIcon>
                            <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
                        </NavIcon>
                        <NavText>
                            user
                        </NavText>
                    </NavItem>
                    </SideNav.Nav>
                    
                }
                <SideNav.Nav defaultSelected="home">
                    <NavItem eventKey="home">
                        <NavIcon>
                            <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
                        </NavIcon>
                        <NavText>
                            Home
                        </NavText>
                    </NavItem>
                    <NavItem eventKey="charts">
                        <NavIcon>
                            <i className="fa fa-fw fa-line-chart" style={{ fontSize: '1.75em' }} />
                        </NavIcon>
                        <NavText>
                            Charts
                        </NavText>
                        <NavItem eventKey="charts/linechart">
                            <NavText>
                                Line Chart
                            </NavText>
                        </NavItem>
                        <NavItem eventKey="charts/barchart">
                            <NavText>
                                Bar Chart
                            </NavText>
                        </NavItem>
                    </NavItem>
                </SideNav.Nav>
            </SideNav>
        </div>
    )
}

export default Sidebar
