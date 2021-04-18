import React from 'react';

import { ReduxState } from 'interface';
import { connect, ConnectedProps } from 'react-redux';
import tvPic from 'assets/images/dashboard/tv.png';
import fakePic from 'assets/images/dashboard/fakepic.jpg';
import './dashboard.style.scss';

const Dashboard: React.FC<ConnectedProps<typeof connector>> = function (props: ConnectedProps<typeof connector>) {
    return (
        <div className="vsharee-dashboard-page">
            <div className="leftcolumn">
                <div className={'top'}>
                    <div className="top-in">
                        <h3>My Groups</h3>
                        <div className="index">
                            <div className="items-top">
                                <div className="items-top-left">
                                    <img src={fakePic} alt="fakePic" />
                                </div>
                                <div className="items-top-right">
                                    <p># Group Num1</p>
                                </div>
                            </div>
                            <div className="items-top">
                                <div className="items-top-left">
                                    <img src={fakePic} alt="fakePic" />
                                </div>
                                <div className="items-top-right">
                                    <p># Group Num2</p>
                                </div>
                            </div>
                            <div className="items-top">
                                <div className="items-top-left">
                                    <img src={fakePic} alt="fakePic" />
                                </div>
                                <div className="items-top-right">
                                    <p># Group Num3</p>
                                </div>
                            </div>
                            <div className="items-top">
                                <div className="items-top-left">
                                    <img src={fakePic} alt="fakePic" />
                                </div>
                                <div className="items-top-right">
                                    <p># Group Num4</p>
                                </div>
                            </div>
                            <div className="items-top">
                                <div className="items-top-left">
                                    <img src={fakePic} alt="fakePic" />
                                </div>
                                <div className="items-top-right">
                                    <p># Group Num3</p>
                                </div>
                            </div>
                            <div className="items-top">
                                <div className="items-top-left">
                                    <img src={fakePic} alt="fakePic" />
                                </div>
                                <div className="items-top-right">
                                    <p># Group Num6</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bottom">
                    <div className="bottom-in">
                        <h3>Top Groups</h3>
                        <div className="my-container">
                            <div className="items-bottom">
                                <div className="items-bottom-left">
                                    <i className="material-icons-outlined star">star</i>

                                    <img src={fakePic} alt="fakePic" />
                                </div>
                                <div className="items-bottom-right">
                                    <p>Johnhayes</p>
                                    <span>685 members</span>
                                </div>
                            </div>
                            <div className="items-bottom">
                                <div className="items-bottom-left">
                                    <i className="material-icons-outlined star">star</i>

                                    <img src={fakePic} alt="fakePic" />
                                </div>
                                <div className="items-bottom-right">
                                    <p>Johnhayes</p>
                                    <span>685 members</span>
                                </div>
                            </div>{' '}
                            <div className="items-bottom">
                                <div className="items-bottom-left">
                                    <i className="material-icons-outlined star">star</i>

                                    <img src={fakePic} alt="fakePic" />
                                </div>
                                <div className="items-bottom-right">
                                    <p>Johnhayes</p>
                                    <span>685 members</span>
                                </div>
                            </div>
                            <div className="items-bottom">
                                <div className="items-bottom-left">
                                    <i className="material-icons-outlined star">star</i>

                                    <img src={fakePic} alt="fakePic" />
                                </div>
                                <div className="items-bottom-right">
                                    <p>Johnhayes</p>
                                    <span>685 members</span>
                                </div>
                            </div>
                            <div className="items-bottom">
                                <div className="items-bottom-left">
                                    <i className="material-icons-outlined star">star</i>

                                    <img src={fakePic} alt="fakePic" />
                                </div>
                                <div className="items-bottom-right">
                                    <p>Johnhayes</p>
                                    <span>685 members</span>
                                </div>
                            </div>
                            <div className="items-bottom">
                                <div className="items-bottom-left">
                                    <i className="material-icons-outlined star">star</i>

                                    <img src={fakePic} alt="fakePic" />
                                </div>
                                <div className="items-bottom-right">
                                    <p>Johnhayes</p>
                                    <span>685 members</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="centercolumn">
                <div className="center-items">
                    <img src={tvPic} alt="tvPic" />
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
            </div>
            <div className={'rightcolumn'}>
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
        </div>
    );
};

const mapStateToProps = (state: ReduxState) => ({
    text: state.language,
});

const connector = connect(mapStateToProps);
export default connector(Dashboard);
