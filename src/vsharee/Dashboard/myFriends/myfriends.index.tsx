import React, {useState} from 'react';
import { ReduxState } from 'interface';
import { connect, ConnectedProps } from 'react-redux';
import fakePic from 'assets/images/dashboard/fakepic.jpg';
import './myfriends.style.scss';


const MyFriendsList: React.FC<ConnectedProps<typeof connector>> = function (props: ConnectedProps<typeof connector>) {

    return (
        <div className="vsharee-dashboard-my-friends">

                <div className={'rightcolumn-in'}>
                    <h3>My Friends</h3>
                    <div className={'context'}>
                        <div className="items">
                            <div className="left-items">
                                <img src={fakePic} alt="fakePic" />
                                <i className="material-icons-outlined circle">circle</i>
                            </div>
                            <div className="right-items">
                                <p>Bonelwa Ngqawana</p>
                                <span>watching movie</span>
                            </div>
                        </div>
                        <div className="items online">
                            <div className={'left-items'}>
                                <img src={fakePic} alt="fakePic" />
                                <i className="material-icons-outlined circle">circle</i>
                            </div>
                            <div className={'right-items'}>
                                <p>Bonelwa Ngqawana</p>
                                <span>watching movie</span>
                            </div>
                        </div>
                        <div className="items online">
                            <div className={'left-items'}>
                                <img src={fakePic} alt="fakePic" />
                                <i className="material-icons-outlined circle">circle</i>
                            </div>
                            <div className={'right-items'}>
                                <p>Bonelwa Ngqawana</p>
                                <span>watching movie</span>
                            </div>
                        </div>
                        <div className="items">
                            <div className="left-items">
                                <img src={fakePic} alt="fakePic" />
                                <i className="material-icons-outlined circle">circle</i>
                            </div>
                            <div className="right-items">
                                <p>Bonelwa Ngqawana</p>
                                <span>watching movie</span>
                            </div>
                        </div>
                        <div className="items">
                            <div className="left-items">
                                <img src={fakePic} alt="fakePic" />
                                <i className="material-icons-outlined circle">circle</i>
                            </div>
                            <div className="right-items">
                                <p>Bonelwa Ngqawana</p>
                                <span>watching movie</span>
                            </div>
                        </div>
                        <div className="items">
                            <div className="left-items">
                                <img src={fakePic} alt="fakePic" />
                                <i className="material-icons-outlined circle">circle</i>
                            </div>
                            <div className="right-items">
                                <p>Bonelwa Ngqawana</p>
                                <span>watching movie</span>
                            </div>
                        </div>
                    </div>
                </div>



        </div>
    );
};

const mapStateToProps = (state: ReduxState) => ({
    text: state.language,
    isEdit: state.isEdit,
});

const connector = connect(mapStateToProps);
export default connector(MyFriendsList);
