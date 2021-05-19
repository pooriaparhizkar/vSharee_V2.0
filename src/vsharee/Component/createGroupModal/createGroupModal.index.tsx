import React, { useRef, useState } from 'react';
import { ReduxState } from 'interface';
import { connect, ConnectedProps } from 'react-redux';
import './createGroupModal.style.scss';
import { Modal } from 'react-bootstrap';
import { CreateGroupModalProps } from './createGroupModal.interface';
import {
    Button,
    Card,
    CircularProgress,
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
import { post, responseValidator } from '../../../scripts/api';
import { APIPath } from '../../../data';
import { toast } from 'react-toastify';
import { getMyGroups } from '../../vsharee.script';
import { Simulate } from 'react-dom/test-utils';
import WhiteSpinner from '../../../utilities/whiteSpinner/whiteSpinner.index';
const CreateGroupModal: React.FC<ConnectedProps<typeof connector> & CreateGroupModalProps> = function (
    props: ConnectedProps<typeof connector> & CreateGroupModalProps,
) {
    const LANG = props.text.components.CreateGroupModal;
    const [privacy, setPrivacy] = useState<'semiPrivate' | 'public' | 'private' | string>('public');
    const [role, setRole] = useState<string>('viewer');
    const [id, setId] = useState<string | undefined>(undefined);
    const [name, setName] = useState<string | undefined>(undefined);
    const [description, setDescription] = useState<string | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(false);
    const fileRef = useRef<any>();
    function resetValue() {
        setId(undefined);
        setName(undefined);
        setDescription(undefined);
        setPrivacy('public');
    }
    function submitHandler() {
        setLoading(true);
        const body: any = {
            groupid: id,
            title: name,
            describtion: description,
        };
        if (privacy === 'public') body.privacy = 0;
        else if (privacy === 'semiPrivate') body.privacy = 1;
        else body.privacy = 2;
        post<any>(APIPath.groups.index, body).then((res) => {
            setLoading(false);
            if (responseValidator(res.status)) {
                toast.success('Your group successfully created');
                getMyGroups(props.dispatch);
                props.onClose();
                resetValue();
            } else {
                if (res.data.groupid) toast.error(res.data.groupid[0]);
                else if (res.data.title) toast.error(res.data.title[0]);
                else if (res.data.describtion) toast.error(res.data.describtion[0]);
                else toast.error('Something went wrong!');
            }
        });
    }

    function photoHandler(e: any) {
        post<any>('/group/upload-photo/?groupid=test', { photo: true }).then((res) => {
            const response = res.data;
            console.log(response);
            const file_upload = e.target.files[0];
            const fd = new FormData();

            fd.append('key', response.upload_photo.fields.key);
            //  fd.append('acl', 'public-read');
            //fd.append('Content-Type', file.type);
            fd.append('AWSAccessKeyId', response.upload_photo.fields.AWSAccessKeyId);
            fd.append('policy', response.upload_photo.fields.policy);
            fd.append('signature', response.upload_photo.fields.signature);

            fd.append('file', file_upload);

            const xhr = new XMLHttpRequest();

            // xhr.upload.addEventListener("progress", uploadProgress, false);
            // xhr.addEventListener("load", uploadComplete, false);
            // xhr.addEventListener("error", uploadFailed, false);
            // xhr.addEventListener("abort", uploadCanceled, false);

            xhr.open(
                'POST',
                'https://vsharee.ir:9000/vshare-group-images/test?AWSAccessKeyId=minio&Signature=8j0x7VSFTbzaitPcq0T4la0WoB0%3D&Expires=1621164500',
                true,
            ); //MUST BE LAST LINE BEFORE YOU SEND

            xhr.send(fd);
        });
    }

    return (
        <Modal className="vsharee-create-group-modal" show={props.show} onHide={props.onClose}>
            <div className="my-container">
                <div className="context">
                    <h1>{LANG.title}</h1>
                    <h5>{LANG.descriptionHeader}</h5>
                    <div onClick={() => fileRef.current.click()} className="image-uploader">
                        <input
                            style={{ display: 'none' }}
                            type="file"
                            accept="image/*"
                            ref={fileRef}
                            onChange={(e) => photoHandler(e)}
                            className="input"
                        />
                        <i className="material-icons">photo_camera</i>
                        <p>{LANG.upload}</p>
                        <div className="icon-plus">
                            <i className="material-icons">add</i>
                        </div>
                    </div>
                    <div className="my-input">
                        <TextField
                            value={id}
                            onChange={(e) => setId(e.target.value)}
                            label={LANG.groupId}
                            id="outlined-basic"
                            variant="outlined"
                        />
                    </div>
                    <div className="my-input">
                        <TextField
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            label={LANG.groupName}
                            id="outlined-basic"
                            variant="outlined"
                        />
                    </div>
                    <div className="my-input">
                        <TextField
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
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
                    {/*<div className="my-card">*/}
                    {/*    <Card variant={'outlined'}>*/}
                    {/*        <div className="my-card-inputs">*/}
                    {/*            <TextField autoComplete="new-password" id="standard-basic" placeholder={LANG.search} />*/}
                    {/*        </div>*/}
                    {/*        <div className="context">*/}
                    {/*            <div className="items">*/}
                    {/*                <img src={fakeImage} alt="profile-pic" />*/}
                    {/*                <p>Pooria Parhizkar</p>*/}
                    {/*                <span className="spacer" />*/}
                    {/*                <FormControl variant="outlined">*/}
                    {/*                    <Select*/}
                    {/*                        labelId="demo-simple-select-outlined-label"*/}
                    {/*                        id="demo-simple-select-outlined"*/}
                    {/*                        value={role}*/}
                    {/*                        onChange={(e: any) => setRole(e.target.value)}*/}
                    {/*                    >*/}
                    {/*                        <MenuItem value={'owner'}>{LANG.owner}</MenuItem>*/}
                    {/*                        <MenuItem value={'viewer'}>{LANG.viewer}</MenuItem>*/}
                    {/*                        <MenuItem value={'controller'}>{LANG.controller}</MenuItem>*/}
                    {/*                    </Select>*/}
                    {/*                </FormControl>*/}
                    {/*            </div>*/}
                    {/*            <div className="items">*/}
                    {/*                <img src={fakeImage} alt="profile-pic" />*/}
                    {/*                <p>Pooria Parhizkar</p>*/}
                    {/*                <span className="spacer" />*/}
                    {/*                <FormControl variant="outlined">*/}
                    {/*                    <Select*/}
                    {/*                        labelId="demo-simple-select-outlined-label"*/}
                    {/*                        id="demo-simple-select-outlined"*/}
                    {/*                        value={role}*/}
                    {/*                        onChange={(e: any) => setRole(e.target.value)}*/}
                    {/*                    >*/}
                    {/*                        <MenuItem value={'owner'}>{LANG.owner}</MenuItem>*/}
                    {/*                        <MenuItem value={'viewer'}>{LANG.viewer}</MenuItem>*/}
                    {/*                        <MenuItem value={'controller'}>{LANG.controller}</MenuItem>*/}
                    {/*                    </Select>*/}
                    {/*                </FormControl>*/}
                    {/*            </div>*/}
                    {/*            <div className="items">*/}
                    {/*                <img src={fakeImage} alt="profile-pic" />*/}
                    {/*                <p>Pooria Parhizkar</p>*/}
                    {/*                <span className="spacer" />*/}
                    {/*                <FormControl variant="outlined">*/}
                    {/*                    <Select*/}
                    {/*                        labelId="demo-simple-select-outlined-label"*/}
                    {/*                        id="demo-simple-select-outlined"*/}
                    {/*                        value={role}*/}
                    {/*                        onChange={(e: any) => setRole(e.target.value)}*/}
                    {/*                    >*/}
                    {/*                        <MenuItem value={'owner'}>{LANG.owner}</MenuItem>*/}
                    {/*                        <MenuItem value={'viewer'}>{LANG.viewer}</MenuItem>*/}
                    {/*                        <MenuItem value={'controller'}>{LANG.controller}</MenuItem>*/}
                    {/*                    </Select>*/}
                    {/*                </FormControl>*/}
                    {/*            </div>*/}
                    {/*        </div>*/}
                    {/*    </Card>*/}
                    {/*</div>*/}
                    <div className="my-btn">
                        <Button onClick={submitHandler} variant="contained" color="primary">
                            {loading ? <WhiteSpinner /> : 'Create'}
                        </Button>
                        <Button
                            onClick={() => {
                                props.onClose();
                                resetValue();
                            }}
                            variant="contained"
                            color="default"
                        >
                            Cancel
                        </Button>
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
