import './UsersList.css';
import React, { useEffect, useState } from 'react';
import { Table, Button,Popover,OverlayTrigger } from 'react-bootstrap';
import { useDispatch } from "react-redux";
import { getUsersList } from '../../../actions/user_actions';

function UsersList (props) {

    const dispatch = useDispatch()
    const [Data, setData]= useState([])

    useEffect(() => {
        dispatch(getUsersList())
        .then (response => {
            setData(response.payload.usersInfo)
        })
    },[])

    console.log(Data)

    function roles(role) {
        switch (role) {
            case 0:
                return 'USER';
            case 1:
                return 'ADMIN';
            case 2:
                return 'SUPER ADMIN';
            default:
                return 'No one';          
         }
    } 


    const popover = (
        <Popover id="popover-basic">
          <Popover.Title as="h3">Create User</Popover.Title>
          <Popover.Content>
            You can create users with <strong>Role</strong>. 
          </Popover.Content>
        </Popover>
      );
    const Example = () => (
        <OverlayTrigger trigger="hover" placement="right" overlay={popover}>
          <Button href="/newuser" variant="success">Create User</Button>
        </OverlayTrigger>
    );

    return (

        <div className="container">
            <div className="userList_header">
                <h2>Users Information</h2>
                <Example />
            </div>
            <br />
            <div>
            <Table striped bordered hover size="sm" style={{ textAlign: 'center', justifyContent: 'center', alignContent: 'center' }}>
                <thead>
                    <tr>
                    <th>Avatar</th>
                    <th>Name</th>
                    <th>ID</th>
                    <th>EMAIL</th>
                    <th>Role</th>
                    <th>created</th>
                    </tr>
                </thead>
                <tbody>
                    {Data.map((item, index) => (
                        <tr index={item._id}>
                            <td style={{ padding: 0 }}>
                                <img 
                                    // src='/people1.jpg' 
                                    src={`http://localhost:5000/${item.images}`}                            
                                    width="60" height="39" alt="" onError={(e)=>{e.target.onerror = null; e.target.src="/people1.jpg"}}
                                />
                            </td>
                            <td>{item.name.toUpperCase()}</td>
                            <td>{item._id}</td>
                            <td>{item.email}</td>
                            <td>{roles(item.role)}</td>
                            <td>{item.createdAt}</td>
                            <td><Button href={`/users/${item._id}`} variant="warning" size="sm">Edit</Button></td>
                            <td><Button variant="danger" size="sm">Delete</Button></td>

                        </tr>
                    ))}
                    
                </tbody>
            </Table>
            </div>
        </div>
    )
}

export default UsersList;