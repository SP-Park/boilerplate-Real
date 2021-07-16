import React, { useState, useEffect } from 'react';
import Charts from './Charts/Charts';
import Tables from './Tables/Tables';
import { Container, Row, Col, Table } from 'react-bootstrap';
import { useDispatch } from "react-redux";
import { getUsersList } from '../../actions/user_actions';
import axios from 'axios';
import { USER_SERVER } from '../Config';
import _ from 'lodash';




function LandingPage() {

    const dispatch = useDispatch()

    const [fetchData, setfetchData] = useState([])
    const [PieData, setPieData] = useState([])
    const [isloading, setIsloading] = useState(true)

    let role2, role1, role0 = 0
    let Role2, Role1, Role0 = 0
    let newArrayData = []

    // useEffect(() => {
    //     dispatch(getUsersList())
    //     .then (response => {
    //         setfetchData(response.payload.usersInfo)
    //         console.log(response.payload.usersInfo)
    //     })
    //     .catch(err => alert(err))
    // },[])

    useEffect(() => {
        axios.get(`${USER_SERVER}/userslist`)
          .then(response => {
            console.log(response.data.usersInfo)
            if (response.data.usersInfo) {
              role2 = _.filter(response.data.usersInfo, item => item.role == 2)
              role1 = _.filter(response.data.usersInfo, item => item.role == 1)
              role0 = _.filter(response.data.usersInfo, item => item.role == 0)
    
              Role2 = role2.length
              Role1 = role1.length
              Role0 = role0.length
              console.log('Roles', Role2, Role1, Role0)
    
              newArrayData = [
                { name: 'Super Admin', value: Role2 },
                { name: 'Admin', value: Role1 },
                { name: 'Users', value: Role0 },
              ]

              setfetchData(newArrayData)
              setIsloading(false)
              console.log('setfetchData', newArrayData)
    
            }        
          }      
          )
      }, [])

    // const datacollector = async () => {
    //     let role2 = _.filter(fetchData, item => item.role == 2)
    //     let role1 = _.filter(fetchData, item => item.role == 1)
    //     let role0 = _.filter(fetchData, item => item.role == 0)

    //     let Role2 = role2.length
    //     let Role1 = role1.length
    //     let Role0 = role0.length

    //     let arrayData = [
    //         { name: 'Super Admin', value: Role2 },
    //         { name: 'Admin', value: Role1 },
    //         { name: 'Users', value: Role0 }
    //     ]

    //     setPieData(arrayData)
    //     return null
    // }

    // useEffect(() => {
    //     datacollector();
    // })



    return (
        <Container fluid style={{ marginTop: '30px' }}>
            <br />
            <hr />

               <Charts PieData={fetchData} />
    
            
            <hr />
            <Tables />
        </Container>
    )
}

export default LandingPage
