import React, { Component } from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import { connect } from 'react-redux';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import NewWorkOrderForm from '../NewWorkOrder/NewWorkOrderForm';
import HelpPage from '../HelpPage/HelpPage';
import UserPage from '../UserPage/UserPage';
import InfoPage from '../InfoPage/InfoPage';
import LandingPage from '../LandingPage/LandingPage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import AdminUserPage from '../AdminUserPage/AdminUserPage';
import Property from '../PropertyPage/property';
import WorkOrderDetails from '../WorkOrderDetails/WorkOrderDetails';
import Reports from '../Reports/Reports';



import './App.css';

class App extends Component {
  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_USER' });
  }

  render() {
    return (
      <Router>
        <div>
          <Nav />
          <Switch>
            {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
            <Redirect exact from="/" to="/home" />

            {/* Visiting localhost:3000/about will show the about page. */}
            <Route
              // shows HelpPage at all times (logged in or not)
              exact
              path="/help"
              component={HelpPage}
            />

            {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}
            <ProtectedRoute
              // logged in shows UserPage else shows LoginPage
              exact
              path="/workorders"
              component={UserPage}
            />

            <ProtectedRoute
              // logged in shows UserPage else shows LoginPage
              exact
              path="/newOrder"
              component={NewWorkOrderForm}
            />

            <ProtectedRoute
              // logged in shows InfoPage else shows LoginPage
              exact
              path="/info"
              component={InfoPage}
            />

            <ProtectedRoute
              // logged in shows InfoPage else shows LoginPage
              exact
              path="/workOrderDetails/:id/:status"
              component={WorkOrderDetails}
            />

            <ProtectedRoute
              // logged in shows InfoPage else shows LoginPage
              exact
              path="/admin/property"
              component={Property}
              adminRedirect="/workorders"
            />

            {/* When a value is supplied for the authRedirect prop the user will
            be redirected to the path supplied when logged in, otherwise they will
            be taken to the component and path supplied. */}
            <ProtectedRoute
              // with authRedirect:
              // - if logged in, redirects to "/user"
              // - else shows LoginPage at /login
              exact
              path="/login"
              component={LoginPage}
              authRedirect="/workorders"
            />
            
            <ProtectedRoute
              // with authRedirect:
              // - if logged in, redirects to "/user"
              // - else shows RegisterPage at "/registration"
              exact
              path="/registration"
              component={RegisterPage}
              authRedirect="/workorders"
            />
            <ProtectedRoute
              // with authRedirect:
              // - if logged in, redirects to "/user"
              // - else shows LandingPage at "/home"
              exact
              path="/home"
              component={LandingPage}
              authRedirect="/workorders"
            />
            <ProtectedRoute
              // with authRedirect:
              // - if logged in, redirects to "/admin/users"
              // - else shows LandingPage at "/user"
              exact
              path="/admin/users"
              component={AdminUserPage}
              adminRedirect="/workorders"
              />
            <ProtectedRoute
              // with authRedirect:
              // - if logged in, redirects to "/admin/users"
              // - else shows LandingPage at "/user"
              exact
              path="/admin/reports"
              component={Reports}
              adminRedirect="/workorders"
              />

            {/* If none of the other routes matched, we will show a 404. */}
            <Route render={() => <div><center><h1>Sorry This Page Does Not Exist!</h1></center></div>} />
          </Switch>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default connect()(App);
