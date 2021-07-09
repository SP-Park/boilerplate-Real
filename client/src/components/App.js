import React, { Suspense, useState } from 'react';
import { BrowserRouter ,Route, Switch } from "react-router-dom";
import Auth from "../hoc/auth";

//Page
import LandingPage from './views/LandingPage';
import LoginPage from './views/LoginPage';
import RegisterPage from './views/RegisterPage';
import Menu from './views/Navbar/Menu';
import Sidebar from './views/Navbar/Sidebar';
import UsersList from './views/user/UsersList';



function App() {


    return (
        <BrowserRouter>
        <Suspense fallback={(<div>Loading...</div>)}>
        <Menu />
        <Sidebar />
            <div style={{ paddingTop: '150px', marginLeft: '100px', marginRight: '40px', minHeight: 'calc(100vh - 80px)' }}>
                <Switch>
                    <Route exact path="/" component={Auth(LandingPage, null)} /> 
                    <Route exact path="/login" component={Auth(LoginPage, false)} />
                    <Route exact path="/register" component={Auth(RegisterPage, false)} />
                    <Route exact path="/users" component={Auth(UsersList, true)} />        
                </Switch>
                
            </div>
            </Suspense>
        </BrowserRouter>
    )
}

export default App;
