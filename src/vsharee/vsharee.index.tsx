import React, { useEffect } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { AuthStatus, ReduxState } from 'interface';
import { connect, ConnectedProps } from 'react-redux';

import Signup from './Sign up/signup.index';
import Landing from './landing/landing.index';
import Profile from './Profile/Profiles';
import Verify from './Verify/Verify';
import { RoutePath } from 'data';
import Header from './Component/Header/Headers';
import { vShareeInitialize } from './vsharee.script';
import store from '../redux/store';
import Dashboard from './Dashboard/dashboard.index';
import Login from './Login/login.index';
import DirectMessage from './DirectMessage/directMessage.index';

import Forget from './Forgetpassword/Forgetpassword';

import Group from './group/group.index';
import SetnewPass from './Forgetpassword/Setnewpass';
const Vsharee: React.FC<ConnectedProps<typeof connector>> = function (props: ConnectedProps<typeof connector>) {
    useEffect(() => {
        vShareeInitialize(props.dispatch);
    }, []);
    return (
        <Router>
            <Switch>
                {props.isAuth === AuthStatus.isInValid && (
                    <Switch>
                        <Route path={RoutePath.login} component={Login} />
                        <Route path={RoutePath.signup} component={Signup} />
                        <Route path={RoutePath.verify} component={Verify} />
                        <Route path={RoutePath.forget}>
                            <Forget />
                        </Route>
                        <Route path={RoutePath.setnew(':uidb', ':token')}>
                            <SetnewPass />
                        </Route>

                        <Route path="*">
                            <Redirect to="#" />
                            <Landing />
                        </Route>
                    </Switch>
                )}
                {props.isAuth === AuthStatus.isValid && (
                    <React.Fragment>
                        <Header store={store} />
                        <Switch>
                            <Route path={RoutePath.profile}>
                                <Profile store={store} />
                            </Route>
                            <Route path={RoutePath.dashboard}>
                                <Dashboard />
                            </Route>
                            <Route path={RoutePath.directMessage}>
                                <DirectMessage />
                            </Route>
                            <Route path={RoutePath.profileDetail(':username')}>
                                <Profile store={store} />
                            </Route>

                            <Route path={RoutePath.group(':id')}>
                                <Group />
                            </Route>
                            <Route path="*">
                                <Redirect to={RoutePath.dashboard} />
                            </Route>
                        </Switch>
                    </React.Fragment>
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
