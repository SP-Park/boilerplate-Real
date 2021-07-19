import './App.css';
import React, { Suspense, useEffect } from 'react';
import { BrowserRouter ,Route, Switch, useHistory  } from "react-router-dom";
import Auth from "../hoc/auth";
import { Container, Row, Col } from 'react-bootstrap';
import ReactGA from 'react-ga';
import dotenv from 'dotenv';

//Page
import LandingPage from './views/LandingPage';
import LoginPage from './views/LoginPage';
import RegisterPage from './views/RegisterPage';
import Menu from './views/Navbar/Menu';
import Sidebar from './views/Navbar/Sidebar';
import UsersList from './views/user/UsersList';
import NewUser from './views/user/NewUser';
import EditUser from './views/user/EditUser';
import ConnetionList from './views/Security/ConnetionList';

dotenv.config();

function App() {


    return (
        <Container fluid className="App">
        <BrowserRouter >
        <Suspense fallback={(<div>Loading...</div>)}>
        <Menu />
            <Container fluid className='main'>
                <Row>
                    <Col xs={2} id="sidebar-wrapper">
                         <Sidebar />
                    </Col>
                    <Col xs={9} id="page-content-wrapper">
                        <Switch>
                            <Route exact path="/" component={Auth(LandingPage, true)} /> 
                            <Route exact path="/login" component={Auth(LoginPage, false)} />
                            <Route exact path="/register" component={Auth(NewUser, false)} />
                            <Route exact path="/users" component={Auth(UsersList, true)} /> 
                            <Route exact path="/newuser" component={Auth(NewUser, true, 2)} />
                            <Route exact path="/users/:id" component={Auth(EditUser, true, 2)} />      
                            <Route exact path="/security/connections" component={Auth(ConnetionList, true, 2)} />             
                       </Switch>
                    </Col>
                </Row>
                

                </Container>
            </Suspense>
        </BrowserRouter>
        </Container>
    )
}

export default App;
