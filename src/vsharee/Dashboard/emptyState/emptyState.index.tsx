import React, { useRef, useState } from 'react';
import './emptyState.style.scss';
import { connect, ConnectedProps } from 'react-redux';
import { ReduxState } from '../../../interface';
import { EmptyStateProps } from './emptyState.interface';
import emptyPic from '../../../assets/images/emptystate.png';

const DashboardEmptyState: React.FC<ConnectedProps<typeof connector> & EmptyStateProps> = function (
    props: ConnectedProps<typeof connector> & EmptyStateProps,
) {
    return (
        <div className="vsharee-dashboard-empty-state">
            <img src={emptyPic} alt="Empty" />
            <p>{props.info}</p>
        </div>
    );
};

const mapStateToProps = (state: ReduxState) => ({
    text: state.language,
});

const connector = connect(mapStateToProps);
export default connector(DashboardEmptyState);
