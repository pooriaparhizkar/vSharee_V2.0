import React from 'react';

import { ReduxState } from 'interface';
import { connect, ConnectedProps } from 'react-redux';
//import box from 'assets/images/box.png';
import RedBox from 'assets/images/RedBox.png';
import './login.style.scss';

const Login: React.FC<ConnectedProps<typeof connector>> = function (props: ConnectedProps<typeof connector>) {
    return (
        <div className={'vsharee-login-page'}>
            <div className={'Box'}>
                <div className={'Redbox'}>
                    <img className={'Redboxbackground'} src={RedBox} />
                    <h1 className={'Welcome-Back-'}>Welcome Back</h1>
                    <h1 className={'Sign-in-to-continue'}>Sign in to continue access pages</h1>
                </div>

                <div className={'Blackbox'}>
                    <i className="material-icons-outlined">lock</i>
                    <h1 className={'signin'}>Sign In</h1>
                    <input className={'username'} placeholder={'Email Address'} />
                    <input className={'password'} placeholder={'Password'} />
                    <div className={'continue'}>
                        <h1 className={'text-continue'}>C O N T I N U E</h1>
                        <i className="material-icons">chevron_right</i>
                    </div>

                    <h1 className={'social'}>or Connect with Social Media </h1>
                    <input className={'Rectangle'} placeholder={'Sign In With Google '} />
                    <h1 className={'donthaveaccount'}>Don’t have an accoun?</h1>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state: ReduxState) => ({
    text: state.language,
});

const connector = connect(mapStateToProps);
export default connector(Login);
