import React, {useState} from 'react';

import {ReduxState} from 'interface';
import {connect, ConnectedProps} from 'react-redux';
import tvPic from 'assets/images/dashboard/tv.png';
import fakePic from 'assets/images/dashboard/fakepic.jpg';
import './dashboard.style.scss';
import EditProfile from '../Component/editProfile/editProfile.index';
import {FormControl, MenuItem, Select} from "@material-ui/core";
import MyGroupsList from "./myGroups/myGroups.index";
import TopGroupsList from "./topGroups/topGroups.index";
import MyFriendsList from "./myFriends/myfriends.index";

const Dashboard: React.FC<ConnectedProps<typeof connector>> = function (props: ConnectedProps<typeof connector>) {
    const [view, setView] = useState<'myGroups' | 'topGroups' | 'myFriends'>('myGroups');

    return (
        <div className="vsharee-dashboard-page">

            <div className="leftcolumn">
                <FormControl className="d-flex d-md-none" variant="outlined">
                    <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={view}
                        onChange={(e: any) => setView(e.target.value)}
                    >
                        <MenuItem value={'myGroups'}>My Groups</MenuItem>
                        <MenuItem value={'topGroups'}>Top Groups</MenuItem>
                        <MenuItem value={'myFriends'}>My Friends</MenuItem>
                    </Select>
                </FormControl>

                <div className="d-none d-md-block">
                    <MyGroupsList/>

                    <TopGroupsList/>

                </div>
                <div className="d-block d-md-none">
                    {view === "myFriends" ? <MyFriendsList/>
                    : view === "myGroups" ? <MyGroupsList/>
                    : <TopGroupsList/>}


                </div>


            </div>

            <div className="centercolumn">
                {!props.isEdit ? (
                    <div className="center-items">
                        <img src={tvPic} alt="tvPic"/>
                        <h2>Welcome!</h2>
                        <span>This is your brand, shiny server. Here are some steps </span>
                        <h3>to help you et stared:</h3>
                        <div className="p-text">
                            <p>● Create your group</p>
                            <p>● personalize your group with an icon</p>
                            <p>● Invite your friends</p>
                            <p>● Enjoy!</p>
                        </div>
                    </div>
                ) : (
                    <EditProfile/>
                )}
            </div>
            <div className="d-none d-md-block">
                <MyFriendsList/>
            </div>

        </div>
    );
};

const mapStateToProps = (state: ReduxState) => ({
    text: state.language,
    isEdit: state.isEdit,
});

const connector = connect(mapStateToProps);
export default connector(Dashboard);
