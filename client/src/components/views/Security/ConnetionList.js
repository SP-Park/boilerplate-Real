import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table } from 'react-bootstrap';
import { useDispatch } from "react-redux";
import { getUsersList } from '../../../actions/user_actions';
import Datepicker from '../../Utils/DatePicker';
import moment from 'moment';
require('moment-timezone');
moment.tz.setDefault("Asia/Seoul");


function ConnetionList() {

    const dispatch = useDispatch()
    const [Data, setData] = useState([])
    const [StartDate, setStartDate] = useState(null)
    const [EndDate, setEndDate] = useState(null)


    useEffect(() => {
        dispatch(getUsersList())
            .then(response => {
                let mData = response.payload.usersInfo
                console.log('old', response.payload.usersInfo)

                for (let i = 0; i < mData.length; i++) {
                    mData[i].updatedAt = moment(response.payload.usersInfo[i].updatedAt).format('YYYY-MM-DD HH:mm:ss')
                }
                // console.log(mData)
                setData(mData)
                console.log(mData)
            })
    }, [])

    const setSearchDateString = (date) => {
        setStartDate(date)
        console.log('StartDate', StartDate)
    }
    const setSelectedEndDateString = (date) => {
        setEndDate(date)
        console.log('EndDate', EndDate)
    }

    return (
        <Container fluid style={{ marginTop: '30px', backgroundColor: '#fff', padding: '10px', borderRadius: '15px' }}>

            <Tabs>
                <TabList>
                    <Tab>접속 성공 로그</Tab>
                    {/* <Tab disabled>Luigi</Tab> */}
                    <Tab>접속 실패 로그</Tab>
                </TabList>
                <TabPanel>
                    <Row>
                        <Col>
                            <Datepicker 
                                setSearchDateString={setSearchDateString}
                                setSelectedEndDateString={setSelectedEndDateString}
                                isRangeSearch
                            />
                            <hr />
                            {/* <h5 style={{ textAlign: 'center' }}> 사용자 접속 성공 로그</h5> */}
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
                                            <td>{index + 1}</td>
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
                </TabPanel>
                <TabPanel>
                    <Row>
                        <Col>
                        <Datepicker 
                                setSearchDateString={setSearchDateString}
                                setSelectedEndDateString={setSelectedEndDateString}
                                isRangeSearch
                            />
                            {/* <h5 style={{ textAlign: 'center' }}> 사용자 접속 실패 로그</h5> */}
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
                                            <td>{index + 1}</td>
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
                </TabPanel>

            </Tabs>
        </Container>
    )
}

export default ConnetionList
