import React from 'react';
import { ReduxState } from 'interface';
import { connect, ConnectedProps } from 'react-redux';
import fakePic from 'assets/images/dashboard/fakepic.jpg';
import './myfriends.style.scss';

const MyFriendsList: React.FC<ConnectedProps<typeof connector> & { online: any; offline: any }> = function (
    props: ConnectedProps<typeof connector> & { online: any; offline: any },
) {
    return (
        <div className="vsharee-dashboard-my-friends">
            <h3>My Friends</h3>
            <div className="context">
                {props.online &&
                    props.online.map((item: any, index: any) => (
                        <div key={index} className="items online">
                            <div className="left-items">
                                <img src={fakePic} alt="fakePic" />
                                <i className="material-icons-outlined circle">circle</i>
                            </div>
                            <div className="right-items">
                                <p>{item.username}</p>
                                <span>watching movie</span>
                            </div>
                        </div>
                    ))}

                {props.offline &&
                    props.offline.map((item: any, index: any) => (
                        <div key={index} className="items online">
                            <div className="left-items">
                                <img src={fakePic} alt="fakePic" />
                                <i className="material-icons-outlined circle">circle</i>
                            </div>
                            <div className="right-items">
                                <p>{item.username}</p>
                                <span>watching movie</span>
                            </div>
                        </div>
                    ))}
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
