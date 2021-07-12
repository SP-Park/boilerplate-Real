import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';
import { Container ,Row, Col } from 'react-bootstrap';
import _ from 'lodash';

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

            
    let role2 = _.filter(props.UserCount, item => item.role == 2)
    let role1 = _.filter(props.UserCount, item => item.role == 1)
    let role0 = _.filter(props.UserCount, item => item.role == 0)

            console.log(role2.length)
            console.log(role1.length)
            console.log(role0.length)


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
                                data={data_1}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={renderCustomizedLabel}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {data_1.map((entry, index) => (
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
                                data={data_1}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={renderCustomizedLabel}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {data_1.map((entry, index) => (
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