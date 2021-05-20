import React from 'react';
import { GroupType, ReduxState } from 'interface';
import { connect, ConnectedProps } from 'react-redux';
import fakePic from 'assets/images/dashboard/fakepic.jpg';
import './topGroups.style.scss';
import DashboardEmptyState from '../emptyState/emptyState.index';
import DashboardItemsSkeleton from '../skeleton/dashboard.skeleton';
import { navigationAnim, RoutePath } from '../../../data';
import { useHistory } from 'react-router-dom';

const TopGroupsList: React.FC<ConnectedProps<typeof connector> & { data?: GroupType[] | any }> = function (
    props: ConnectedProps<typeof connector> & { data?: GroupType[] | any },
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
        <div className="vsharee-dashboard-top-groups">
            <h3>Top Groups</h3>
            <div className="my-container">
                {props.data ? (
                    !props.data.info ? (
                        props.data.map((item: any, index: any) => (
                            <div onClick={() => clickHandler(item.id)} key={index} className="items-bottom">
                                <div className="items-bottom-left">
                                    <i className="material-icons-outlined star">star</i>

                                    {item.photo ? (
                                        <img src={item.photo_path} alt="fakePic" />
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
                                <div className="items-bottom-right">
                                    <p>{item.title}</p>
                                    <span>{item.aux_count} members</span>
                                </div>
                            </div>
                        ))
                    ) : (
                        <DashboardEmptyState info="No groups to show" />
                    )
                ) : (
                    <React.Fragment>
                        {Array.from(Array(10).keys()).map((item, index) => (
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
export default connector(TopGroupsList);
