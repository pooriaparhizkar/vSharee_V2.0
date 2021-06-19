import React, { useEffect, useRef, useState } from 'react';
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

import { authToken } from 'scripts/storage';
const socketstream: any = null;

import GroupMembersModal from '../Component/groupMembers/groupMembers.index';
import NotifyMemberModal from '../Component/notifyMemberModal/notifyMemberModal.index';
import GroupOnlineMembers from './onlineMember/onlineMember.index';

const Group: React.FC<ConnectedProps<typeof connector>> = function (props: ConnectedProps<typeof connector>) {
    const [isEditGroup, setIsEditGroup] = useState<boolean>(false);
    const { id } = useParams<any>();
    const [groupData, setGroupData] = useState<GroupType>();
    const [isAdmin, setIsAdmin] = useState<boolean>();
    const [chatpm, setchatpm] = useState<any>('');
    const [isMemberModal, setIsMemberModal] = useState<boolean>(false);
    const [isNotifyModal, setIsNotifyModal] = useState<boolean>(false);
    function getGroupData() {
        get<GroupType>(APIPath.groups.detail(id)).then((res) => {
            if (responseValidator(res.status) && res.data) {
                setGroupData(res.data);
                if (res.data.created_by === props.userData?.username) setIsAdmin(true);
            }
        });
    }
    const streamSocket = new WebSocket(
        'ws://api.vsharee.ir:8001/stream/groups/' + id + '/?token=' + authToken.get()?.access_token + '',
    );
    const chatSocket = new WebSocket(
        'ws://api.vsharee.ir:8001/chat/groups/' + id + '/?token=' + authToken.get()?.access_token + '',
    );

    useEffect(() => {
        getGroupData();
        console.log(`ws://api.vsharee.ir:8001/stream/groups/${id}/?token=${authToken.get()?.access_token}`);
        streamSocket.onopen = () => console.log('steam socket connected');
        streamSocket.onclose = () => console.log('stream socket disconnected');
        chatSocket.onopen = () => console.log('chat socket connected');
        chatSocket.onclose = () => console.log('chat socket disconnected');
    }, []);
    function enterHandler(e: any) {
        if (e.key === 'Enter' || e.keyCode === 13) {
            sendmessage();
        }
    }
    function sendmessage() {
        const message_send_chat = { command: 'chat_client', message_client: 'test' };
        chatSocket.send('ss');
        // socketchat.current.send(JSON.stringify(message_send_chat));
    }
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
            <NotifyMemberModal id={id} show={isNotifyModal} onClose={() => setIsNotifyModal(false)} />

            <GroupMembersModal isAdmin={isAdmin} id={id} show={isMemberModal} onClose={() => setIsMemberModal(false)} />

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
                                        <label onClick={() => setIsMemberModal(true)}>
                                            {groupData?.members.length} members
                                        </label>
                                    </div>
                                    <div className="gp-sub-name">
                                        <span>
                                            {groupData?.privacy === GroupPrivacy.public
                                                ? 'Public'
                                                : groupData?.privacy === GroupPrivacy.semiPrivate
                                                ? 'Semi Private'
                                                : 'Private'}
                                        </span>
                                        <span className="spacer" />
                                        {isAdmin && (
                                            <div onClick={() => setIsNotifyModal(true)} className="notify-members">
                                                <i className="material-icons">notifications_active</i>
                                                <label>Notify</label>
                                            </div>
                                        )}
                                    </div>
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
                            <GroupOnlineMembers id={id} />
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
                                value={chatpm}
                                placeholder="Sent a new message..."
                                label=""
                                variant="outlined"
                                multiline
                                onKeyUp={enterHandler}
                                onChange={(e) => setchatpm(e.target.value)}
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
