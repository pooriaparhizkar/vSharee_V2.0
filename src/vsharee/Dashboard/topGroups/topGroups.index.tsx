import React, { useState } from 'react';
import { ReduxState } from 'interface';
import { connect, ConnectedProps } from 'react-redux';
import fakePic from 'assets/images/dashboard/fakepic.jpg';
import './topGroups.style.scss';
import { get, responseValidator } from '../../../scripts/api';

const TopGroupsList: React.FC<ConnectedProps<typeof connector>> = function (props: ConnectedProps<typeof connector>) {
    return (
        <div className="vsharee-dashboard-top-groups">
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
    );
};

const mapStateToProps = (state: ReduxState) => ({
    text: state.language,
    isEdit: state.isEdit,
});

const connector = connect(mapStateToProps);
export default connector(TopGroupsList);
