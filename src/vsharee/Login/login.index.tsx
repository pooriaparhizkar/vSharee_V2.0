import React, { useState } from 'react';
import { AuthStatus, ReduxState, Tokens } from 'interface';
import { connect, ConnectedProps } from 'react-redux';
import background from 'assets/images/login-background.jpg';
import RedBox from 'assets/images/RedBox.png';
import './login.style.scss';
import googleLogo from 'assets/images/google.svg';
import { Link, useHistory } from 'react-router-dom';
import { post, responseValidator } from '../../scripts/api';
import { toast } from 'react-toastify';
import { Spinner } from 'react-bootstrap';
import { authToken } from '../../scripts/storage';
import { setAuth } from '../../redux/actions';
import { VshareeLanguage } from '../vsharee.lang';
import { APIPath, RoutePath } from '../../data';
import { emailValidation, passwordValidation, usernameValidation } from '../../scripts/validation';
import { AST } from 'eslint';
import { getMyGroups } from '../vsharee.script';

const Login: React.FC<ConnectedProps<typeof connector>> = function (props: ConnectedProps<typeof connector>) {
    const [username, setUsername] = useState<string | undefined>(undefined);
    const [password, setPassword] = useState<string | undefined>(undefined);
    const [submitLoading, setSubmitLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<'password' | 'username' | 'all' | undefined>(undefined);
    const LANG = VshareeLanguage.Login;
    const history = useHistory();

    function submitHandler() {
        if (username && password) {
            if (!passwordValidation(password)) {
                toast.error(LANG.incorrectPassword);
                setIsError('password');
            } else if (!usernameValidation(username) && !emailValidation(username)) {
                toast.error(LANG.incorrectUsername);
                setIsError('username');
            } else {
                setSubmitLoading(true);
                const body = {
                    username,
                    password,
                };
                post<Tokens>(APIPath.user.login, body).then((res) => {
                    setSubmitLoading(false);
                    if (responseValidator(res.status) && res.data) {
                        authToken.set(res.data);
                        getMyGroups(props.dispatch);
                        props.dispatch(setAuth(AuthStatus.isValid));
                        history.push(RoutePath.dashboard);
                    } else {
                        setIsError('all');
                        toast.error(LANG.incorrectData);
                        // res.data.non_field_errors.map((item: string) => {
                        //     toast.error(item);
                        // });
                        authToken.remove();
                        props.dispatch(setAuth(AuthStatus.isInValid));
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
        <div className="vsharee-login-page">
            <img className="background" src={background} alt="background" />
            <div className="box">
                <div className="redbox">
                    <img alt="background" src={RedBox} />
                    <h1 className="welcome-Back">{LANG.welcomeBack}</h1>
                    <h1 className="sign-in-to-continue">{LANG.welcomeBackText}</h1>
                </div>
                <div className="blackbox">
                    <div className="context">
                        <h1 className="signin">{LANG.signin}</h1>
                        <input
                            value={username}
                            onChange={(e) => {
                                if (isError === 'username' || isError === 'all') setIsError(undefined);
                                setUsername(e.target.value);
                            }}
                            placeholder={LANG.emailAddressPH}
                            className={isError === 'username' || isError === 'all' ? 'error' : ''}
                        />
                        <input
                            type="password"
                            onKeyUp={enterHandler}
                            value={password}
                            onChange={(e) => {
                                if (isError === 'password' || isError === 'all') setIsError(undefined);
                                setPassword(e.target.value);
                            }}
                            placeholder={LANG.password}
                            className={isError === 'password' || isError === 'all' ? 'error' : ''}
                        />
                        <div onClick={submitHandler} className={`continue ${!username! || !password ? 'disable' : ''}`}>
                            {!submitLoading ? (
                                <React.Fragment>
                                    <span>{LANG.continue}</span>
                                    <i className="material-icons">chevron_right</i>
                                </React.Fragment>
                            ) : (
                                <Spinner animation="border" variant="light" />
                            )}
                        </div>

                        <h3 className="social">{LANG.connectWithSocialMedia} </h3>
                        <div className="rectangle">
                            <img src={googleLogo} alt="google" />
                            <p>{LANG.signInGoogle}</p>
                        </div>
                        <div className="new-acc">
                            <h4>{LANG.dontHaveAccount}</h4>
                            <Link to={RoutePath.signup}>{LANG.signup}</Link>
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
