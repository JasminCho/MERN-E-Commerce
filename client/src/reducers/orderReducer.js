/* eslint-disable import/no-anonymous-default-export */
import { GET_ORDERS, CHECKOUT, ORDERS_LOADING } from '../actions/types';

const initialState = {
    orders: [],
    loading: false
}

export default function(state = initialState, action) {
    switch(action.type) {
        // set orders array to payload
        case GET_ORDERS:
            return {
                ...state,
                orders: action.payload,
                loading: false
            };
        // receive new order and add to orders array
        case CHECKOUT:
            return {
                ...state,
                orders: [action.payload, ...state.orders]
            };
        case ORDERS_LOADING:
            return {
                ...state,
                loading: true
            };
        default:
            return state;
    }
}