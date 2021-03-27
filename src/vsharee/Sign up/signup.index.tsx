import React, { useState } from 'react';

import { ReduxState } from 'interface';
import { connect, ConnectedProps } from 'react-redux';
import './signup.style.scss';
import RedBox from '../../assets/images/RedBox.png';
import googleLogo from '../../assets/images/google.svg';
import { post, responseValidator } from '../../scripts/api';
import background from 'assets/images/login-background.jpg';
import { Link } from 'react-router-dom';
import { RoutePath } from '../../data';
import { emailValidation, passwordValidation, usernameValidation } from '../../scripts/validation';
import { toast } from 'react-toastify';
import ReactTooltip from 'react-tooltip';
import { Spinner } from 'react-bootstrap';

const Signup: React.FC<ConnectedProps<typeof connector>> = function (props: ConnectedProps<typeof connector>) {
    const [email, setEmail] = useState<string | undefined>(undefined);
    const [username, setUsername] = useState<string | undefined>(undefined);
    const [password, setPassword] = useState<string | undefined>(undefined);
    const [password2, setPassword2] = useState<string | undefined>(undefined);
    const [submitLoading, setSubmitLoading] = useState<boolean>(false);
    const [isVerify, setIsVerify] = useState<boolean>(false);

    function submitHandler() {
        if (email && username && password2 && password) {
            if (!emailValidation(email)) {
                toast.error('Enter a valid Email address');
            } else if (password !== password2) toast.error('Your passwords is not same');
            else if (!passwordValidation(password)) toast.error('Your password is not secure');
            else if (!usernameValidation(username)) toast.error('Your username is in a incorrect format');
            else {
                setSubmitLoading(true);
                const body = {
                    firstname: 'null',
                    lastname: 'null',
                    username: username,
                    email: email,
                    password: password,
                    password2: password2,
                };
                post('/user/signup/', body).then((res) => {
                    setSubmitLoading(false);
                    if (responseValidator(res.status)) setIsVerify(true);
                    else toast.error('Something went wrong');
                });
            }
        }
    }

    function enterHandler(e: any) {
        if (e.key === 'Enter' || e.keyCode === 13) {
            submitHandler();
        }
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
                        {!isVerify ? (
                            <React.Fragment>
                                <h1 className="signin">Sign Up</h1>
                                <input
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="Username"
                                />
                                <input
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Email Address"
                                />

                                <div className="password-input">
                                    <input
                                        autoComplete="new-password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        type="password"
                                        placeholder="Password"
                                    />
                                    <i className="material-icons info" data-tip data-for="global">
                                        info
                                    </i>
                                </div>

                                <ReactTooltip id="global" place="right" type="info" effect="solid">
                                    <p>∘ at least 8 characters</p>
                                    <p>∘ combination of upper and lower case characters</p>
                                    <p>∘ one or more digits</p>
                                </ReactTooltip>
                                <input
                                    onKeyUp={enterHandler}
                                    value={password2}
                                    onChange={(e) => setPassword2(e.target.value)}
                                    type="password"
                                    placeholder="Re_password"
                                />
                                {/*<h3 className="social"Your password should  </h3>*/}
                                <div
                                    onClick={submitHandler}
                                    className={`continue ${
                                        !email || !username! || !password || !password2 ? 'disable' : ''
                                    }`}
                                >
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
                                    <h4>Have an account?</h4>
                                    <Link to={RoutePath.login}>Sign In</Link>
                                </div>
                            </React.Fragment>
                        ) : (
                            <div className="email-verify">
                                <i className="material-icons">mark_email_read</i>
                                <h2>Email confirmation send</h2>
                                <p>To continue please click on a link that sent it to your email</p>
                            </div>
                        )}
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
