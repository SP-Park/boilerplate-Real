import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
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

    return (
        <div className="userList">
            <h2>Users Information</h2>
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
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
                            <td>{item.name.toUpperCase()}</td>
                            <td>{item._id}</td>
                            <td>{item.email}</td>
                            <td>{roles(item.role)}</td>
                            <td>{item.createdAt}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
}

export default UsersList;