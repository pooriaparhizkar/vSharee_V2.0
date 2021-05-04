import React, { useState, useEffect } from 'react';
import { AuthStatus, ReduxState } from 'interface';
import { connect, ConnectedProps } from 'react-redux';
import './editProfile.style.scss';
import { Modal } from 'react-bootstrap';
import {
    Button,
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
import { setAuth, setIsEdit } from '../../../redux/actions';
const EditProfile: React.FC<ConnectedProps<typeof connector>> = function (props: ConnectedProps<typeof connector>) {
    const LANG = props.text.components.CreateGroupModal;
    const [privacy, setPrivacy] = useState<string>('public');
    const [firstname, setfirstname] = useState<string | undefined>(props.userData?.firstname);
    const [lastname, setlastname] = useState<string | undefined>(props.userData?.lastname);
    return (
        <Modal
            className="vsharee-edit-profile-modal"
            show={props.isEdit}
            onHide={() => props.dispatch(setIsEdit(false))}
        >
            <div className="vsharee-edit-profile-component">
                <Card variant="outlined">
                    <div className="image-uploader">
                        <img src={fakeImage} alt="profile-photo" />
                        <div className="icon">
                            <i className="material-icons">edit</i>
                        </div>
                    </div>
                    <div className="my-row">
                        <TextField
                            label={'First name'}
                            id="outlined-basic "
                            value={firstname}
                            onChange={(e) => setfirstname(e.target.value)}
                            variant="outlined"
                        />
                        <TextField
                            label={'Last name'}
                            id="outlined-basic "
                            value={lastname}
                            onChange={(e) => setlastname(e.target.value)}
                            variant="outlined"
                        />
                    </div>
                    <TextField rows={4} multiline={true} label={'bio'} id="outlined-basic bio" variant="outlined" />
                    <div className="my-radio">
                        <FormControl component="fieldset">
                            <FormLabel component="legend">{LANG.privacyTitle}</FormLabel>
                            <RadioGroup value={privacy} onChange={(e) => setPrivacy(e.target.value)}>
                                <FormControlLabel value="public" control={<Radio />} label={LANG.public} />
                                <p className="detail">{LANG.publicDescription}</p>
                                <FormControlLabel value="private" control={<Radio />} label={LANG.private} />
                                <p className="detail">{LANG.privateDescription}</p>
                            </RadioGroup>
                        </FormControl>
                    </div>
                    <div className="my-btn">
                        <Button onClick={() => props.dispatch(setIsEdit(false))} variant="contained" color="default">
                            Cancel
                        </Button>
                        <Button variant="contained" color="primary">
                            Edit
                        </Button>
                    </div>
                </Card>
            </div>
        </Modal>
    );
};

const mapStateToProps = (state: ReduxState) => ({
    // direction: state.direction,
    text: state.language,
    isAuth: state.authStatus,
    userData: state.userData,
    isEdit: state.isEdit,
    //language: state.language,
});

const connector = connect(mapStateToProps);
export default connector(EditProfile);
