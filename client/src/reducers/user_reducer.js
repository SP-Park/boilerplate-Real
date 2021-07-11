import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER,
    LOGOUT_USER,
    GET_USERS_LIST,
    UPDATE_USER,
    DELETE_USERS_LIST
} from '../actions/types';

export default function (state = {}, action ) {
    switch(action.type) {
        case REGISTER_USER:
            return {...state, register: action.payload }
        case LOGIN_USER:
            return { ...state, loginSucces: action.payload }
        case AUTH_USER:
            return {...state, userData: action.payload }
        case LOGOUT_USER:
            return {...state }
        case GET_USERS_LIST:
            return {...state, usersInfo:action.payload }
        case UPDATE_USER:
            return {...state, userUpdate:action.payload }
        case DELETE_USERS_LIST:
            return {...state, usersInfo:action.payload }
        default:
            return state;
    }
}