import React, { useState } from 'react';
import { AuthStatus, ReduxState, Tokens, UserData } from 'interface';
import { connect, ConnectedProps } from 'react-redux';
import background from 'assets/images/login-background.jpg';
import RedBox from 'assets/images/RedBox.png';
import './Forgetpassword.scss';
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

const Forget: React.FC<ConnectedProps<typeof connector>> = function (props: ConnectedProps<typeof connector>) {
    const [username, setUsername] = useState<string | undefined>(undefined);
    const [password, setPassword] = useState<string | undefined>(undefined);
    const [submitLoading, setSubmitLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<'password' | 'username' | 'all' | undefined>(undefined);
    const [isUserCorrect, setIsUserCorrect] = useState<boolean | undefined>(undefined);
    const [isPasswordCorrect, setIspasswordCorrect] = useState<boolean | undefined>(undefined);
    const [eyeClicked, setEyeClicked] = useState<boolean>(false);
    const [isVerify, setIsVerify] = useState<boolean>(false);
    const LANG = VshareeLanguage.Forget;
    const history = useHistory();

    function submitHandler() {
        if (
            username &&
       
            ( emailValidation(username))
        ) {
            setSubmitLoading(true);
            const body = {
                "email": username
              }
            post<any>(APIPath.forgetPass.forget, body).then((res) => {
                setSubmitLoading(false);
                console.log(res.data)
                if (responseValidator(res.status) && res.data) {
                    document.body.classList.add(navigationAnim);
                    setTimeout(() => {
                        document.body.classList.remove(navigationAnim);
                    
                    }, 500);
                    setIsVerify(true);
                  
                } else {
          
                }
            });
        }
    }

  

    function backHandler() {
        document.body.classList.add(navigationAnim);
        setTimeout(() => {
            document.body.classList.remove(navigationAnim);
            history.push(RoutePath.landing);
        }, 500);
    }



    function changeUsernameHandler(e: any) {
        if (isError === 'username' || isError === 'all') setIsError(undefined);
        setUsername(e.target.value);
        if (e.target.value) {
            if ( emailValidation(e.target.value)) setIsUserCorrect(true);
            else setIsUserCorrect(false);
        } else setIsUserCorrect(undefined);
    }

    function goToSignup() {
        document.body.classList.add(navigationAnim);
        setTimeout(() => {
            document.body.classList.remove(navigationAnim);
            history.push(RoutePath.login);
        }, 500);
    }

    return (
        <div className="vsharee-forget-page">
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
                {!isVerify ? (

<React.Fragment>
<h1 className="signin">{LANG.forgetpass}</h1>
                        <div className="my-inputs">
                            <input
                                value={username}
                                onChange={changeUsernameHandler}
                                placeholder={LANG.emailAddressPH}
                                className={isError === 'username' || isError === 'all' ? 'error' : ''}
                            />
                            {isUserCorrect === true ? (
                                <i className="material-icons success">check_circle</i>
                            ) : (
                                isUserCorrect === false && (
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
                        {!isUserCorrect && (
                            <ReactTooltip id="error" place="right" type="error" effect="solid">
                                <p>{LANG.incorrectUsername}</p>
                            </ReactTooltip>
                        )}
                    
                        
                        <button
                            onClick={submitHandler}
                            disabled={submitLoading}
                            className={`continue ${
                                !(
                                    username &&
                                  
                                    
                                    (emailValidation(username))
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

                  
</React.Fragment>
                ):(
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
export default connector(Forget);
