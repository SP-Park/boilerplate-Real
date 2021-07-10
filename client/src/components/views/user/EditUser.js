import React, { useEffect, useRef, useState } from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import { useDispatch } from "react-redux";
import { updateUser } from '../../../actions/user_actions';
import { useForm } from 'react-hook-form';
import FileUpload from '../../Utils/FileUpload';
import axios from 'axios';
import { USER_SERVER } from '../../Config';

function EditUser(props) {

    const userId = props.match.params.id

    const [UserInfo, setUserInfo] = useState({})
    const { register, handleSubmit, watch, errors, setValue } = useForm();

    console.log(userId)

    useEffect(() => {
        axios.get(`${USER_SERVER}/user_by_id?id=${userId}`)
        .then(response => {
            const fields = ['email', 'name', 'role', 'address'];
            fields.forEach(field => setValue(field, response.data[0][field]));
            setUserInfo(response.data[0])
            console.log(response.data[0])
        })
        .catch(err => alert(err))
    }, [])

    const [Images, setImages] = useState([])
    
    const password = useRef()
    password.current = watch('password')
    console.log(watch("picture"));

    const dispatch = useDispatch()

    const updateImages = (newImages) => {
        setImages(newImages)
    }

    const onSubmit = (data) => {

        let body = {
            email: data.email,
            name: data.name,
            images: Images,
            password: data.password,
            role: data.role,
            address: data.address
        }

        dispatch(updateUser(userId, body))
        .then (response => {
            if(response.payload.success) {
                props.history.push('/users');
            } else {
                alert(response.payload.err.errmsg)
            }
        })
    }
    

    return (
        <div className="container">
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Avatar Upload</Form.Label>
                        <FileUpload refreshFunction={updateImages} />
                </Form.Group>
                <Form.Row>
                    <Col>
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
                    </Col>
                    <Col>
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
                    </Col>
                </Form.Row>
                <Form.Row>
                    <Col>
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
                    </Col>
                    <Col>
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
                    </Col>       
                </Form.Row>
                <Form.Row>
                    <Col>
                        <Form.Group controlId="Roles">
                            <Form.Label className="my-1 mr-2" htmlFor="inlineFormCustomSelectPref">
                                Roles
                            </Form.Label>
                            <Form.Control
                                as="select"
                                name="role"
                                id="inlineFormCustomSelectPref"
                                custom
                                ref={register({ required: true })}
                            >
                                <option value="0">User</option>
                                <option value="1">Admin</option>
                                <option value="2">Super Admin</option>
                            </Form.Control>
                            {errors.role && errors.role.type === "required" && <p>This name field is required.</p>}
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="formBasicAddress">
                            <Form.Label>Address</Form.Label>
                            <Form.Control name="address" type="text" placeholder="Address"  />
                        </Form.Group>
                    </Col>       
                </Form.Row>
                
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

export default EditUser
