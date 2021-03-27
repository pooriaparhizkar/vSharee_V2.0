import React, { useState } from 'react';

import { ReduxState } from 'interface';
import { connect, ConnectedProps } from 'react-redux';
import background from 'assets/images/login-background.jpg';
import RedBox from 'assets/images/RedBox.png';
import './login.style.scss';
import googleLogo from 'assets/images/google.svg';
import { Link } from 'react-router-dom';
import { post, responseValidator } from '../../scripts/api';
import { toast } from 'react-toastify';
import { Spinner } from 'react-bootstrap';

const Login: React.FC<ConnectedProps<typeof connector>> = function (props: ConnectedProps<typeof connector>) {
    const [username, setUsername] = useState<string | undefined>(undefined);
    const [password, setPassword] = useState<string | undefined>(undefined);
    const [submitLoading, setSubmitLoading] = useState<boolean>(false);

    function submitHandler() {
        if (username && password) {
            setSubmitLoading(true);
            const body = {
                username,
                password,
            };
            post('/user/login/', body).then((res) => {
                setSubmitLoading(false);
                if (responseValidator(res.status)) console.log(res);
                else toast.error('Username or Password is incorrect');
            });
        }
    }

    function enterHandler(e: any) {
        if (e.key === 'Enter' || e.keyCode === 13) {
            submitHandler();
        }
    }

    return (
        <div className="vsharee-login-page">
            <img className="background" src={background} alt="background" />
            <div className="box">
                <div className="redbox">
                    <img alt="background" src={RedBox} />
                    <h1 className="welcome-Back">Welcome Back</h1>
                    <h1 className="sign-in-to-continue">Sign in to continue access pages</h1>
                </div>
                <div className="blackbox">
                    {/*<i className="material-icons-outlined lock">lock</i> */}
                    <div className="context">
                        <h1 className="signin">Sign In</h1>
                        <input
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Email Address or Username"
                        />
                        <input
                            onKeyUp={enterHandler}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                        />
                        <div onClick={submitHandler} className={`continue ${!username! || !password ? 'disable' : ''}`}>
                            {!submitLoading ? (
                                <React.Fragment>
                                    <span>C O N T I N U E</span>
                                    <i className="material-icons">chevron_right</i>
                                </React.Fragment>
                            ) : (
                                <Spinner animation="border" variant="light" />
                            )}
                        </div>

                        <h3 className="social"> or Connect with Social Media </h3>
                        <div className="rectangle">
                            <img src={googleLogo} alt="google" />
                            <p>Sign In With Google</p>
                        </div>
                        <div className="new-acc">
                            <h4>Don’t have an account?</h4>
                            <Link to="/signup">Sign up</Link>
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
export default connector(Login);
