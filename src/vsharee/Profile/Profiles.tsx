import React from 'react';
import './Profile.scss';

import TestImg from '../../assets/images/profile/fakeimage.jpg';
import Spotify from '../../assets/images/profile/spotify.png';
import Imdb from '../../assets/images/profile/imdb.png';
import Message from '../../assets/images/profile/message.svg';
import { Dropdown, Button } from 'react-bootstrap';

import { VshareeLanguage } from '../vsharee.lang';
import { ReduxState } from '../../interface';
import { connect } from 'react-redux';
import { APIPath, RoutePath } from '../../data';
import { Link, useHistory } from 'react-router-dom';
import EmptyPic from '../../assets/images/emptystate.png'
import { get, responseValidator } from '../../scripts/api';
class Profiles extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            resdata:{},
            usergroup:[],
            Emptystate:true,
            followingCount:'',
            followingList:[],
            followerCount:'',
            followerList:[],
            hidefollowbtn:false
        };
    }
   
    componentDidMount(){
        const location = window.location.href
        console.log(window.location.href)
        const loc = location.split('prfoiles/')
        if(this.props.userData.username===loc[1]){
this.setState({hidefollowbtn:true})
        }
        
        get<any>(APIPath.profile.userdata, { search: loc[1] }).then((res) => {
          console.log(res)
            if (responseValidator(res.status)) {
                this.setState({ resdata: res.data[0] });
            }
        });
        get<any>(APIPath.profile.usergroup, { user_id: loc[1] }).then((res) => {
         
                 if (responseValidator(res.status)) {
                     this.setState({ usergroup: res.data,Emptystate:false });
                 }
                 else{
                    this.setState({Emptystate:true });
                 }
             });
             get<any>(APIPath.profile.follower).then((res) => {
         console.log(res)
                if (responseValidator(res.status)) {
                 this.setState({followerCount:res.data.followers_count,followerList:res.data.result})
                }
              
            });  
            get<any>(APIPath.profile.following).then((res) => {
                console.log(res.data.followings_count)
                       if (responseValidator(res.status)) {
                        this.setState({followingCount:res.data.followings_count,followingList:res.data.result})
                       }
                     
                   });
    }
    render() {
        return (
            <React.Fragment >
                <div className="row main-div-profile">
                    <div className="col main-div-profile">
                        <div className="row description-row">
                            <div className="col-md-1 "></div>
                            <div className="col-md-2 col-xs-2 div-item-img" >
 <img src={TestImg} alt=""></img>
                            </div>
                            <div className="col-md-4 col-xs-10 div-item-description">
                               
                                <div className="text-description">
                                    <h1>{this.state.resdata.username}</h1>
                                    <h6>{this.state.resdata.firstname} {this.state.resdata.lastname} </h6>
                                    <div className='realation-box'>
                                      <h6> {this.state.followerCount} Follower &nbsp;</h6>  
                      
                                      <h6> {this.state.followingCount} Following</h6>  
                                    </div>
                                    
                                    <h6>
                                    {this.state.resdata.bio}
                                    </h6>
                                </div>
                            </div>
                            <div className="col-md-5 col-xs-12 div-item-description">
                                <div className="followdiv">
                                    <Button hidden={this.state.hidefollowbtn} className="followbtn">{VshareeLanguage.Profile.body.follow}</Button>
                                    <Button hidden={!this.state.hidefollowbtn} className="settingbtn">
                                      
                                    <i className="material-icons-outlined">
settings
</i>
<h1>{VshareeLanguage.Profile.body.setting}</h1>
                                    </Button>
                                    <Button className="sharebtn">
                                        <h1>{VshareeLanguage.Profile.body.share}</h1>

                                        <div className="shareicondiv">
                                            <i className="material-icons ">share</i>
                                        </div>
                                    </Button>
                                </div>
                                <div className="socialmediadiv">
                                    <div className="spotifydiv">
                                        <img src={Spotify} className="spotifybtn"></img>
                                    </div>

                                    <img src={Imdb} className="imdbbtn"></img>
                                </div>
                                <div className="messagediv">
                                    <img src={Message} alt="" className="messagebtn"></img>
                                </div>
                            </div>
                        </div>

                        <div className="row line"></div>

                        <div className="row group-row">
                            <div className="col-md-1 "></div>
                            <div className="col-md-11 col-xs-12 div-item-group-title">
                                <h1>{VshareeLanguage.Profile.body.publicGroup}</h1>
                            </div>
                            <div className="col-md-1 "></div>
                            <div className="col-md-10 col-xs-12 div-item-group" hidden={this.state.Emptystate}>
                                <div className="row ">
                                {this.state.usergroup.map((list: any,i :any) => (
     <div key={i} className="col-md-6 col-xs-12">
                                        <div className="row">
                                            <div className="col-6 div-item-group-detail">
                                                <img src={TestImg} alt=""></img>
                                                <h1>{list.the_group}</h1>
                                            </div>
                                            <div className="col-6 div-item-group-detail">
                                                <h5>129</h5>
                                                <h6>members</h6>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                 

                                </div>
                            </div>
                            <div className="col-md-10 col-xs-12 div_emprystate" hidden={!this.state.Emptystate}>
                                            <div className=" div_emprystate">
                                                <img src={EmptyPic}></img>
                                                <h1>No Group Found</h1>
                                            </div>
                                          
                                        </div>
                            <div className="col-md-1 "></div>
                        </div>

                        <div className="row mayknow-row">
                            <div className="col-md-1 "></div>
                            <div className="col-md-11 col-xs-12 div-item-mayknow-title">
                                <h1>{VshareeLanguage.Profile.body.mayknow}</h1>
                            </div>
                            <div className="col-md-1 "></div>
                            <div className="col-md-10 col-xs-12 div-item-mayknow">
                                <div className="row div-item-mayknow-detail">
                                    <div className="col-md-2 col-xs-4 div-item-mayknow-detail-col">
                                        <img src={TestImg} alt=""></img>
                                        <h1>Alan Ryan</h1>
                                    </div>
                                    <div className="col-md-2 col-xs-4 div-item-mayknow-detail-col">
                                        <img src={TestImg} alt=""></img>
                                        <h1>Alan Ryan</h1>
                                    </div>
                                    <div className="col-md-2 col-xs-4 div-item-mayknow-detail-col">
                                        <img src={TestImg} alt=""></img>
                                        <h1>Alan Ryan</h1>
                                    </div>
                                    <div className="col-md-2 col-xs-4 div-item-mayknow-detail-col">
                                        <img src={TestImg} alt=""></img>
                                        <h1>Alan Ryan</h1>
                                    </div>
                                    <div className="col-md-2 col-xs-4 div-item-mayknow-detail-col">
                                        <img src={TestImg} alt=""></img>
                                        <h1>Alan Ryan</h1>
                                    </div>
                                    <div className="col-md-2 col-xs-4 div-item-mayknow-detail-col">
                                        <img src={TestImg} alt=""></img>
                                        <h1>Alan Ryan</h1>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-1 "></div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state: ReduxState) => ({
    // direction: state.direction,
    isAuth: state.authStatus,
    userData: state.userData,
    //language: state.language,
});

const connector = connect(mapStateToProps);
export default connector(Profiles);
