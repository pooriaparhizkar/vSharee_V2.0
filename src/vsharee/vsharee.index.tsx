import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ReduxState } from 'interface';
import { connect, ConnectedProps } from 'react-redux';

const Vsharee: React.FC<ConnectedProps<typeof connector>> = function (props: ConnectedProps<typeof connector>) {
    return (
        <Router>
            <Switch>
                <Route path="/login">
                    <h1>Hi</h1>
                </Route>
                <Route path="*">
                    <h1>Welcome to vSharee</h1>
                    <p>{props.text.body.test}</p>
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
