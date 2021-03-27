import React, { useEffect } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { AuthStatus, ReduxState } from 'interface';
import { connect, ConnectedProps } from 'react-redux';
import Login from './Login/login.index';
import Signup from './Sign up/signup.index';
import Landing from './landing/landing.index';
import Profile from './Profile/Profiles';
import Verify from './Verify/Verify'
import { RoutePath } from 'data';
import Header from './Component/Header/Headers';
import { vShareeInitialize } from './Sign up/vsharee.script';
import store from '../redux/store';
import { setAuth } from '../redux/actions';

const Vsharee: React.FC<ConnectedProps<typeof connector>> = function (props: ConnectedProps<typeof connector>) {
    useEffect(() => {
        vShareeInitialize(props.dispatch);
    }, []);
    return (
        <Router>
            <Switch>
                {props.isAuth === AuthStatus.inValid && (
                    <Switch>
                        <Route path={RoutePath.login} component={Login} />
                        <Route path={RoutePath.signup} component={Signup} />
                        <Route path={RoutePath.verify}  component={Verify}/>
                        <Route path="*">
                            <Redirect to="#" />
                            <Landing />
                        </Route>
                    </Switch>
                )}
                {props.isAuth === AuthStatus.valid && (
                    <React.Fragment>
                        <Header store={store} />
                        <Switch>
                            <Route path={RoutePath.profile} component={Profile} />
                            <Route path={RoutePath.dashboard}>
                                <h1>Dashboard</h1>
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
