import React, { useState } from 'react';
import { AuthStatus, ReduxState, Tokens, UserData } from 'interface';
import { connect, ConnectedProps } from 'react-redux';
import background from 'assets/images/login-background.jpg';
import RedBox from 'assets/images/RedBox.png';
import './Setnewpass.scss';
import googleLogo from 'assets/images/google.svg';
import { Link, useHistory } from 'react-router-dom';
import { get, post, responseValidator } from '../../scripts/api';
import { toast } from 'react-toastify';
import { Spinner } from 'react-bootstrap';
import { authToken } from '../../scripts/storage';
import { setAuth, setUserData } from '../../redux/actions';
import { VshareeLanguage } from '../vsharee.lang';
import { APIPath, navigationAnim, RoutePath } from '../../data';
import { emailValidation, passwordValidation, usernameValidation } from '../../scripts/validation';
import { AST } from 'eslint';
import { getMyGroups } from '../vsharee.script';
import ReactTooltip from 'react-tooltip';

const Setpassnew: React.FC<ConnectedProps<typeof connector>> = function (props: ConnectedProps<typeof connector>) {
    const [username, setUsername] = useState<string | undefined>(undefined);
    const [password, setPassword] = useState<string | undefined>(undefined);
    const [repassword, setrePassword] = useState<string | undefined>(undefined);
    const [submitLoading, setSubmitLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<'password' | 'username' | 'all' | undefined>(undefined);
    const [isUserCorrect, setIsUserCorrect] = useState<boolean | undefined>(undefined);
    const [isPasswordCorrect, setIspasswordCorrect] = useState<boolean | undefined>(undefined);
    const [isrePasswordCorrect, setIsrepasswordCorrect] = useState<boolean | undefined>(undefined);
    const [eyeClicked, setEyeClicked] = useState<boolean>(false);
    const LANG = VshareeLanguage.Newpass;
    const history = useHistory();

    function submitHandler() {
        if (
            repassword &&
            password &&
            passwordValidation(password) 
        ) {
            setSubmitLoading(true);
            const body = {
                username,
                password,
            };
            post<Tokens>(APIPath.user.login, body).then((res) => {
                setSubmitLoading(false);
                if (responseValidator(res.status) && res.data) {
                    authToken.set(res.data);

                    get<UserData[]>(APIPath.user.myInfo).then((res) => {
                        if (responseValidator(res.status) && res.data) {
                     
                            document.body.classList.add(navigationAnim);
                            setTimeout(() => {
                                document.body.classList.remove(navigationAnim);
                                props.dispatch(setUserData(res.data![0]));
                                props.dispatch(setAuth(AuthStatus.isValid));
                            }, 500);
                        } else {
                            authToken.remove();
                            props.dispatch(setAuth(AuthStatus.isInValid));
                        }
                    });
                    getMyGroups(props.dispatch);
                    // props.dispatch(setAuth(AuthStatus.isValid));
                    // history.push(RoutePath.dashboard);
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

    function enterHandler(e: any) {
        if (e.key === 'Enter' || e.keyCode === 13) {
            submitHandler();
        }
    }

    function backHandler() {
        document.body.classList.add(navigationAnim);
        setTimeout(() => {
            document.body.classList.remove(navigationAnim);
            history.push(RoutePath.landing);
        }, 500);
    }

  

    function changePasswordHandler(e: any) {
        if (isError === 'password' || isError === 'all') setIsError(undefined);
        setPassword(e.target.value);
        if (e.target.value) {
            if (passwordValidation(e.target.value)) setIspasswordCorrect(true);
            else setIspasswordCorrect(false);
        } else setIspasswordCorrect(undefined);
    }
    function changerePasswordHandler(e: any) {
        if (isError === 'password' || isError === 'all') setIsError(undefined);
        setrePassword(e.target.value);
        if (e.target.value) {
            if (repassword===password) setIsrepasswordCorrect(true);
            else setIsrepasswordCorrect(false);
        } else setIsrepasswordCorrect(undefined);
    }
    return (
        <div className="vsharee-login-page">
            <img className="background" src={background} alt="background" />
            <div className="box">
                <div className="redbox">
                    <span />
                    <img alt="background" src={RedBox} />
                    <h1 className="welcome-Back">{LANG.welcomeBack}</h1>
                    <h1 className="sign-in-to-continue">{LANG.welcomeBackText}</h1>
                    <span />
                    <p className="copy-right" onClick={backHandler}>
                        copyright vSharee.ir
                    </p>
                </div>
                <div className="blackbox">
                    <div className="context">
                        <h1 className="signin">{LANG.setnewpassword}</h1>
                        <div className="my-inputs">
                            <input
                                type={eyeClicked ? 'text' : 'password'}
                                onKeyUp={enterHandler}
                                value={password}
                                onChange={changePasswordHandler}
                                placeholder={LANG.password}
                                className={isError === 'password' || isError === 'all' ? 'error' : ''}
                            />
                            <i
                                style={{ right: !password || password?.length === 0 ? '10px' : '40px' }}
                                onClick={() => setEyeClicked(!eyeClicked)}
                                className="material-icons eye"
                            >
                                {eyeClicked ? 'visibility_off' : 'visibility'}
                            </i>
                            {isPasswordCorrect === true ? (
                                <i className="material-icons success">check_circle</i>
                            ) : (
                                isPasswordCorrect === false && (
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
                        {!isPasswordCorrect && (
                            <ReactTooltip id="error" place="right" type="error" effect="solid">
                                <p>{LANG.incorrectPassword}</p>
                            </ReactTooltip>
                        )}
                        <div className="my-inputs">
                            <input
                                type={eyeClicked ? 'text' : 'password'}
                                onKeyUp={enterHandler}
                                value={repassword}
                                onChange={changerePasswordHandler}
                                placeholder={LANG.password}
                                className={isError === 'password' || isError === 'all' ? 'error' : ''}
                            />
                            <i
                                style={{ right: !password || password?.length === 0 ? '10px' : '40px' }}
                                onClick={() => setEyeClicked(!eyeClicked)}
                                className="material-icons eye"
                            >
                                {eyeClicked ? 'visibility_off' : 'visibility'}
                            </i>
                            {isrePasswordCorrect === true ? (
                                <i className="material-icons success">check_circle</i>
                            ) : (
                                isrePasswordCorrect === false && (
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
                        {!isrePasswordCorrect && (
                            <ReactTooltip id="error1" place="right" type="error" effect="solid">
                                <p>{LANG.incorrectPassword}</p>
                            </ReactTooltip>
                        )}
                        
                        <button
                            onClick={submitHandler}
                            disabled={submitLoading}
                            className={`continue ${
                                !(
                                 
                                    password &&
                                    passwordValidation(password) 
                                  
                                )
                                    ? 'disable'
                                    : ''
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
export default connector(Setpassnew);
