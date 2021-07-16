import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { USER_SERVER } from '../../Config';



const data = [
  { name: 'Page A', uv: '400', pv: '2400', amt: '2400' },
  { name: 'Page B', uv: '300', pv: '2400', amt: '2400' },
  { name: 'Page C', uv: '200', pv: '2400', amt: '2400' },
  { name: 'Page D', uv: '300', pv: '2400', amt: '2400' },
  { name: 'Page E', uv: '300', pv: '2400', amt: '2400' },
  { name: 'Page F', uv: '300', pv: '2400', amt: '2400' },
  { name: 'Page G', uv: '300', pv: '2400', amt: '2400' },
  { name: 'Page H', uv: '300', pv: '2400', amt: '2400' },
  { name: 'Page I', uv: '300', pv: '2400', amt: '2400' },
];



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


function Charts(props) {

  const data1 = props.PieData;

  return (
    <Row>
      <Col xs>
        <h3>Users Behavior</h3>
        <LineChart width={700} height={400} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
          <Line type="monotone" dataKey="uv" stroke="#8884d8" />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
        </LineChart>
      </Col>


      {data1.length > 0 ?
        <Col xs>
          <h3>Roles</h3>
      {/* <ResponsiveContainer width="100%" height="100%"> */}
        <PieChart width={600} height={500}>
          <Pie
            data={data1}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data1.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      {/* </ResponsiveContainer> */}
        </Col>
        :
        <Col xs>
          <Spinner animation="border" role="status">
  <span className="visually-hidden">Loading...</span>
</Spinner>
        </Col>

      }



    </Row>

  )

}


export default Charts