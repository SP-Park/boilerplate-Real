import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table } from 'react-bootstrap';
import { useDispatch } from "react-redux";
import { getUsersList } from '../../../actions/user_actions';
import moment from 'moment';
require('moment-timezone'); 
moment.tz.setDefault("Asia/Seoul"); 

function ConnetionList() {

    const dispatch = useDispatch()
    const [Data, setData]= useState([])


    useEffect(() => {
        dispatch(getUsersList())
        .then (response => {
            let mData = response.payload.usersInfo
            console.log('old', response.payload.usersInfo)
            
            for(let i =0; i < mData.length; i++) {
              mData[i].updatedAt = moment(response.payload.usersInfo[i].updatedAt).format('YYYY-MM-DD HH:mm:ss')
            }
            // console.log(mData)
            setData(mData)
            console.log(mData)       
        })
    },[])
    


    // console.log(Data)


    return (
        <Container>
            <Row>
                <Col>
                    <br />
                    <br />
                    <h3> 사용자 접속 관리 페이지</h3>
                    <hr />
                    <Table striped bordered hover size="sm">
                        <thead>
                            <tr>
                            <th>#</th>
                            <th>ID</th>
                            <th>담당자</th>
                            <th>IP</th>
                            <th>관리자 페이지 접속 여부</th>
                            <th>최근 로그인 시간</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Data.map((item, index) => (
                                <tr>
                                    <td>{index+1}</td>
                                    <td>{item.email}</td>
                                    <td>{item.name}</td>
                                    <td>{item.ip}</td>
                                    <td></td>
                                    <td>{item.updatedAt}</td>
                                </tr>
                            ))}

                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    )
}

export default ConnetionList
