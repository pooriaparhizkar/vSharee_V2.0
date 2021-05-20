import React, { useEffect, useState } from 'react';
import { ReduxState, UserData } from 'interface';
import { connect, ConnectedProps } from 'react-redux';
import './signup.style.scss';
import RedBox from '../../assets/images/RedBox.png';
import googleLogo from '../../assets/images/google.svg';
import { get, post, responseValidator } from '../../scripts/api';
import background from 'assets/images/login-background.jpg';
import { Link, useHistory } from 'react-router-dom';
import { APIPath, navigationAnim, RoutePath } from '../../data';
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
    const [eyeClicked, setEyeClicked] = useState<boolean>(false);
    const [eyeClicked2, setEyeClicked2] = useState<boolean>(false);
    const [freeUser, setFreeUser] = useState<boolean | undefined>(undefined);
    const [searchUserLoading, setSearchUserLoading] = useState<boolean>(false);
    const [isUsernameCorrect, setIsUsernameCorrect] = useState<boolean>(true);
    const [freeEmail, setFreeEmail] = useState<boolean | undefined>(undefined);
    const [searchEmailLoading, setSearchEmailLoading] = useState<boolean>(false);
    const [isEmailCorrect, setIsEmailCorrect] = useState<boolean>(true);
    const [isPasswordCorrect, setIsPasswordCorrect] = useState<boolean | undefined>(undefined);
    const [samePassword, setSamePassword] = useState<boolean | undefined>(undefined);
    const LANG = props.text.Signup;
    const history = useHistory();

    function submitHandler() {
        if (email && username && password2 && password) {
            setSubmitLoading(true);
            const body = {
                username,
                email,
                password1: password,
                password2,
            };
            post<any>(APIPath.user.signup, body).then((res) => {
                setSubmitLoading(false);
                if (responseValidator(res.status)) {
                    document.body.classList.add(navigationAnim);
                    setTimeout(() => {
                        document.body.classList.remove(navigationAnim);
                        setIsVerify(true);
                    }, 500);
                } else {
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

    function enterHandler(e: any) {
        if (e.key === 'Enter' || e.keyCode === 13) {
            submitHandler();
        }
    }

    function goToSignup() {
        document.body.classList.add(navigationAnim);
        setTimeout(() => {
            document.body.classList.remove(navigationAnim);
            history.push(RoutePath.login);
        }, 500);
    }

    function usernameChangeHandler(e: any) {
        if (isError === 'username') setIsError(undefined);
        setUsername(e.target.value);

        if (e.target.value) {
            if (usernameValidation(e.target.value)) {
                setIsUsernameCorrect(true);
                setSearchUserLoading(true);
                get<UserData>(APIPath.user.detail(e.target.value)).then((res) => {
                    setSearchUserLoading(false);
                    if (responseValidator(res.status) && res.data) {
                        setFreeUser(false);
                    } else setFreeUser(true);
                });
            } else {
                setFreeUser(false);
                setIsUsernameCorrect(false);
            }
        } else setFreeUser(undefined);
    }

    function emailChangeHandler(e: any) {
        if (isError === 'email') setIsError(undefined);
        setEmail(e.target.value);
        if (e.target.value) {
            if (emailValidation(e.target.value)) {
                setIsEmailCorrect(true);
                setFreeEmail(true);
                // setSearchEmailLoading(true);
                // get<UserData>(APIPath.user.detail(e.target.value)).then((res) => {
                //     setSearchEmailLoading(false);
                //     if (responseValidator(res.status) && res.data) {
                //         setFreeEmail(false);
                //     } else setFreeEmail(true);
                // });
            } else {
                setFreeEmail(false);
                setIsEmailCorrect(false);
            }
        } else setFreeEmail(undefined);
    }

    function passwordChangeHandler(e: any) {
        if (isError === 'password') setIsError(undefined);
        setPassword(e.target.value);
        confirmPasswordHandler({ target: { value: password2 } }, e.target.value);

        if (e.target.value) {
            if (passwordValidation(e.target.value)) {
                setIsPasswordCorrect(true);
            } else setIsPasswordCorrect(false);
        } else setIsPasswordCorrect(undefined);
    }

    function confirmPasswordHandler(e: any, passwordReal?: string) {
        if (isError === 'rePassword') setIsError(undefined);
        setPassword2(e.target.value);
        if (e.target.value) {
            if (passwordReal) {
                if (e.target.value === passwordReal) setSamePassword(true);
                else setSamePassword(false);
            } else {
                if (e.target.value === password) setSamePassword(true);
                else setSamePassword(false);
            }
        } else setSamePassword(undefined);
    }

    return (
        <div className="vsharee-signup-page">
            <img className="background" src={background} alt="background" />
            <div className="box">
                <div className="redbox">
                    <span />
                    <img alt="background" src={RedBox} />
                    <h1 className="welcome-Back">{LANG.welcomeBack}</h1>
                    <h1 className="sign-in-to-continue">{LANG.welcomeBackText}</h1>
                    <span />
                    <Link to={RoutePath.landing}>copyright vSharee.ir</Link>
                </div>
                <div className="blackbox">
                    <div className="context">
                        {!isVerify ? (
                            <React.Fragment>
                                <h1 className="signin">{LANG.signup}</h1>
                                <div className="my-inputs">
                                    <input
                                        onChange={usernameChangeHandler}
                                        value={username}
                                        className={isError === 'username' ? 'error' : ''}
                                        placeholder={LANG.username}
                                    />
                                    {searchUserLoading ? (
                                        <i className="cfi cfi-loader" />
                                    ) : freeUser === true ? (
                                        <i className="material-icons success">check_circle</i>
                                    ) : (
                                        freeUser === false && (
                                            <i
                                                onMouseEnter={() => ReactTooltip.rebuild()}
                                                data-tip
                                                data-for="error"
                                                className="material-icons error"
                                            >
                                                cancel
                                            </i>
                                        )
                                    )}
                                </div>
                                {freeUser === false && (
                                    <ReactTooltip id="error" place="right" type="error" effect="solid">
                                        <p>User with this username is already exist</p>
                                    </ReactTooltip>
                                )}
                                {!isUsernameCorrect && (
                                    <ReactTooltip id="error" place="right" type="error" effect="solid">
                                        <p>{LANG.incorrectUsername}</p>
                                    </ReactTooltip>
                                )}
                                <div className="my-inputs">
                                    <input
                                        onChange={emailChangeHandler}
                                        value={email}
                                        className={isError === 'email' ? 'error' : ''}
                                        placeholder={LANG.email}
                                    />
                                    {searchEmailLoading ? (
                                        <i className="cfi cfi-loader" />
                                    ) : freeEmail === true ? (
                                        <i className="material-icons success">check_circle</i>
                                    ) : (
                                        freeEmail === false && (
                                            <i
                                                onMouseEnter={() => ReactTooltip.rebuild()}
                                                data-tip
                                                data-for="error"
                                                className="material-icons error"
                                            >
                                                cancel
                                            </i>
                                        )
                                    )}
                                </div>
                                {freeEmail === false && (
                                    <ReactTooltip id="error" place="right" type="error" effect="solid">
                                        <p>User with this email address is already exist</p>
                                    </ReactTooltip>
                                )}
                                {!isEmailCorrect && (
                                    <ReactTooltip id="error" place="right" type="error" effect="solid">
                                        <p>{LANG.incorrectEmail}</p>
                                    </ReactTooltip>
                                )}
                                <div className="password-input">
                                    <input
                                        onChange={passwordChangeHandler}
                                        autoComplete="new-password"
                                        value={password}
                                        type={eyeClicked ? 'text' : 'password'}
                                        placeholder={LANG.password}
                                        className={isError === 'password' ? 'error' : ''}
                                    />
                                    <i
                                        className={`material-icons info ${
                                            isPasswordCorrect === true
                                                ? 'check'
                                                : isPasswordCorrect === false && 'cross'
                                        }`}
                                        data-tip
                                        data-for="global"
                                    >
                                        {isPasswordCorrect === true
                                            ? 'check_circle'
                                            : isPasswordCorrect === false
                                            ? 'cancel'
                                            : 'info'}
                                    </i>
                                    <i onClick={() => setEyeClicked(!eyeClicked)} className="material-icons eye">
                                        {eyeClicked ? 'visibility_off' : 'visibility'}
                                    </i>
                                </div>

                                <ReactTooltip
                                    id="global"
                                    place="right"
                                    type={
                                        isPasswordCorrect === true
                                            ? 'success'
                                            : isPasswordCorrect === false
                                            ? 'error'
                                            : 'info'
                                    }
                                    effect="solid"
                                >
                                    <p>∘ {LANG.atLeast8Char}</p>
                                    <p>∘ {LANG.combineUpAndLow}</p>
                                    <p>∘ {LANG.moreDigit}</p>
                                </ReactTooltip>
                                <div className="password-input">
                                    <input
                                        onChange={confirmPasswordHandler}
                                        onKeyUp={enterHandler}
                                        value={password2}
                                        type={eyeClicked2 ? 'text' : 'password'}
                                        className={isError === 'rePassword' ? 'error' : ''}
                                        placeholder={LANG.confirmPassword}
                                    />
                                    <i
                                        style={{ right: !password2 || password2?.length === 0 ? '10px' : '40px' }}
                                        onClick={() => setEyeClicked2(!eyeClicked2)}
                                        className="material-icons eye2"
                                    >
                                        {eyeClicked2 ? 'visibility_off' : 'visibility'}
                                    </i>
                                    {samePassword === true ? (
                                        <i className="material-icons success">check_circle</i>
                                    ) : (
                                        samePassword === false && (
                                            <i
                                                onMouseEnter={() => ReactTooltip.rebuild()}
                                                data-tip
                                                data-for="error"
                                                className="material-icons error"
                                            >
                                                cancel
                                            </i>
                                        )
                                    )}
                                </div>
                                {!samePassword && (
                                    <ReactTooltip id="error" place="right" type="error" effect="solid">
                                        <p>{LANG.incorrectConfirmPassword}</p>
                                    </ReactTooltip>
                                )}
                                <button
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
                                </button>

                                <h3 className="social">{LANG.connectWithSocialMedia}</h3>
                                <div className="rectangle">
                                    <img src={googleLogo} alt="google" />
                                    <p>{LANG.signInGoogle}</p>
                                </div>

                                <div className="new-acc">
                                    <h4>{LANG.haveAccount}</h4>
                                    <a style={{ cursor: 'pointer' }} onClick={goToSignup}>
                                        {LANG.signin}
                                    </a>
                                </div>
                            </React.Fragment>
                        ) : (
                            <div className="email-verify">
                                <i className="material-icons">mark_email_read</i>
                                <h2>{LANG.emailSent}</h2>
                                <p>{LANG.activeEmailText}</p>
                                <a style={{ cursor: 'pointer' }} onClick={goToSignup}>
                                    Back to login
                                </a>
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
