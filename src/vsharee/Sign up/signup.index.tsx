import React, { useEffect, useState } from 'react';

import { ReduxState } from 'interface';
import { connect, ConnectedProps } from 'react-redux';
import './signup.style.scss';
import RedBox from '../../assets/images/RedBox.png';
import Google from '../../assets/images/google.svg';
import googleLogo from '../../assets/images/google.svg';
import { post } from '../../scripts/api';

const Signup: React.FC<ConnectedProps<typeof connector>> = function (props: ConnectedProps<typeof connector>) {
    const [email, setEmail] = useState<string | undefined>(undefined);
    const [username, setUsername] = useState<string | undefined>(undefined);
    const [password, setPassword] = useState<string | undefined>(undefined);
    const [password2, setPassword2] = useState<string | undefined>(undefined);
    function submitHandler() {
        const body = {
            firstname: 'null',
            lastname: 'null',
            username: username,
            email: email,
            password: password,
            password2: password2,
        };
        post('/user/signup/', body).then((res) => {
            console.log(res);
        });
        //  console.log(body);
    }

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

                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={'user-name'}
                        placeholder={'Email Address'}
                    />
                    <input
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className={'user-name'}
                        placeholder={'Username'}
                    />
                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        className={'password-'}
                        placeholder={'Password'}
                    />
                    <input
                        value={password2}
                        onChange={(e) => setPassword2(e.target.value)}
                        type="password"
                        className={'repassword'}
                        placeholder={'Re_password'}
                    />

                    <div onClick={submitHandler} className={'continue-'}>
                        <h1 className={'text-continue'}>CONTINUE</h1>
                        <i className="material-icons">chevron_right</i>
                    </div>

                    <h1 className={'social-'}>or Connect with Social Media </h1>
                    <div className={'Rectangle'}>
                        <img src={googleLogo} alt="google" />
                        <p>Sign In With Google</p>
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
