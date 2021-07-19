import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import _ from 'lodash';
import React from 'react';

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


function PieChart_1(props) {

    const data1 = props.PieData;

    if(data1.length > 0) {
        return ( 
        <Container style={{ padding: '0px' }}>
            {/* <ResponsiveContainer width="100%" height="100%"> */}
            <PieChart width= {350} height= {200} >
            <Legend layout='vertical' align='left' height={160}/>
              <Pie
                data={data1}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={100}
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
        </Container>
        )
    } else {
        return(
            <Spinner animation="border" role="status">
            
            </Spinner>
        )
    }

    
}

export default PieChart_1
