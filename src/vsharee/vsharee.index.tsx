import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ReduxState } from 'interface';
import { connect, ConnectedProps } from 'react-redux';
import Login from './Login/login.index';
import Signup from './Sign up/signup.index';
import Landing from './landing/landing.index';
import Profile from './Profile/Profiles';
import { RoutePath } from 'data';

const Vsharee: React.FC<ConnectedProps<typeof connector>> = function (props: ConnectedProps<typeof connector>) {
    return (
        <Router>
            <Switch>
                <Route path={RoutePath.login} component={Login} />
                <Route path={RoutePath.signup} component={Signup} />
                <Route path={RoutePath.profile} component={Profile} />
                <Route path="*" component={Landing} />
            </Switch>
        </Router>
    );
};

const mapStateToProps = (state: ReduxState) => ({
    text: state.language,
});

const connector = connect(mapStateToProps);
export default connector(Vsharee);
