import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ReduxState } from 'interface';
import { connect, ConnectedProps } from 'react-redux';
import { RoutePath } from 'data';
import Header from './Component/Header/Headers'
import Profile from './Profile/Profiles'
const Vsharee: React.FC<ConnectedProps<typeof connector>> = function (props: ConnectedProps<typeof connector>) {
    return (
        <Router>
            <Header/>
                          <Switch>
                
                {/* <Route path="*">
                    <h1>Welcome to vSharee</h1>
                    <p>{props.text.body.test}</p>
                </Route> */}
                <Route path={RoutePath.profile} component={Profile} />
            </Switch> 
        
 
        </Router>
    );
};

const mapStateToProps = (state: ReduxState) => ({
    text: state.language,
});

const connector = connect(mapStateToProps);
export default connector(Vsharee);
