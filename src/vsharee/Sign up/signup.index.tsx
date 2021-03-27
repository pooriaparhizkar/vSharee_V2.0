import React, { useEffect, useState } from 'react';

import { ReduxState } from 'interface';
import { connect, ConnectedProps } from 'react-redux';
import './signup.style.scss';
import RedBox from '../../assets/images/RedBox.png';
import Google from '../../assets/images/google.svg';
import googleLogo from '../../assets/images/google.svg';
import { post, responseValidator } from '../../scripts/api';
import background from 'assets/images/login-background.jpg';
import { Link } from 'react-router-dom';

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
            if (responseValidator(res.status)) console.log(res);
            else console.log(res);
        });
        //  console.log(body);
    }

    return (
        <div className={'vsharee-signup-page'}>
            <img className="background" src={background} alt="background" />

            <div className="box">
                <div className="redbox">
                    <img alt="background" src={RedBox} />
                    <h1 className="welcome-Back">Welcome Back</h1>
                    <h1 className="sign-in-to-continue">Sign up to continue access pages</h1>
                </div>
                <div className="blackbox">
                    <div className="context">
                        <h1 className="signin">Sign Up</h1>

                        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email Address" />
                        <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            placeholder="Password"
                        />
                        <input
                            value={password2}
                            onChange={(e) => setPassword2(e.target.value)}
                            type="password"
                            placeholder="Re_password"
                        />

                        <div onClick={submitHandler} className="continue">
                            <span>C O N T I N U E</span>
                            <i className="material-icons">chevron_right</i>
                        </div>

                        <h3 className="social"> or Connect with Social Media </h3>
                        <div className="rectangle">
                            <img src={googleLogo} alt="google" />
                            <p>Sign In With Google</p>
                        </div>

                        <div className="new-acc">
                            <h4>Have an account?</h4>
                            <Link to="/login">Sign In</Link>
                        </div>
                    </div>
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
