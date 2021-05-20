import React from 'react';
import './Profile.scss';

import TestImg from '../../assets/images/profile/fakeimage.jpg';
import Spotify from '../../assets/images/profile/spotify.png';
import Imdb from '../../assets/images/profile/imdb.png';
import Message from '../../assets/images/profile/message.svg';
import Logo from '../../assets/images/landing/logo.png'
import { Dropdown, Button } from 'react-bootstrap';

import { VshareeLanguage } from '../vsharee.lang';
import { AuthStatus, ReduxState } from '../../interface';
import { connect } from 'react-redux';
import { APIPath, RoutePath } from '../../data';
import { Link, useHistory } from 'react-router-dom';
import EmptyPic from '../../assets/images/emptystate.png';
import { get, responseValidator, post, del } from '../../scripts/api';
import { setAuth, setIsEdit } from '../../redux/actions';
import { authToken } from '../../scripts/storage';
import { toast } from 'react-toastify';
import { Modal } from 'react-bootstrap';
class Profiles extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            resdata: {},
            usergroup: [],
            Emptystate: true,
            followingCount: '',
            followingList: [],
            followerCount: '',
            followerList: [],
            hidefollowbtn: false,
            hidesetting: false,
            hideunfollowbtn: false,
            showlist: false,
            list: [{ name: 'asdasd' }, { name: 'asdasd' }, { name: 'asdasd' }, { name: 'asdasd' }, { name: 'asdasd' }],
            title: '',
            name: '',
            hidegroups:false
        };
        this.profileSettingHandler = this.profileSettingHandler.bind('ss');
    }

    profileSettingHandler(item: any) {
        item.dispatch(setIsEdit(true));
    }

    componentDidMount() {
        const location = window.location.href;
        const loc = location.split('/');

        if (this.props.userData.username === loc[4]) {
            this.setState({ hidefollowbtn: true, hideunfollowbtn: true, hidesetting: false });
        } else {
            get<any>(APIPath.profile.konwfollow+loc[4]).then((res) => {
                console.log(res);
                if (responseValidator(res.status)) {
                    this.setState({ hidefollowbtn: true, hideunfollowbtn: false, hidesetting: true });
                }
                else{
                    this.setState({ hidefollowbtn: false, hideunfollowbtn: true, hidesetting: true });
                }
            });
            
        }

        get<any>(APIPath.profile.userdata, { search: loc[4] }).then((res) => {
            console.log(res);
            if (responseValidator(res.status)) {
                this.setState({ resdata: res.data[0] });
            }
        });
        get<any>(APIPath.profile.usergroup, { user_id: loc[4] }).then((res) => {
            if (responseValidator(res.status)) {
                this.setState({ usergroup: res.data, Emptystate: false });
            } else {
                this.setState({ Emptystate: true });
            }
        });
        get<any>(APIPath.profile.follower, { user: loc[4] }).then((res) => {
            console.log(res);
            if (responseValidator(res.status)) {
                this.setState({ followerCount: res.data.followers_count, followerList: res.data.result });
            }
        });
        get<any>(APIPath.profile.following, { user: loc[4] }).then((res) => {
            console.log(res.data);
            if (responseValidator(res.status)) {
                this.setState({ followingCount: res.data.followings_count, followingList: res.data.result });
            }
        });
        get<any>(APIPath.profile.edit_profile(loc[4])).then((res) => {
            console.log(res.data);
            if (responseValidator(res.status)) {

                this.setState({
                    photourl:res.data.photo_url
                })
                if (this.props.userData.username === loc[4]) {
                    if(res.data.is_private){
                        this.setState({
                            hidegroups:true
                        })
                    }
                    else{
                        this.setState({
                            hidegroups:false
                        })
                    }
                }
                // this.setState({ followingCount: res.data.followings_count, followingList: res.data.result });
            }
            // else{
            //     this.setState({
            //         photourl:Logo
            //     }) 
            // }
        });
    }
    followuser = () => {
        post<any>(APIPath.profile.followUser + '?user_id=' + this.state.resdata.username, {
            who_is_followed:this.state.resdata.username ,
            who_follows: '',
        }).then((res) => {
            console.log(res);
            if (responseValidator(res.status)) {
                this.setState({ followerCount: this.state.followerCount + 1 ,hidefollowbtn: true, hideunfollowbtn: false});
            }
        });
    };
    unfollowuser = () => {
        del<any>(APIPath.profile.unfollowUser + this.state.resdata.username, {}).then((res) => {
            console.log(res);
            if (responseValidator(res.status)) {
                this.setState({ followerCount: this.state.followerCount - 1 ,hidefollowbtn: false, hideunfollowbtn: true});
            }
        });
    };
    openfollowerlist = () => {
        if (this.state.followerCount !== 0) {
            this.setState({
                showlist: true,
                list: this.state.followerList,
                title: VshareeLanguage.Profile.body.followerlist,
                name: 'who_follows',
            });
        }
    };
    openfollowinglist = () => {
        if (this.state.followingCount !== 0) {
            this.setState({
                showlist: true,
                list: this.state.followingList,
                title: VshareeLanguage.Profile.body.followinglist,
                name: 'who_followed',
            });
        }
    };
    checkwich = (list: any) => {
        if (this.state.name === 'who_follows') return list.who_follows;
        else return list.who_is_followed;
    };
  

    render() {
        return (
            <React.Fragment>
                <Modal
                    className="vsharee-follower-list-modal"
                    show={this.state.showlist}
                    onHide={() => this.setState({ showlist: false })}
                >
                    <div className="my-container">
                        <div className="context">
                            <h1>{this.state.title}</h1>
                            {this.state.list.map((list: any, i: any) => (
                                <div key={i} className="item-list-modal-context">
                                    <img src={TestImg} alt=""></img>
                                    <div className="namebox">
                                        <h6
                                            onClick={() =>
                                                window.location.replace(RoutePath.profileDetail(this.checkwich(list)))
                                            }
                                        >
                                            {this.checkwich(list)}
                                        </h6>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </Modal>

                <div className="row main-div-profile">
                    <div className="col main-div-profile">
                        <div className="row description-row">
                            <div className="col-md-1 "></div>

                            <div className="col-md-7 col-xs-12 div-item-description">
                                <img onError={()=>this.setState({photourl:Logo})} src={this.state.photourl} alt="" id='photoprofile' />
                              
                                <div className="text-description">
                                    <h1>{this.state.resdata.username}</h1>
                                    <h6>
                                        {this.state.resdata.firstname} {this.state.resdata.lastname}{' '}
                                    </h6>
                                    <div className="realation-box">
                                        <h6 onClick={this.openfollowerlist}>
                                            {' '}
                                            {this.state.followerCount} Follower &nbsp;
                                        </h6>

                                        <h6 onClick={this.openfollowinglist}> {this.state.followingCount} Following</h6>
                                    </div>

                                    <h6>{this.state.resdata.bio}</h6>
                                </div>
                            </div>
                            <div className="col-md-4 col-xs-12 div-item-description">
                                <div className="followdiv">
                                    <Button
                                        hidden={this.state.hidefollowbtn}
                                        onClick={this.followuser}
                                        className="followbtn"
                                    >
                                        {VshareeLanguage.Profile.body.follow}
                                    </Button>
                                    <Button
                                        hidden={this.state.hideunfollowbtn}
                                        onClick={this.unfollowuser}
                                        className="unfollowbtn"
                                    >
                                        {VshareeLanguage.Profile.body.unfollow}
                                    </Button>
                                    <Button
                                        onClick={() => this.profileSettingHandler(this.props.store)}
                                        hidden={this.state.hidesetting}
                                        className="settingbtn"
                                    >
                                        <i className="material-icons-outlined">settings</i>
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
                                    {this.state.usergroup.map((list: any, i: any) => (
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
                            {/* <div className="col-md-10 col-xs-12 div_emprystate" hidden={!this.state.hidegroups}>
                                <div className=" div_emprystate">
                                    <img src={EmptyPic}></img>
                                    <h1>this account is private</h1>
                                </div>
                            </div> */}
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
