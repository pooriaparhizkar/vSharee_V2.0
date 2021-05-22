import React, { useEffect, useState } from 'react';
import { AuthStatus, GroupType, ReduxState } from 'interface';
import { connect, ConnectedProps } from 'react-redux';
import './myGroups.style.scss';
import fakePic from '../../../assets/images/dashboard/fakepic.jpg';
import { navigationAnim, RoutePath } from '../../../data';
import DashboardEmptyState from '../emptyState/emptyState.index';
import DashboardItemsSkeleton from '../skeleton/dashboard.skeleton';
import { useHistory } from 'react-router-dom';

const MyGroupsList: React.FC<ConnectedProps<typeof connector> & { data?: GroupType[] }> = function (
    props: ConnectedProps<typeof connector> & { data?: GroupType[] },
) {
    const history = useHistory();
    function clickHandler(id: number) {
        document.body.classList.add(navigationAnim);
        setTimeout(() => {
            document.body.classList.remove(navigationAnim);
            history.push(RoutePath.group(id));
        }, 500);
    }

    return (
        <div className="vsharee-dashboard-my-groups">
            <h3>My Groups</h3>
            <div className="index">
                {props.data ? (
                    props.data.length !== 0 ? (
                        props.data.map((item, index) => (
                            <div onClick={() => clickHandler(item.id)} key={index} className="items-top">
                                <div className="items-top-left">
                                    {item.photo ? (
                                        <img src={item.photo_path} alt="gp-photo" />
                                    ) : (
                                        <h2
                                            style={{
                                                backgroundColor:
                                                    '#' + Math.floor(Math.random() * 16777215).toString(16),
                                            }}
                                        >
                                            {item.title.charAt(0).toUpperCase()}
                                        </h2>
                                    )}
                                </div>
                                <div className="items-top-right">
                                    <p>{item.title}</p>
                                    {item.privacy === 2 ? (
                                        <i className="material-icons-outlined">lock</i>
                                    ) : item.privacy === 1 ? (
                                        <i className="material-icons-outlined">lock</i>
                                    ) : (
                                        <i className="material-icons-outlined"></i>
                                    )}
                                </div>
                            </div>
                        ))
                    ) : (
                        <DashboardEmptyState info="You have no groups" />
                    )
                ) : (
                    <React.Fragment>
                        {Array.from(Array(5).keys()).map((item, index) => (
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
export default connector(MyGroupsList);
