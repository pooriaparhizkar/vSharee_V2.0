import React, { useEffect } from 'react';
import { ReduxState, UserData } from 'interface';
import { connect, ConnectedProps } from 'react-redux';
import fakePic from 'assets/images/dashboard/fakepic.jpg';
import './myfriends.style.scss';
import DashboardEmptyState from '../emptyState/emptyState.index';
import DashboardItemsSkeleton from '../skeleton/dashboard.skeleton';
import { Link } from 'react-router-dom';
import { RoutePath } from '../../../data';
import Logo from 'assets/images/landing/logo.png';
const MyFriendsList: React.FC<
    ConnectedProps<typeof connector> & { online?: UserData[]; offline?: UserData[] }
> = function (props: ConnectedProps<typeof connector> & { online?: UserData[]; offline?: UserData[] }) {
    return (
        <div className="vsharee-dashboard-my-friends">
            <h3>My Friends</h3>
            <div className="context">
                {props.offline || props.online ? (
                    (props.online && props.online.length !== 0) || (props.offline && props.offline.length !== 0) ? (
                        <React.Fragment>
                            {props.online &&
                                props.online.map((item: any, index: any) => (
                                    <div key={index} className="items online">
                                        <div className="left-items">
                                            <img src={item.photo ? item.photo_path : Logo} alt="gp-photo" />
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
                                    <Link to={RoutePath.profileDetail(item.username)} key={index} className="items">
                                        <div className="left-items">
                                            <img src={item.photo ? item.photo_path : Logo} alt="gp-photo" />
                                            <i className="material-icons-outlined circle">circle</i>
                                        </div>
                                        <div className="right-items">
                                            <p>{item.username}</p>
                                            <span>watching movie</span>
                                        </div>
                                    </Link>
                                ))}
                        </React.Fragment>
                    ) : (
                        <DashboardEmptyState info="You have no friend" />
                    )
                ) : (
                    <React.Fragment>
                        {Array.from(Array(12).keys()).map((item, index) => (
                            <DashboardItemsSkeleton key={index} />
                        ))}
                    </React.Fragment>
                )}
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
