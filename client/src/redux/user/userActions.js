import axios from 'axios'

import { SERVER_API } from '../../constants/urls'
import UserTypes from './userTypes'

export const signIn = user => async dispatch => {
  try {
    const res = await axios.post(`${SERVER_API}/signin`)
    const resData = res.data;
    if (resData.status === 'success') {
      dispatch({
        type: UserTypes.FETCH_USER,
        payload: resData.user
      })
    }
  } catch (error) {
    dispatch({
      type: UserTypes.SET_USER_ERROR,
      payload: 'resData.user'
    })
  }
}