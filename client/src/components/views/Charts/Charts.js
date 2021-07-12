import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';
import { Container ,Row, Col } from 'react-bootstrap';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getUsersList } from '../../../actions/user_actions';
import axios from 'axios';
import { USER_SERVER } from '../../Config';



const data = [
    {name: 'Page A', uv: '400', pv: '2400', amt: '2400'},
    {name: 'Page B', uv: '300', pv: '2400', amt: '2400'},
    {name: 'Page C', uv: '200', pv: '2400', amt: '2400'},
    {name: 'Page D', uv: '300', pv: '2400', amt: '2400'},
    {name: 'Page E', uv: '300', pv: '2400', amt: '2400'},
    {name: 'Page F', uv: '300', pv: '2400', amt: '2400'},
    {name: 'Page G', uv: '300', pv: '2400', amt: '2400'},
    {name: 'Page H', uv: '300', pv: '2400', amt: '2400'},
    {name: 'Page I', uv: '300', pv: '2400', amt: '2400'},
];




// const data_1 = [
//     { name: 'Group A', value: 400 },
//     { name: 'Group B', value: 300 },
//     { name: 'Group C', value: 300 },
//     { name: 'Group D', value: 200 },
//   ];
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
  
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
  
    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };


function Charts(props){
    
    const dispatch = useDispatch()
    const user = useSelector(state => state.user.usersInfo)
    const [Role2, setRole2]= useState(0)
    const [Role1, setRole1]= useState(0)
    const [Role0, setRole0]= useState(0)

    useEffect(() => {
        if(props.UserCount) {
            let role2, role1, role0 = 0

            role2 = _.filter(props.UserCount, item => item.role == 2)
            role1 = _.filter(props.UserCount, item => item.role == 1)
            role0 = _.filter(props.UserCount, item => item.role == 0)
            console.log('1',props.UserCount)

            setRole2(role2.length)
            setRole1(role1.length)
            setRole0(role0.length)
        } else {
            console.log('something wrong')
        }

    },[props.UserCount])

    console.log('redux', user)

    console.log('roles', Role2,Role1,Role0)
    console.log('2',props.UserCount)

    if (props.UserCount && props.UserCount != 0 ) {
        console.log('1_roles', Role2,Role1,Role0)
    }

    // const user = useSelector(state => state.user.usersInfo)
    // const userProps = props.UserCount
    // console.log(user)
    // console.log(userProps)

    
    
    // let role2, role1, role0 = 0
    // let role_data = []

    
    // console.log('2', UserCount)
    //     if(UserCount.length >= 1) {
    //         role2 = _.filter(UserCount, item => item.role == 2)
    //         role1 = _.filter(UserCount, item => item.role == 1)
    //         role0 = _.filter(UserCount, item => item.role == 0)
    
    //         role_data = [
    //             { name: 'Super Admin', value: parseInt(role2, 10) },
    //             { name: 'Admin', value: parseInt(role1, 10) },
    //             { name: 'User', value: parseInt(role0, 10) }
    //         ]
    //     }




    // console.log(role0, role1, role2)  
    // console.log(role_data)
    
    
  
    
    
    // console.log(props)

// console.log(role_data)

    return (
            <Row>
                <Col xs>
                <h3>Users Behavior</h3>
                    <LineChart width={900} height={300} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                        <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                    </LineChart>
                </Col>
                <Col xs>
                <ResponsiveContainer width="100%" height="100%">
                            <PieChart width={300} height={400}>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={renderCustomizedLabel}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            </PieChart>
                    </ResponsiveContainer>
                </Col>
                <Col xs>
                <ResponsiveContainer width="100%" height="100%">
                            <PieChart width={300} height={400}>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={renderCustomizedLabel}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            </PieChart>
                    </ResponsiveContainer>
                </Col>
            </Row>
       
    )
}


export default Charts