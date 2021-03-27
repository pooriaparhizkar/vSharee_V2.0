import React from 'react';

import { ReduxState } from 'interface';
import { connect, ConnectedProps } from 'react-redux';
import './Verify.scss';
import { Spinner } from 'react-bootstrap';
import RedBox from '../../assets/images/RedBox.png';
import Google from '../../assets/images/google.svg';
import googleLogo from '../../assets/images/google.svg';
import {VerifyLang} from './Verify.lang'
import background from 'assets/images/login-background.jpg';
import { Link } from 'react-router-dom';
import { get, post, responseValidator } from 'scripts/api';
import { APIPath } from 'data';

class Verify extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            hideSuccess:true,
            hidefail:true,
            spinner:false
        };
    }
    componentDidMount(){
        const loc= window.location.href
        const token = loc.split("?token=")
        console.log(token[1])
        get(APIPath.verifyEmail,{token:token[1]}).then(res=>{
            this.setState({spinner:true})
            if(responseValidator(res.status)){
                this.setState({
                    hideSuccess:false
                })
            }
            else{
                this.setState({
                    hidefail:false,
                    
                })
            }
        })
     

    }
render(){
    return (
        <div className='vsharee-verify-page'>
            
            <img className="background" src={background} alt="background" />

            <div className="box">
                {/* <div className="redbox">
                    <img alt="background" src={RedBox} />
                    <h1 className="welcome-Back">Welcome Back</h1>
                    <h1 className="sign-in-to-continue">Sign up to continue access pages</h1>
                </div> */}
                <div className="blackbox">
                    <div className="context">
                    <Spinner animation="border" variant="light" hidden={this.state.spinner}/>
                 <div className='responseVerifySuccess' hidden={this.state.hideSuccess}>
                 <i className="material-icons">
check_circle_outline
</i>
<h2>
    {VerifyLang.body.successful}
   
</h2>
                 </div>
                 <div className='responseVerifyFail' hidden={this.state.hidefail}>
                 <i className="material-icons">
highlight_off
</i>
<h2>
{VerifyLang.body.error}
</h2>
                     </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
   
}

export default Verify
