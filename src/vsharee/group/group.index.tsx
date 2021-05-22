import React from 'react';
import { ReduxState } from 'interface';
import { connect, ConnectedProps } from 'react-redux';
import './group.style.scss';
import waveHand from 'assets/images/group/waveHand.gif';
import { TextField } from '@material-ui/core';
const Group: React.FC<ConnectedProps<typeof connector>> = function (props: ConnectedProps<typeof connector>) {
    return (
        <div className="vsharee-group-page">
            <div className="my-container">
                <div className="left">
                    <div className="video-player">
                        <iframe src="https://www.youtube.com/embed/OaqeH9_yQBw" />
                    </div>
                    <div className="detail">
                        <h3>Group Information</h3>
                        <div className="info">
                            <div className="context">
                                <img
                                    alt="group-photo"
                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoiMtJG_PC4lsb3-GZAiTZkUXAm3VlkJC1Ag&usqp=CAU"
                                />
                                <div className="index">
                                    <div className="gp-name">
                                        <h4>Wanted Group</h4>
                                        <span />
                                        <label>18 members</label>
                                    </div>
                                    <span>public group</span>
                                    <div className="description">
                                        <p>
                                            Donec facilisis tortor ut augue lacinia, at viverra est semper. Sed sapien
                                            metus, scelerisque nec pharetra id, tempor a tortor. Pellentesque non
                                            dignissim neque. Donec facilisis tortor ut augue lacinia, at viverra est
                                            semper. Sed sapien metus, scelerisque nec pharetra id, tempor a tortor.
                                            Pellentesque non dignissim neque. Ut porta viv Donec facilisis tortor ut
                                            augue lacinia, at viverra est semper. Sed sapien metus, scelerisque nec
                                            pharetra id, tempor a tortor. Pellentesque non dignissim neque. Ut porta viv
                                            Donec facilisis tortor ut augue lacinia, at viverra est semper. Sed sapien
                                            metus, scelerisque nec pharetra id, tempor a tortor. Pellentesque non
                                            dignissim neque. Ut porta viv Donec facilisis tortor ut augue lacinia, at
                                            viverra est semper. Sed sapien metus, scelerisque nec pharetra id, tempor a
                                            tortor. Pellentesque non dignissim neque. Ut porta viv Donec facilisis
                                            tortor ut augue lacinia, at viverra est semper. Sed sapien metus,
                                            scelerisque nec pharetra id, tempor a tortor. Pellentesque non dignissim
                                            neque. Ut porta vivUt porta viverra est, ut dignissim elit elementum ut.
                                        </p>
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
});

const connector = connect(mapStateToProps);
export default connector(Group);
