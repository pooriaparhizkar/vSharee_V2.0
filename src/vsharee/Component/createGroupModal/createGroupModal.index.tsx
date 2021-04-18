import React, { useState } from 'react';
import { ReduxState } from 'interface';
import { connect, ConnectedProps } from 'react-redux';
import './createGroupModal.style.scss';
import { Modal } from 'react-bootstrap';
import { CreateGroupModalProps } from './createGroupModal.interface';
import {
    Card,
    FormControl,
    FormControlLabel,
    FormLabel,
    MenuItem,
    Radio,
    RadioGroup,
    Select,
    TextField,
} from '@material-ui/core';
import fakeImage from '../../../assets/images/profile/fakeimage.jpg';
const CreateGroupModal: React.FC<ConnectedProps<typeof connector> & CreateGroupModalProps> = function (
    props: ConnectedProps<typeof connector> & CreateGroupModalProps,
) {
    const LANG = props.text.components.CreateGroupModal;
    const [privacy, setPrivacy] = useState<string>('public');
    const [role, setRole] = useState<string>('viewer');
    return (
        <Modal className="vsharee-create-group-modal" show={props.show} onHide={props.onClose}>
            <div className="my-container">
                <div className="context">
                    <h1>{LANG.title}</h1>
                    <h5>{LANG.descriptionHeader}</h5>
                    <div className="image-uploader">
                        <i className="material-icons">photo_camera</i>
                        <p>{LANG.upload}</p>
                        <div className="icon-plus">
                            <i className="material-icons">add</i>
                        </div>
                    </div>
                    <div className="my-input">
                        <TextField label={LANG.groupName} id="outlined-basic" variant="outlined" />
                    </div>
                    <div className="my-input">
                        <TextField
                            rows={4}
                            multiline={true}
                            label={LANG.description}
                            id="outlined-basic"
                            variant="outlined"
                        />
                    </div>
                    <div className="my-input">
                        <FormControl component="fieldset">
                            <FormLabel component="legend">{LANG.privacyTitle}</FormLabel>
                            <RadioGroup value={privacy} onChange={(e) => setPrivacy(e.target.value)}>
                                <FormControlLabel value="public" control={<Radio />} label={LANG.public} />
                                <p className="detail">{LANG.publicDescription}</p>
                                <FormControlLabel value="semiPrivate" control={<Radio />} label={LANG.semiPrivate} />
                                <p className="detail">{LANG.semiPrivateDescription}</p>
                                <FormControlLabel value="private" control={<Radio />} label={LANG.private} />
                                <p className="detail">{LANG.privateDescription}</p>
                            </RadioGroup>
                        </FormControl>
                    </div>
                    <div className="my-card">
                        <Card variant={'outlined'}>
                            <div className="my-card-inputs">
                                <TextField autoComplete="new-password" id="standard-basic" placeholder={LANG.search} />
                            </div>
                            <div className="context">
                                <div className="items">
                                    <img src={fakeImage} alt="profile-pic" />
                                    <p>Pooria Parhizkar</p>
                                    <span className="spacer" />
                                    <FormControl variant="outlined">
                                        <Select
                                            labelId="demo-simple-select-outlined-label"
                                            id="demo-simple-select-outlined"
                                            value={role}
                                            onChange={(e: any) => setRole(e.target.value)}
                                        >
                                            <MenuItem value={'owner'}>{LANG.owner}</MenuItem>
                                            <MenuItem value={'viewer'}>{LANG.viewer}</MenuItem>
                                            <MenuItem value={'controller'}>{LANG.controller}</MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>
                                <div className="items">
                                    <img src={fakeImage} alt="profile-pic" />
                                    <p>Pooria Parhizkar</p>
                                    <span className="spacer" />
                                    <FormControl variant="outlined">
                                        <Select
                                            labelId="demo-simple-select-outlined-label"
                                            id="demo-simple-select-outlined"
                                            value={role}
                                            onChange={(e: any) => setRole(e.target.value)}
                                        >
                                            <MenuItem value={'owner'}>{LANG.owner}</MenuItem>
                                            <MenuItem value={'viewer'}>{LANG.viewer}</MenuItem>
                                            <MenuItem value={'controller'}>{LANG.controller}</MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>
                                <div className="items">
                                    <img src={fakeImage} alt="profile-pic" />
                                    <p>Pooria Parhizkar</p>
                                    <span className="spacer" />
                                    <FormControl variant="outlined">
                                        <Select
                                            labelId="demo-simple-select-outlined-label"
                                            id="demo-simple-select-outlined"
                                            value={role}
                                            onChange={(e: any) => setRole(e.target.value)}
                                        >
                                            <MenuItem value={'owner'}>{LANG.owner}</MenuItem>
                                            <MenuItem value={'viewer'}>{LANG.viewer}</MenuItem>
                                            <MenuItem value={'controller'}>{LANG.controller}</MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

const mapStateToProps = (state: ReduxState) => ({
    text: state.language,
});

const connector = connect(mapStateToProps);
export default connector(CreateGroupModal);
