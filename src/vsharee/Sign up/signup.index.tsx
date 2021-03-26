import React from 'react';

import { ReduxState } from 'interface';
import { connect, ConnectedProps } from 'react-redux';
import './signup.style.scss';
import RedBox from '../../assets/images/RedBox.png';
import Google from '../../assets/images/google.svg';

const Signup: React.FC<ConnectedProps<typeof connector>> = function (props: ConnectedProps<typeof connector>) {
    return (
        <div className={'vsharee-Signup-page'}>
            <div className={'Box-Box'}>
                <div className={'Red-box'}>
                    <img className={'Redboxbackgroundcolor'} src={RedBox} />
                    <h1 className={'Welcome-Back'}>Welcome Back</h1>
                    <h1 className={'Sign-in-to-continue-'}>Sign in to continue access pages</h1>
                </div>
                <div className={'Black-box'}>
                    <i className="material-icons-outlined">lock</i>
                    <h1 className={'signun'}>Sign Up</h1>
                    <input className={'user-name'} placeholder={'Email Address'} />
                    <input className={'password-'} placeholder={'Password'} />
                    <input className={'repassword'} placeholder={'Re_password'} />
                    <div className={'continue-'}>
                        <h1 className={'textcontinue'}>C O N T I N U E</h1>
                        <i className="cfi cfi-chevron-right"></i>
                    </div>

                    <h1 className={'social-'}>or Connect with Social Media </h1>
                    <div className={'Google'}>
                        <input className={'Rectangle-'} placeholder={'Sign In With Google '} />
                    </div>

                    <h1 className={'haveaccount'}>have an accoun?</h1>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state: ReduxState) => ({
    text: state.language,
});

const connector = connect(mapStateToProps);
export default connector(Signup);
