import React, { useState } from 'react';
import { GroupType, ReduxState } from 'interface';
import { connect, ConnectedProps } from 'react-redux';
import fakePic from 'assets/images/dashboard/fakepic.jpg';
import './topGroups.style.scss';
import DashboardEmptyState from '../emptyState/emptyState.index';
import DashboardItemsSkeleton from '../skeleton/dashboard.skeleton';
import { navigationAnim, RoutePath } from '../../../data';
import { useHistory } from 'react-router-dom';
import JoinGroupModal from '../../Component/joinGroupModal/joinGroupModal.index';
import AlphabetPicture from '../../../utilities/component/alphabetPhoto/alphabetPhoto.index';

const TopGroupsList: React.FC<ConnectedProps<typeof connector> & { data?: GroupType[] | any }> = function (
    props: ConnectedProps<typeof connector> & { data?: GroupType[] | any },
) {
    const history = useHistory();
    const [idSelected, setIdSelected] = useState<string>();
    const [showModal, setShowModal] = useState<boolean>(false);
    function clickHandler(id: string) {
        setIdSelected(id);
        setShowModal(true);
    }
    return (
        <div className="vsharee-dashboard-top-groups">
            <JoinGroupModal
                id={idSelected}
                show={showModal}
                onClose={() => {
                    setShowModal(false);
                    setIdSelected(undefined);
                }}
            />
            <h3>Top Groups</h3>
            <div className="my-container">
                {props.data ? (
                    !props.data.info ? (
                        props.data.map((item: any, index: any) => (
                            <div onClick={() => clickHandler(item.groupid)} key={index} className="items-bottom">
                                <div className="items-bottom-left">
                                    <i className="material-icons-outlined star">star</i>

                                    {item.photo ? (
                                        <img src={item.photo_path} alt="fakePic" />
                                    ) : (
                                        <AlphabetPicture title={item.title} type={'square'} />
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
