// returning errors and clearing errors

import { GET_ERRORS, CLEAR_ERRORS } from './types';

// RETURN ERRORS
// message, status, and id; returns payload with type GET_ERRORS
export const returnErrors = (msg, status, id = null) => {
    return {
        type: GET_ERRORS,
        payload: { msg, status, id }
    }
}

// CLEAR ERRORS
export const clearErrors = () => {
    return {
        type: CLEAR_ERRORS
    }
}