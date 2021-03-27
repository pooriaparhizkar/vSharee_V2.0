import React from 'react';

import { ReduxState } from 'interface';
import { connect, ConnectedProps } from 'react-redux';
import background from 'assets/images/login-background.jpg';
import RedBox from 'assets/images/RedBox.png';
import './login.style.scss';
import googleLogo from 'assets/images/google.svg';
import { Link } from 'react-router-dom';

const Login: React.FC<ConnectedProps<typeof connector>> = function (props: ConnectedProps<typeof connector>) {
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
                        <input placeholder="Email Address" />
                        <input placeholder="Password" />
                        <div className="continue">
                            <span>C O N T I N U E</span>
                            <i className="material-icons">chevron_right</i>
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
