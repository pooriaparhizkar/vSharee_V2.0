import React, { useEffect, useState } from 'react';
import { GroupPrivacy, GroupType, ReduxState } from 'interface';
import { connect, ConnectedProps } from 'react-redux';
import './group.style.scss';
import waveHand from 'assets/images/group/waveHand.gif';
import { TextField } from '@material-ui/core';
import CreateGroupModal from '../Component/createGroupModal/createGroupModal.index';
import { get, responseValidator } from '../../scripts/api';
import { APIPath } from '../../data';
import { useParams } from 'react-router-dom';
import AlphabetPicture from '../../utilities/component/alphabetPhoto/alphabetPhoto.index';
const Group: React.FC<ConnectedProps<typeof connector>> = function (props: ConnectedProps<typeof connector>) {
    const [isEditGroup, setIsEditGroup] = useState<boolean>(false);
    const { id } = useParams<any>();
    const [groupData, setGroupData] = useState<GroupType>();
    const [isAdmin, setIsAdmin] = useState<boolean>();
    function getGroupData() {
        get<GroupType>(APIPath.groups.detail(id)).then((res) => {
            if (responseValidator(res.status) && res.data) {
                setGroupData(res.data);
                if (res.data.created_by === props.userData?.username) setIsAdmin(true);
            }
        });
    }
    useEffect(() => {
        getGroupData();
    }, []);
    return (
        <div className="vsharee-group-page">
            <CreateGroupModal
                data={groupData}
                show={isEditGroup}
                onClose={() => {
                    setIsEditGroup(false);
                    getGroupData();
                }}
            />
            <div className="my-container">
                <div className="left">
                    <div className="video-player">
                        <iframe src="https://www.youtube.com/embed/OaqeH9_yQBw" />
                    </div>
                    <div className="detail">
                        <div className="group-detail-title">
                            <h3>Group Information</h3>
                            {isAdmin && (
                                <div onClick={() => setIsEditGroup(true)} className="edit">
                                    <i className="material-icons">edit</i>
                                    <span>Edit</span>
                                </div>
                            )}
                        </div>

                        <div className="info">
                            <div className="context">
                                {groupData &&
                                    (groupData?.photo ? (
                                        <img alt="group-photo" src={groupData.photo_path} />
                                    ) : (
                                        <AlphabetPicture title={groupData?.title} size={'medium'} type={'circle'} />
                                    ))}
                                <div className="index">
                                    <div className="gp-name">
                                        <h4>{groupData?.title}</h4>
                                        <span />
                                        <label>{groupData?.members.length} members</label>
                                    </div>
                                    <span>
                                        {groupData?.privacy === GroupPrivacy.public
                                            ? 'Public'
                                            : groupData?.privacy === GroupPrivacy.semiPrivate
                                            ? 'Semi Private'
                                            : 'Private'}
                                    </span>
                                    <div className="description">
                                        <p>{groupData?.describtion}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="gp-controller">
                                <h4>Archive</h4>
                                <div className="context">
                                    <div className="empty-state">
                                        <i className="material-icons">inventory</i>
                                        <p>No archive is here…</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="right">
                    <div className="member">
                        <h3>Online Member</h3>
                        <div className="context">
                            <div className="items">
                                <img
                                    src="https://littleletterslinked.com/wp-content/uploads/2019/07/man-with-cool-beard-style-looking-into-camera.jpg"
                                    alt="profile-pic"
                                />
                                <div className="info">
                                    <p>Bonelwa Ngqawana</p>
                                    <label>Streamer</label>
                                </div>
                            </div>
                            <div className="items">
                                <img
                                    src="https://littleletterslinked.com/wp-content/uploads/2019/07/man-with-cool-beard-style-looking-into-camera.jpg"
                                    alt="profile-pic"
                                />
                                <div className="info">
                                    <p>Bonelwa Ngqawana</p>
                                    <label>Streamer</label>
                                </div>
                            </div>
                            <div className="items">
                                <img
                                    src="https://littleletterslinked.com/wp-content/uploads/2019/07/man-with-cool-beard-style-looking-into-camera.jpg"
                                    alt="profile-pic"
                                />
                                <div className="info">
                                    <p>Bonelwa Ngqawana</p>
                                    <label>Streamer</label>
                                </div>
                            </div>
                            <div className="items">
                                <img
                                    src="https://littleletterslinked.com/wp-content/uploads/2019/07/man-with-cool-beard-style-looking-into-camera.jpg"
                                    alt="profile-pic"
                                />
                                <div className="info">
                                    <p>Bonelwa Ngqawana</p>
                                    <label>Streamer</label>
                                </div>
                            </div>
                            <div className="items">
                                <img
                                    src="https://littleletterslinked.com/wp-content/uploads/2019/07/man-with-cool-beard-style-looking-into-camera.jpg"
                                    alt="profile-pic"
                                />
                                <div className="info">
                                    <p>Bonelwa Ngqawana</p>
                                    <label>Streamer</label>
                                </div>
                            </div>
                            <div className="items">
                                <img
                                    src="https://littleletterslinked.com/wp-content/uploads/2019/07/man-with-cool-beard-style-looking-into-camera.jpg"
                                    alt="profile-pic"
                                />
                                <div className="info">
                                    <p>Bonelwa Ngqawana</p>
                                    <label>Streamer</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="chat">
                        <h3>Chat</h3>
                        <div className="context">
                            <div className="empty-state">
                                <label>No messages here yet...</label>
                                <p>Send a message or tap on the greeting below</p>
                                <img alt="waveHand" src={waveHand} />
                            </div>
                        </div>
                        <div className="send">
                            <TextField
                                id="outlined-basic"
                                placeholder="Sent a new message..."
                                label=""
                                variant="outlined"
                                multiline
                            />
                            <i className="material-icons emoji">mood</i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state: ReduxState) => ({
    text: state.language,
    isEdit: state.isEdit,
    myGroups: state.myGroups,
    userData: state.userData,
});

const connector = connect(mapStateToProps);
export default connector(Group);
