import React, { useState } from 'react';
import { ReduxState } from 'interface';
import { connect, ConnectedProps } from 'react-redux';
import './signup.style.scss';
import RedBox from '../../assets/images/RedBox.png';
import googleLogo from '../../assets/images/google.svg';
import { post, responseValidator } from '../../scripts/api';
import background from 'assets/images/login-background.jpg';
import { Link } from 'react-router-dom';
import { APIPath, RoutePath } from '../../data';
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
    const [isError, setIsError] = useState<'email' | 'password' | 'rePassword' | 'username' | undefined>(undefined);
    const LANG = props.text.Signup;
    function submitHandler() {
        if (email && username && password2 && password) {
            if (!usernameValidation(username)) {
                toast.error(LANG.incorrectUsername);
                setIsError('username');
            } else if (!emailValidation(email)) {
                toast.error(LANG.incorrectEmail);
                setIsError('email');
            } else if (!passwordValidation(password)) {
                toast.error(LANG.incorrectPassword);
                setIsError('password');
            } else if (password !== password2) {
                toast.error(LANG.incorrectConfirmPassword);
                setIsError('rePassword');
            } else {
                setSubmitLoading(true);
                const body = {
                    username: username,
                    email: email,
                    password1: password,
                    password2: password2,
                };
                post<any>(APIPath.user.signup, body).then((res) => {
                    setSubmitLoading(false);
                    if (responseValidator(res.status)) setIsVerify(true);
                    else {
                        if (res.data.username) {
                            toast.error(res.data.username[0]);
                            setIsError('username');
                        } else if (res.data.email) {
                            toast.error(res.data.email[0]);
                            setIsError('email');
                        }
                    }
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
        <div className="vsharee-signup-page">
            <img className="background" src={background} alt="background" />
            <div className="box">
                <div className="redbox">
                    <img alt="background" src={RedBox} />
                    <h1 className="welcome-Back">{LANG.welcomeBack}</h1>
                    <h1 className="sign-in-to-continue">{LANG.welcomeBackText}</h1>
                </div>
                <div className="blackbox">
                    <div className="context">
                        {!isVerify ? (
                            <React.Fragment>
                                <h1 className="signin">{LANG.signup}</h1>
                                <input
                                    onChange={(e) => {
                                        if (isError === 'username') setIsError(undefined);
                                        setUsername(e.target.value);
                                    }}
                                    value={username}
                                    className={isError === 'username' ? 'error' : ''}
                                    placeholder={LANG.username}
                                />
                                <input
                                    onChange={(e) => {
                                        if (isError === 'email') setIsError(undefined);
                                        setEmail(e.target.value);
                                    }}
                                    value={email}
                                    className={isError === 'email' ? 'error' : ''}
                                    placeholder={LANG.email}
                                />

                                <div className="password-input">
                                    <input
                                        onChange={(e) => {
                                            if (isError === 'password') setIsError(undefined);
                                            setPassword(e.target.value);
                                        }}
                                        autoComplete="new-password"
                                        value={password}
                                        type="password"
                                        placeholder={LANG.password}
                                        className={isError === 'password' ? 'error' : ''}
                                    />
                                    <i className="material-icons info" data-tip data-for="global">
                                        info
                                    </i>
                                </div>

                                <ReactTooltip id="global" place="right" type="info" effect="solid">
                                    <p>∘ {LANG.atLeast8Char}</p>
                                    <p>∘ {LANG.combineUpAndLow}</p>
                                    <p>∘ {LANG.moreDigit}</p>
                                </ReactTooltip>
                                <input
                                    onChange={(e) => {
                                        if (isError === 'rePassword') setIsError(undefined);
                                        setPassword2(e.target.value);
                                    }}
                                    onKeyUp={enterHandler}
                                    value={password2}
                                    type="password"
                                    className={isError === 'rePassword' ? 'error' : ''}
                                    placeholder={LANG.confirmPassword}
                                />
                                <div
                                    onClick={submitHandler}
                                    className={`continue ${
                                        !email || !username! || !password || !password2 ? 'disable' : ''
                                    }`}
                                >
                                    {!submitLoading ? (
                                        <React.Fragment>
                                            <span>{LANG.continue}</span>
                                            <i className="material-icons">chevron_right</i>
                                        </React.Fragment>
                                    ) : (
                                        <Spinner animation="border" variant="light" />
                                    )}
                                </div>

                                <h3 className="social">{LANG.connectWithSocialMedia}</h3>
                                <div className="rectangle">
                                    <img src={googleLogo} alt="google" />
                                    <p>{LANG.signInGoogle}</p>
                                </div>

                                <div className="new-acc">
                                    <h4>{LANG.haveAccount}</h4>
                                    <Link to={RoutePath.login}>{LANG.signin}</Link>
                                </div>
                            </React.Fragment>
                        ) : (
                            <div className="email-verify">
                                <i className="material-icons">mark_email_read</i>
                                <h2>{LANG.emailSent}</h2>
                                <p>{LANG.activeEmailText}</p>
                                <Link to={RoutePath.login}>Back to login</Link>
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
