import React from 'react';
import { ReduxState } from 'interface';
import { connect, ConnectedProps } from 'react-redux';
import './dashboard.styleton.scss';

const DashboardItemsSkeleton: React.FC<ConnectedProps<typeof connector>> = function (
    props: ConnectedProps<typeof connector>,
) {
    return (
        <div className="vsharee-dashboard-skeleton">
            <div className="skeleton-pic vsharee-skeleton" />
            <div className="skeleton-info">
                <div
                    style={{
                        width: (20 + Math.random() * 80).toString() + '%',
                    }}
                    className="skeleton-items vsharee-skeleton"
                />
                <div
                    style={{
                        width: (20 + Math.random() * 80).toString() + '%',
                    }}
                    className="skeleton-items vsharee-skeleton"
                />
            </div>
        </div>
    );
};

const mapStateToProps = (state: ReduxState) => ({
    text: state.language,
    isEdit: state.isEdit,
});

const connector = connect(mapStateToProps);
export default connector(DashboardItemsSkeleton);
