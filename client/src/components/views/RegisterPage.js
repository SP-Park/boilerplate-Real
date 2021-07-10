import React, { useRef } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch } from "react-redux";
import { registerUser } from '../../actions/user_actions';
import { useForm } from 'react-hook-form';
import FileUpload from '../Utils/FileUpload';

function RegisterPage(props) {

    const { register, handleSubmit, watch, errors } = useForm();
    const password = useRef()
    password.current = watch('password')
    console.log(watch("email"));

    const dispatch = useDispatch()

    const onSubmit = (data) => {
        dispatch(registerUser(data))
        .then (response => {
            if(response.payload.success) {
                props.history.push('/login');
            } else {
                alert(response.payload.err.errmsg)
            }
        })
    }


    return (
        <div className="container">
            <Form onSubmit={handleSubmit(onSubmit)}>
                <FileUpload />
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control 
                        name="email" 
                        type="email" 
                        placeholder="Enter email" 
                        ref={register({ required: true, pattern: /^\S+@\S+$/i })} 
                    />
                    {errors.email && <p>This email field is required.</p>}
                    <Form.Text className="text-muted">
                      We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Name</Form.Label>
                    <Form.Control 
                        name="name" 
                        type="text" 
                        placeholder="Name"
                        ref={register({ required: true, maxLength: 10 })}
                    />
                    {errors.name && errors.name.type === "required" && <p>This name field is required.</p>}
                    {errors.name && errors.name.type === "maxLength" && <p>Your inpur exceed maximum length.</p>}
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        name="password" 
                        type="password" 
                        placeholder="Password"
                        ref={register({ required: true, minLength: 6 })}    
                    />
                    {errors.password && errors.password.type === "required" && <p>This name field is required.</p>}
                    {errors.password && errors.password.type === "minLength" && <p>Password must have 6 at least characters.</p>}
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>password_confirm</Form.Label>
                     <Form.Control 
                        name="password_confirm" 
                        type="password" 
                        placeholder="Password"
                        ref={register({ required: true, validate: (value) => value === password.current})}    
                    />
                    {errors.password_confirm && errors.password_confirm.type === "required" && <p>This name field is required.</p>}
                    {errors.password_confirm && errors.password_confirm.type === "validate" && <p>Password do not match.</p>}
                </Form.Group>
                <Form.Group controlId="formBasicAddress">
                    <Form.Label>Address</Form.Label>
                    <Form.Control name="address" type="text" placeholder="Address"  />
                </Form.Group>
                <Form.Group controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>
                    <Button variant="primary" type="submit">
                      Submit
                    </Button>
            </Form>
        </div>
    )
}

export default RegisterPage
