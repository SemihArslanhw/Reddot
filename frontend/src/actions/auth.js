import {AUTH} from '../constants/actionTypes';
import * as api from '../api/index.js';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const signin = (email,password, router) => async (dispatch) => {

    try {
        const { data } = await api.signIn(email,password);
        dispatch({type: AUTH, data});
        toast.success(`Login Successful`);
        setTimeout(() => {
            router.push('/')
          }, 1000)
    } catch (error) {
        console.log(error);
        toast.error(error.response.data)
    }    
}
