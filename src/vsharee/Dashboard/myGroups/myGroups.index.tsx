import React, { useEffect, useState } from 'react';
import { AuthStatus, GroupType, ReduxState } from 'interface';
import { connect, ConnectedProps } from 'react-redux';
import './myGroups.style.scss';
import fakePic from '../../../assets/images/dashboard/fakepic.jpg';
import { navigationAnim, RoutePath } from '../../../data';
import DashboardEmptyState from '../emptyState/emptyState.index';
import DashboardItemsSkeleton from '../skeleton/dashboard.skeleton';
import { useHistory } from 'react-router-dom';
import AlphabetPicture from '../../../utilities/component/alphabetPhoto/alphabetPhoto.index';
import JoinGroupModal from '../../Component/joinGroupModal/joinGroupModal.index';

const MyGroupsList: React.FC<ConnectedProps<typeof connector> & { data?: GroupType[] }> = function (
    props: ConnectedProps<typeof connector> & { data?: GroupType[] },
) {
    const history = useHistory();
    const [idSelected, setIdSelected] = useState<string>();
    const [showModal, setShowModal] = useState<boolean>(false);
    function clickHandler(id: string) {
        setIdSelected(id);
        setShowModal(true);
    }

    return (
        <div className="vsharee-dashboard-my-groups">
            <JoinGroupModal
                id={idSelected}
                show={showModal}
                onClose={() => {
                    setShowModal(false);
                    setIdSelected(undefined);
                }}
            />
            <h3>My Groups</h3>
            <div className="index">
                {props.data ? (
                    props.data.length !== 0 ? (
                        props.data.map((item, index) => (
                            <div onClick={() => clickHandler(item.groupid)} key={index} className="items-top">
                                <div className="items-top-left">
                                    {item.photo ? (
                                        <img src={item.photo_path} alt="gp-photo" />
                                    ) : (
                                        <AlphabetPicture title={item.title} type={'square'} />
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
