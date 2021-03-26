import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ReduxState } from 'interface';
import { connect, ConnectedProps } from 'react-redux';
import Landing from './landing/landing.index';
import Header from './Component/Header/Headers';
import Profile from './Profile/Profiles';
import { RoutePath } from 'data';

const Vsharee: React.FC<ConnectedProps<typeof connector>> = function () {
    return (
        <Router>
            <Switch>
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
