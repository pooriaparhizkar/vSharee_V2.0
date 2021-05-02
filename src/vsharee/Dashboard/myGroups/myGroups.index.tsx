import React, {useState} from 'react';
import { ReduxState } from 'interface';
import { connect, ConnectedProps } from 'react-redux';
import './myGroups.style.scss';
import fakePic from "../../../assets/images/dashboard/fakepic.jpg";

const MyGroupsList: React.FC<ConnectedProps<typeof connector>> = function (props: ConnectedProps<typeof connector>) {

    return (
        <div className="vsharee-dashboard-my-groups">
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

        </div>
    );
};

const mapStateToProps = (state: ReduxState) => ({
    text: state.language,
    isEdit: state.isEdit,
});

const connector = connect(mapStateToProps);
export default connector(MyGroupsList);
