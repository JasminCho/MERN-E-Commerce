// get all orders of user, place new order, set as loading
import axios from 'axios';
import { returnErrors } from './errorActions';
import { GET_ORDERS, CHECKOUT, ORDERS_LOADING } from './types';

// getOrders of user
export const getOrders = (id) => dispatch => {
    dispatch(setOrdersLoading());
    axios.get(`/api/order/${id}`)
        .then(res => dispatch({
            type: GET_ORDERS,
            payload: res.data
        }))
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}

// checkout uses stripe source and userId
export const checkout = (id, source) => dispatch => {
    axios.post(`/api/order/${id}`, { source })
        .then(res => dispatch({
            type: CHECKOUT,
            payload: res.data
        }))
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
} 

// setOrdersLoading
export const setOrdersLoading = () => {
    return {
        type:ORDERS_LOADING
    }
}