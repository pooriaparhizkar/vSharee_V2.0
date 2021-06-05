import React, { useState } from 'react';
import { ReduxState } from 'interface';
import { connect, ConnectedProps } from 'react-redux';
import './whiteSpinner.style.scss';
import { CircularProgress } from '@material-ui/core';

const WhiteSpinner: React.FC<ConnectedProps<typeof connector>> = function (props: ConnectedProps<typeof connector>) {
    return (
        <div className="vsharee-white-spinner">
            <CircularProgress size={23} />
        </div>
    );
};

const mapStateToProps = (state: ReduxState) => ({
    text: state.language,
});

const connector = connect(mapStateToProps);
export default connector(WhiteSpinner);
