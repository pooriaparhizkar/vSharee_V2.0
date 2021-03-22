import React from 'react';

import { ReduxState } from 'interface';
import { connect, ConnectedProps } from 'react-redux';
//import box from 'assets/images/box.png';
//import RedBox from 'assets/images/RedBox.png';
import './login.style.scss';

const Login: React.FC<ConnectedProps<typeof connector>> = function (props: ConnectedProps<typeof connector>) {
    return (
        <div className={'vsharee-login-page'}>
            <div className={'Box'}>
                <div className={'Redbox'}></div>

                <div className={'Blackbox'}></div>
            </div>
        </div>
    );
};

const mapStateToProps = (state: ReduxState) => ({
    text: state.language,
});

const connector = connect(mapStateToProps);
export default connector(Login);
