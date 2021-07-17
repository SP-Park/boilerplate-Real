import React from 'react';
import { Container, Row, Col, Form, Button, Image, Jumbotron } from 'react-bootstrap';

import { useDispatch } from "react-redux";
import { loginUser } from '../../actions/user_actions';
import { useForm } from 'react-hook-form';

function LoginPage(props) {

    const dispatch = useDispatch()
    const { register, handleSubmit, watch, errors } = useForm();

    const onSubmit = (data) => {
        dispatch(loginUser(data))
        .then (response => {
            if(response.payload.loginSuccess) {
                props.history.push('/');
            } else {
                alert('Check out your Account or Password again')
            }
        })
    }

    return (
        <Container style={{ marginTop: '10%' }}>
            <Row className="app">
                <Col>
                    <Jumbotron>
                        <h1>Welcome!</h1>
                        <p>
                            Have a wonderful day !
                        </p>
                        <p>Do you need to <a href='/register'>register</a> now?</p>
                    </Jumbotron>
                    <Form onSubmit={handleSubmit(onSubmit)} style={{ width: '350px' }}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control 
                            name="email" 
                            type="email" 
                            placeholder="Enter email" 
                            ref={register({ required: true, pattern: /^\S+@\S+$/i })} 
                        />
                        {errors.email && <p>This email field is required.</p>}
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control 
                            name="password" 
                            type="password" 
                            placeholder="Password"
                            ref={register({ required: true })}    
                        />
                        {errors.password && errors.password.type === "required" && <p>This name field is required.</p>}
                    </Form.Group>
                        <Button variant="primary" type="submit">
                        Submit
                        </Button>
                    </Form>
                </Col>
                <Col>
                <Image src="/work-start.jpg" thumbnail />
                </Col>

            


            </Row>
        </Container>
    )
}

export default LoginPage
