import React, { Suspense, useState } from 'react';
import { BrowserRouter ,Route, Switch } from "react-router-dom";
import Auth from "../hoc/auth";

//Page
import LandingPage from './views/LandingPage';
import LoginPage from './views/LoginPage';
import RegisterPage from './views/RegisterPage';
import Menu from './views/Navbar/Menu';
import Sidebar from './views/Navbar/Sidebar';


const navWidthCollapsed = 64;
const navWidthExpanded = 280;

function App() {

    const [ToggleFilter, setToggleFilter] = useState(false)
    const UpdateExpanded = (e) => {
        setToggleFilter(e)
    }

    console.log('app: ', ToggleFilter)


    return (
        <BrowserRouter>
        <Suspense fallback={(<div>Loading...</div>)}>
        <Menu style={{ display: ToggleFilter ? 'blcok' : 'none' }}/>
        <Sidebar 
            UpdateExpanded={e => UpdateExpanded(e)}
            style={{ minWidth: ToggleFilter ? navWidthExpanded : navWidthCollapsed }}
        />
            <div style={{ paddingTop: '69px', minHeight: 'calc(100vh - 80px)' }}>
                <Switch>
                    <Route exact path="/" component={Auth(LandingPage, null)} /> 
                    <Route exact path="/login" component={Auth(LoginPage, false)} />
                    <Route exact path="/register" component={Auth(RegisterPage, false)} />        
                </Switch>
                
            </div>
            </Suspense>
        </BrowserRouter>
    )
}

export default App;