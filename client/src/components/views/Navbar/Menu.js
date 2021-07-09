import './Menu.css';
import React from 'react';
import { withRouter } from 'react-router-dom';
import { Nav, Form, Button, FormControl, Navbar} from 'react-bootstrap';
import { useDispatch } from "react-redux";
import { logoutUser } from "../../../actions/user_actions";
import user_reducer from '../../../reducers/user_reducer';
import { useSelector } from "react-redux";

const navWidthCollapsed = 64;
const navWidthExpanded = 280;

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


    if(user.userData && !user.userData.isAuth) {

        return (
            <div>
            <Navbar bg="dark" variant="dark" className="nav_main">
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
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="#features">Features</Nav.Link>
                <Nav.Link href="#pricing">Pricing</Nav.Link>
                </Nav>
                <Form inline>
                <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                <Button variant="outline-info">Search</Button>
                <Nav.Link href="/login">Login</Nav.Link>
                <Nav.Link href="/register">register</Nav.Link>
                </Form>
            </Navbar>
        </div>
        )
    } else {
        return (
            <div>
                <Navbar bg="dark" variant="dark">
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
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="#features">Features</Nav.Link>
                    <Nav.Link href="#pricing">Pricing</Nav.Link>
                    </Nav>
                    <Form inline>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    <Button variant="outline-info">Search</Button>
                    <Nav.Link onClick={logoutHandler}>Logout</Nav.Link>
                    </Form>
                </Navbar>
            </div>
        )
    }


}

export default withRouter(Menu)
