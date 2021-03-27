import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { AuthStatus, ReduxState } from 'interface';
import { connect, ConnectedProps } from 'react-redux';
import Login from './Login/login.index';
import Signup from './Sign up/signup.index';
import Landing from './landing/landing.index';
import Profile from './Profile/Profiles';
import { RoutePath } from 'data';
import Header from './Component/Header/Headers';

const Vsharee: React.FC<ConnectedProps<typeof connector>> = function (props: ConnectedProps<typeof connector>) {
    return (
        <Router>
            <Switch>
                {props.isAuth === AuthStatus.inValid && (
                    <Switch>
                        <Route path={RoutePath.login} component={Login} />
                        <Route path={RoutePath.signup} component={Signup} />
                        <Route path="*">
                            <Redirect to="#" />
                            <Landing />
                        </Route>
                    </Switch>
                )}
                {props.isAuth === AuthStatus.valid && (
                    <Switch>
                        <Header />
                        <Route path={RoutePath.profile} component={Profile} />
                        <Route path="*">
                            <h1>dashboard</h1>
                        </Route>
                    </Switch>
                )}
            </Switch>
        </Router>
    );
};

const mapStateToProps = (state: ReduxState) => ({
    text: state.language,
    isAuth: state.authStatus,
});

const connector = connect(mapStateToProps);
export default connector(Vsharee);
