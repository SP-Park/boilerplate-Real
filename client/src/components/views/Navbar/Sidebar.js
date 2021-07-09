import './Sidebar.css';
import React, { useState } from 'react';
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText, NavHeader, NavTitle, NavSubTitle  } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';

const navWidthCollapsed = 64;
const navWidthExpanded = 280;


function Sidebar(props) {

    const [expanded, setexpanded] = useState(false)
    const [Selected, setSelected] = useState('home')


    const onSelect = () => {
        setSelected(Selected)
    };

    console.log(expanded)

    return (
        <div>
            {/* <ClickOutside
                onClickOutside={() => {
                    setexpanded(false)
                }}
            > */}
            <SideNav 
                className="side_main" 
                onSelect={onSelect}
                expanded={expanded}
                onToggle={(expanded) => {
                    setexpanded(expanded)
                }}
            >
                {/* <Toggle onClick={HandleClick} value={expanded}/> */}
                <Toggle />
                {expanded &&
                    <Nav>
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
                            <i className="fa fa-fw fa-users" style={{ fontSize: '1.75em' }} />
                        </NavIcon>
                        <NavText>
                            user
                        </NavText>
                    </NavItem>
                    </Nav>
                    
                }
                <Nav defaultSelected={Selected}>
                    <NavItem eventKey="home">
                        <NavIcon>
                        <a href='/'><i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} /></a> 
                        </NavIcon>
                        <NavText>
                        <a href='/'>Home</a> 
                        </NavText>
                    </NavItem>
                    <NavItem eventKey="user">
                            <NavIcon>
                            <a href='/users'><i className="fa fa-fw fa-users" style={{ fontSize: '1.75em' }} /></a> 
                            </NavIcon>
                            <NavText>
                            <a href='/users'>USER</a>      
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
                </Nav>
            </SideNav>
        </div>
    )
}

export default Sidebar
