import {Redirect, Route} from 'react-router-dom'
import Cookies from 'js-cookie';
import React, { Component } from 'react'

const PrivateRoute = ({component: Component, ...rest}) => {
    const auth = Cookies.get('token');
  return (
    <Route
        {...rest}
       render={(props) =>auth?<Component {...props} />: <Redirect to='/login'/>}
    />
  )
}

export default PrivateRoute