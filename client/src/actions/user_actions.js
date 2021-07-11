import axios from 'axios';
import { USER_SERVER } from '../components/Config';
import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER,
    LOGOUT_USER,
    GET_USERS_LIST,
    UPDATE_USER,
    DELETE_USERS_LIST
} from './types';

export function loginUser(body) {
    const request = axios.post(`${USER_SERVER}/login`, body)
    .then(response => response.data)

    return {
        type: LOGIN_USER,
        payload: request
    }
}

export function auth(){
    const request = axios.get(`${USER_SERVER}/auth`)
    .then(response => response.data);

    return {
        type: AUTH_USER,
        payload: request
    }
}

export function registerUser(data){
    const request = axios.post(`${USER_SERVER}/register`,data)
        .then(response => response.data);
    
    return {
        type: REGISTER_USER,
        payload: request
    }
}

export function updateUser(id, data){
    const request = axios.put(`${USER_SERVER}/register/${id}`,data)
        .then(response => response.data);
    
    return {
        type: UPDATE_USER,
        payload: request
    }
}

export function logoutUser() {
    const request = axios.get(`${USER_SERVER}/logout`)
        .then(response => response.data);

    return {
        type: LOGOUT_USER,
        payload: request
    }
}

export function getUsersList() {
    const request = axios.get(`${USER_SERVER}/userslist`)
    .then(response => response.data);

    return {
        type: GET_USERS_LIST,
        payload: request
    }
}

export function deleteUser(id) {
    const request = axios.get(`${USER_SERVER}/delete_user/${id}`)
    .then(response => response.data);

    return {
        type: DELETE_USERS_LIST,
        payload: request
    }
}


