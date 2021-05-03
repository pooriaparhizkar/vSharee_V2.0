import React, { useEffect, useState } from 'react';
import { ReduxState } from 'interface';
import { connect, ConnectedProps } from 'react-redux';
import fakePic from 'assets/images/dashboard/fakepic.jpg';
import './topGroups.style.scss';

const TopGroupsList: React.FC<ConnectedProps<typeof connector> & { data: any }> = function (
    props: ConnectedProps<typeof connector> & { data: any },
) {
    return (
        <div className="vsharee-dashboard-top-groups">
            <h3>Top Groups</h3>
            <div className="my-container">
                {props.data &&
                    props.data.map((item: any, index: any) => (
                        <div key={index} className="items-bottom">
                            <div className="items-bottom-left">
                                <i className="material-icons-outlined star">star</i>

                                <img src={fakePic} alt="fakePic" />
                            </div>
                            <div className="items-bottom-right">
                                <p>{item.title}</p>
                                <span>{item.aux_count} members</span>
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
export default connector(TopGroupsList);
