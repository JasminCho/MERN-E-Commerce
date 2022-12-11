// get cart, add items to cart, deleting items from cart, set status
import axios from 'axios';
import { returnErrors } from './errorActions';
import { GET_CART, ADD_TO_CART, DELETE_FROM_CART, CART_LOADING } from './types';

// getCart fetches cart for user
export const getCart = (id) => dispatch => {
    dispatch(setCartLoading());
    axios.get(`/api/cart/${id}`)
        .then(res => dispatch({
            type: GET_CART,
            payload: res.data
        }))
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}

// addToCart adds item to user's cart
export const addToCart = ( id, productId, quantity ) => dispatch => {
    axios.post(`/api/cart/${id}`, {productId, quantity})
        .then(res => dispatch({
            type: ADD_TO_CART,
            payload: res.data
        }))
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}

// deleteFromCart deletes item from user's cart
export const deleteFromCart = ( userId, itemId ) => dispatch => {
    axios.delete(`/api/cart/${userId}/${itemId}`)
        .then(res => dispatch({
            type: DELETE_FROM_CART,
            payload: res.data
        }))
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}

// setCartLoading 
export const setCartLoading = () => {
    return {
        type: CART_LOADING
    }
}