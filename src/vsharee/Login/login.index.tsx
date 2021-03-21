import React from 'react';
import logo from './D:Vsharee\vSharee_frontsrcassetsimages\background.png';
import { ReduxState } from 'interface';
import { connect, ConnectedProps } from 'react-redux';
import './login.style.scss';

const Login: React.FC<ConnectedProps<typeof connector>> = function (props: ConnectedProps<typeof connector>) {
    return (
        <div className={'vsharee-login-page'}>
            <h1>Hi</h1>
            <h1>HEloooooooooooooooooooo</h1>
            <div className={'login-background'}>
                console.log(logo);
                <h1>HEloooooooooooooooooooo</h1>
            </div>
        </div>
    );
};

const mapStateToProps = (state: ReduxState) => ({
    text: state.language,
});
function Header() {
    return <img src={logo} alt="Logo" />;
}

const connector = connect(mapStateToProps);
export default connector(Login);
