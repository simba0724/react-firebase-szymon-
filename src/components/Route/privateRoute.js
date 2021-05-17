import  React from  "react";
import { Route, Redirect } from  "react-router-dom";

import { AuthUserContext } from '../Session';
 // 
const PrivateRoute = (props) => (
  	<AuthUserContext.Consumer>
    	{
    		authUser => {
                if(props.path == "/login" || props.path == "/register" || props.path == "/forgotpassword"){
                    if(authUser) {
                        return (<Redirect  to="/"/>)
                    } else {
                        return (<Route  path={props.path}  exact={props.exact} component={props.component} />);
                    }
                }
    			if(authUser) {
    				return (
    					<Route  path={props.path}  exact={props.exact} component={props.component} />
					)
    			} else {
    				return (
    					<Redirect  to="/login"/>
					)
    			}
	    	}
    	}
  </AuthUserContext.Consumer>
);

export default PrivateRoute;

// authUser ? (
//       			<Route  path={props.path}  exact={props.exact} component={props.component} />
//       		) : (
// 		        <Redirect  to="/login"  />
// 	      	)

// props.path == "/login" || props.path == "/register" || props.path == "/forgotpassword"  ? (
//   <Redirect  to="/"  />
// ) :
// (
//   <Route  path={props.path}  exact={props.exact} component={props.component} />
// )