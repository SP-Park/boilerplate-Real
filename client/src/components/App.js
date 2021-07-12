import './App.css';
import React, { Suspense } from 'react';
import { BrowserRouter ,Route, Switch } from "react-router-dom";
import Auth from "../hoc/auth";
import { Container } from 'react-bootstrap';

//Page
import LandingPage from './views/LandingPage';
import LoginPage from './views/LoginPage';
import RegisterPage from './views/RegisterPage';
import Menu from './views/Navbar/Menu';
import Sidebar from './views/Navbar/Sidebar';
import UsersList from './views/user/UsersList';
import NewUser from './views/user/NewUser';
import EditUser from './views/user/EditUser';



function App() {


    return (
        <Container fluid className="App">
        <BrowserRouter>
        <Suspense fallback={(<div>Loading...</div>)}>
        <Menu />
            <Container fluid className='main'>
                <Sidebar />
                <Switch>
                    <Route exact path="/" component={Auth(LandingPage, null)} /> 
                    <Route exact path="/login" component={Auth(LoginPage, false)} />
                    <Route exact path="/register" component={Auth(RegisterPage, false)} />
                    <Route exact path="/users" component={Auth(UsersList, true)} /> 
                    <Route exact path="/newuser" component={Auth(NewUser, true, 2)} />
                    <Route exact path="/users/:id" component={Auth(EditUser, true, 2)} />        
                </Switch>
                </Container>
            </Suspense>
        </BrowserRouter>
        </Container>
    )
}

export default App;
