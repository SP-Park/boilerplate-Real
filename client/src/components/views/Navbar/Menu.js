import './Menu.css';
import React from 'react';
import { withRouter } from 'react-router-dom';
import { Nav, Form, Button, FormControl, Navbar, Image, NavDropdown, Container } from 'react-bootstrap';
import { useDispatch } from "react-redux";
import { logoutUser } from "../../../actions/user_actions";
import { useSelector } from "react-redux";


function Menu(props) {

    const user = useSelector(state => state.user)
    const dispatch = useDispatch();
    const logoutHandler = () => {
        dispatch(logoutUser())
        .then(response => {
            if (response.payload.success) {
                props.history.push("/login");
              } else {
                alert('Log Out Failed')
              }
        })
    }
    // console.log(user)


    if(user.userData && !user.userData.isAuth) {

        return (
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className="nav_main" fixed="top"  style={{ height: '50px' }} >
                <Container fluid>
                <Navbar.Brand href="/">
                    <img
                        alt=""
                        src="/logo.svg"
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                    />{' '}
                    React Bootstrap
                </Navbar.Brand>
                <Nav className="mr-auto">

                </Nav>
                <Form inline>
                <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                <Button variant="outline-info">Search</Button>
                <Nav.Link href="/login">Login</Nav.Link>
                <Nav.Link href="/register">register</Nav.Link>
                </Form>
                </Container>
            </Navbar>
        )
    } else {
        return (
                <Navbar bg="dark" variant="dark" fixed="top"  style={{ height: '50px' }} >
                    <Navbar.Brand href="/">
                        <Image 
                            alt=""
                            src="/logo.svg"
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                        />{' '}
                        React Bootstrap
                    </Navbar.Brand>
                    <Nav className="mr-auto">
                    {/* <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="#features">Features</Nav.Link>
                    <Nav.Link href="#pricing">Pricing</Nav.Link> */}
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    <Button variant="outline-info">Search</Button>
                    </Nav>
                    <Form inline>
                    {/* <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    <Button variant="outline-info">Search</Button> */}
                    {user.userData && 
                    <NavDropdown title={user.userData.name.toUpperCase()} id="collasible-nav-dropdown" className="dropdown_left">
                        <NavDropdown.Item href="#action/3.1">MY PROFILE</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item onClick={logoutHandler}>LOGOUT</NavDropdown.Item>
                    </NavDropdown>
                    }
                    <Navbar.Brand href="#avatar">
                        <img
                            src='/people1.jpg'
                            width="30"
                            height="30"
                            className="topAvatar"
                            alt="avatar"
                        />
                    </Navbar.Brand>
                    <Navbar.Brand href="#icon" >
                        <i 
                            class="fa fa-fw fa-github"
                            style={{ fontSize: '3rem' }}
                        ></i>
                    </Navbar.Brand>
                    </Form>
                </Navbar>
        )
    }

}

export default withRouter(Menu)
