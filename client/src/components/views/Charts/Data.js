import React, { useEffect } from 'react';
import axios from 'axios';
import { USER_SERVER } from '../../Config';

function Data() {

    let role2, role1, role0 = 0
    let Role2, Role1, Role0 = 0

    useEffect(() => {
        axios.get(`${USER_SERVER}/userslist`)
        .then(response => {
            console.log(response.data.usersInfo)
            if(response.data.usersInfo) {
                role2 = _.filter(response.data.usersInfo, item => item.role == 2)
                role1 = _.filter(response.data.usersInfo, item => item.role == 1)
                role0 = _.filter(response.data.usersInfo, item => item.role == 0)    
            }
           console.log('roles', role2.length,role1.length,role0.length)
           Role2 = role2.length
           Role1 = role1.length
           Role0 = role0.length
           console.log('Roles', Role2, Role1, Role0)
        }
        )
    },[])


    return (
        <div>
            
        </div>
    )
}

export default Data
