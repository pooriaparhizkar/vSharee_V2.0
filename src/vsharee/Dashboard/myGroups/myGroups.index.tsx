import React, { useEffect, useState } from 'react';
import { ReduxState } from 'interface';
import { connect, ConnectedProps } from 'react-redux';
import './myGroups.style.scss';
import fakePic from '../../../assets/images/dashboard/fakepic.jpg';

const MyGroupsList: React.FC<ConnectedProps<typeof connector> & { data: any }> = function (
    props: ConnectedProps<typeof connector> & { data: any },
) {
    return (
        <div className="vsharee-dashboard-my-groups">
            <h3>My Groups</h3>
            <div className="index">
                {props.data &&
                    props.data.map((item: any, index: any) => (
                        <div key={index} className="items-top">
                            <div className="items-top-left">
                                <img src={fakePic} alt="fakePic" />
                            </div>
                            <div className="items-top-right">
                                <p>{item.title}</p>
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
export default connector(MyGroupsList);
