import React from 'react';
import { ReduxState } from 'interface';
import { connect, ConnectedProps } from 'react-redux';
import background from 'src/assets/images/background.png';
import './login.style.scss';

const Login: React.FC<ConnectedProps<typeof connector>> = function (props: ConnectedProps<typeof connector>) {
    return (
        <div className={'vsharee-login-page'}>
            <h1>Hi</h1>
            <h1>HEloooooooooooooooooooo</h1>
            <div className="background">
                <img src={background} width="1300px" height="1024px" />
            </div>
        </div>
    );
};

const mapStateToProps = (state: ReduxState) => ({
    text: state.language,
});

const connector = connect(mapStateToProps);
export default connector(Login);
