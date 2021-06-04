import React, { useEffect, useRef, useState } from 'react';
import { GroupPrivacy, ReduxState } from 'interface';
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
import { del, get, patch, post, responseValidator } from '../../../scripts/api';
import { APIPath, navigationAnim, RoutePath } from '../../../data';
import { toast } from 'react-toastify';
import { getMyGroups } from '../../vsharee.script';
import { creategroup } from '../../../index';
import WhiteSpinner from '../../../utilities/component/whiteSpinner/whiteSpinner.index';
import { useHistory } from 'react-router-dom';
const CreateGroupModal: React.FC<ConnectedProps<typeof connector> & CreateGroupModalProps> = function (
    props: ConnectedProps<typeof connector> & CreateGroupModalProps,
) {
    const LANG = props.text.components.CreateGroupModal;
    const [privacy, setPrivacy] = useState<'semiPrivate' | 'public' | 'private' | string>(
        props.data ? GroupPrivacy[props.data.privacy] : 'public',
    );
    const [role, setRole] = useState<string>('viewer');
    const [id, setId] = useState<string | undefined>(props.data?.groupid);
    const [name, setName] = useState<string | undefined>(props.data?.title);
    const [description, setDescription] = useState<string | undefined>(props.data?.describtion);
    const [loading, setLoading] = useState<boolean>(false);
    const [imagePrivew, setImagePreview] = useState<any>(props.data?.photo ? props.data.photo_path : undefined);
    const [imageFile, setImageFile] = useState<any>();
    const fileRef = useRef<any>();
    const [isDelete, setIsDelete] = useState<boolean>(false);
    const [contextDie, setContextDie] = useState<boolean>(false);
    const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
    const history = useHistory();
    function isDeleteGroup() {
        setContextDie(true);
        setTimeout(() => {
            setContextDie(false);
            setIsDelete(!isDelete);
        }, 500);
    }
    useEffect(() => {
        if (props.data) {
            setId(props.data.groupid);
            setName(props.data.title);
            setDescription(props.data.describtion);
            setImagePreview(props.data.photo ? props.data.photo_path : undefined);
            setPrivacy(props.data ? GroupPrivacy[props.data.privacy] : 'public');
        }
    }, [props.data]);
    function resetValue() {
        setId(undefined);
        setName(undefined);
        setDescription(undefined);
        setPrivacy('public');
        setImageFile(undefined);
        setImagePreview(undefined);
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
        if (!props.data) {
            post<any>(APIPath.groups.index, body).then((res) => {
                setLoading(false);
                if (responseValidator(res.status)) {
                    if (id && imagePrivew) postPhoto(id);
                    if (!imagePrivew) {
                        creategroup();
                        toast.success('Your group successfully created');
                        getMyGroups(props.dispatch);
                        props.onClose();
                        resetValue();
                    }
                } else {
                    if (res.data.groupid) toast.error(res.data.groupid[0]);
                    else if (res.data.title) toast.error(res.data.title[0]);
                    else if (res.data.describtion) toast.error(res.data.describtion[0]);
                    else toast.error('Something went wrong!');
                }
            });
        } else {
            patch<any>(APIPath.groups.detail(props.data.groupid), body).then((res) => {
                setLoading(false);
                if (responseValidator(res.status)) {
                    if (id && imagePrivew && imageFile) postPhoto(id);
                    if (!imagePrivew || !imageFile) {
                        toast.success('Your group successfully Edited');
                        props.onClose();
                        resetValue();
                    }
                } else {
                    if (res.data.groupid) toast.error(res.data.groupid[0]);
                    else if (res.data.title) toast.error(res.data.title[0]);
                    else if (res.data.describtion) toast.error(res.data.describtion[0]);
                    else toast.error('Something went wrong!');
                }
            });
        }
    }
    function postPhoto(groupID: string) {
        post<any>(APIPath.groups.uploadPhoto(groupID), {}).then((res) => {
            const response = res.data;
            console.log(response);
            const file_upload = imageFile;
            const fd = new FormData();

            fd.append('key', response.upload_photo.fields.key);
            fd.append('AWSAccessKeyId', response.upload_photo.fields.AWSAccessKeyId);
            fd.append('policy', response.upload_photo.fields.policy);
            fd.append('signature', response.upload_photo.fields.signature);
            fd.append('file', file_upload);

            const xhr = new XMLHttpRequest();
            xhr.onload = function () {
                if (xhr.readyState == XMLHttpRequest.DONE) {
                    if (responseValidator(xhr.status)) {
                        get(APIPath.groups.getPhoto(groupID)).then((res) => {
                            if (responseValidator(res.status)) {
                                creategroup();
                                toast.success('Your group successfully created');
                                getMyGroups(props.dispatch);
                                props.onClose();
                                resetValue();
                            } else toast.error('Something went wrong in uploading photo');
                        });
                    } else toast.error('Something went wrong in uploading photo');
                } else toast.error('Something went wrong in uploading photo');
            };
            xhr.open('POST', response.upload_photo.url, true); //MUST BE LAST LINE BEFORE YOU SEND
            xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
            xhr.send(fd);
        });
    }
    function photoHandler(e: any) {
        setImagePreview(URL.createObjectURL(e.target.files[0]));
        setImageFile(e.target.files[0]);
    }

    function deleteHandler() {
        if (props.data) {
            setDeleteLoading(true);
            del(APIPath.groups.detail(props.data?.groupid), {}).then((res) => {
                setDeleteLoading(false);
                if (responseValidator(res.status)) {
                    toast.success('Your group deleted successfully');
                    getMyGroups(props.dispatch);
                    props.onClose();
                    resetValue();
                    document.body.classList.add(navigationAnim);
                    setTimeout(() => {
                        document.body.classList.remove(navigationAnim);
                        history.push(RoutePath.dashboard);
                    }, 500);
                } else toast.error('Something went wrong');
            });
        }
    }

    return (
        <Modal
            className="vsharee-create-group-modal"
            show={props.show}
            onHide={() => {
                props.onClose();
                if (!props.data) {
                    setTimeout(() => {
                        resetValue();
                    }, 500);
                }
            }}
        >
            <div className="my-container">
                {!isDelete ? (
                    <div className={`context ${contextDie ? 'my-die' : ''}`}>
                        <h1>{props.data ? 'Edit your group' : LANG.title}</h1>
                        {!props.data && <h5>{LANG.descriptionHeader}</h5>}
                        <div onClick={() => fileRef.current.click()} className="image-uploader">
                            <input
                                style={{ display: 'none' }}
                                type="file"
                                accept="image/*"
                                ref={fileRef}
                                onChange={(e) => photoHandler(e)}
                                className="input"
                            />
                            {!imagePrivew ? (
                                <React.Fragment>
                                    <i className="material-icons">photo_camera</i>
                                    <p>{LANG.upload}</p>
                                    <div className="icon-plus">
                                        <i className="material-icons">add</i>
                                    </div>
                                </React.Fragment>
                            ) : (
                                <React.Fragment>
                                    <img src={imagePrivew} alt="image-preview" />
                                    <i className="material-icons edit">edit</i>
                                </React.Fragment>
                            )}
                        </div>
                        <div className="my-input">
                            <TextField
                                disabled={!!props.data}
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
                                    <FormControlLabel
                                        value="semiPrivate"
                                        control={<Radio />}
                                        label={LANG.semiPrivate}
                                    />
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
                                    if (!props.data) {
                                        setTimeout(() => {
                                            resetValue();
                                        }, 500);
                                    }
                                }}
                                variant="contained"
                                color="default"
                            >
                                Cancel
                            </Button>
                        </div>
                        {props.data && (
                            <p onClick={isDeleteGroup} className="delete-group">
                                Delete the group
                            </p>
                        )}
                    </div>
                ) : (
                    <div className={`context ${contextDie ? 'my-die' : ''}`}>
                        <h5 style={{ marginTop: '0' }}>are you sure you want to delete this group ? </h5>
                        <div className="my-btn">
                            <Button onClick={deleteHandler} variant="contained" color="primary">
                                {deleteLoading ? <WhiteSpinner /> : 'Yes'}
                            </Button>
                            <Button onClick={isDeleteGroup} variant="contained" color="default">
                                No
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </Modal>
    );
};

const mapStateToProps = (state: ReduxState) => ({
    text: state.language,
});

const connector = connect(mapStateToProps);
export default connector(CreateGroupModal);
