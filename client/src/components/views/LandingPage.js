import React, { useState, useEffect } from 'react';
import Charts from './Charts/Charts';
import Tables from './Tables/Tables';
import PieChart_1 from './Charts/PieChart';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useDispatch } from "react-redux";
import { getUsersList } from '../../actions/user_actions';
import axios from 'axios';
import { USER_SERVER } from '../Config';
import _ from 'lodash';
import { Link } from "react-router-dom";
import { AiOutlineArrowRight } from "react-icons/ai";


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


  return (
    <Container fluid style={{ marginTop: '30px' }}>
      <Row>
        <Col style={{ borderRadius: '15px', backgroundColor: '#fff', padding: '15px' }}>
        <h4 style={{ textAlign: 'center' }}>Members</h4>
         <PieChart_1 PieData={fetchData}/>
         <hr />
         <Link to="/users">See all members <AiOutlineArrowRight/></Link>
        </Col>
        <Col>
          <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up the bulk of
                the card's content.
              </Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up the bulk of
                the card's content.
              </Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up the bulk of
                the card's content.
              </Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <hr />
      <Row>
        <Charts PieData={fetchData} />
      </Row>
      <hr />
      <Row>
       <Tables />
      </Row>


      
      
    </Container>
  )
}

export default LandingPage
