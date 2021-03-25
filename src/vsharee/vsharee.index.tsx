import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ReduxState } from 'interface';
import { connect, ConnectedProps } from 'react-redux';
import Landing from './landing/landing.index';

const Vsharee: React.FC<ConnectedProps<typeof connector>> = function (props: ConnectedProps<typeof connector>) {
    return (
        <Router>
            <Switch>
                <Route path="*">
                    <Landing />
                </Route>
            </Switch>
        </Router>
    );
};

const mapStateToProps = (state: ReduxState) => ({
    text: state.language,
});

const connector = connect(mapStateToProps);
export default connector(Vsharee);
