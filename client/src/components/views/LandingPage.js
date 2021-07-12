import React, { useState, useEffect } from 'react';
import Charts from './Charts/Charts';
import Tables from './Tables/Tables';
import { Container, Row, Col, Table } from 'react-bootstrap';
import { useDispatch } from "react-redux";
import { getUsersList } from '../../actions/user_actions';


function LandingPage() {

    const dispatch = useDispatch()
    const [UserCount, setUserCount]= useState(0)
    useEffect(() => {
        dispatch(getUsersList())
        .then (response => {
            setUserCount(response.payload.usersInfo)
            console.log(response.payload.usersInfo)
        })
        .catch(err => alert(err))
    },[])


    return (
        <Container fluid style={{ marginTop: '30px' }}>
            <br />
            <hr />
            <Charts UserCount={UserCount}/>
            <hr />
            <Tables />
        </Container>
    )
}

export default LandingPage
