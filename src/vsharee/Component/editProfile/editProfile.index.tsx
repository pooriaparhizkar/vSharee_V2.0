import React, { useState, useEffect } from 'react';
import { AuthStatus, ReduxState } from 'interface';
import { connect, ConnectedProps } from 'react-redux';
import './editProfile.style.scss';
import { Modal } from 'react-bootstrap';
import { get, responseValidator, post, del, put } from '../../../scripts/api';
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
import Logo from '../../../assets/images/landing/logo.png';
import fakeImage from '../../../assets/images/profile/fakeimage.jpg';
import { setAuth, setIsEdit } from '../../../redux/actions';
import { APIPath, RoutePath } from '../../../data';
import WhiteSpinner from '../../../utilities/component/whiteSpinner/whiteSpinner.index';
import { toast } from 'react-toastify';
import { getUser } from '../../vsharee.script';

const EditProfile: React.FC<ConnectedProps<typeof connector>> = function (props: ConnectedProps<typeof connector>) {
    const LANG = props.text.components.CreateGroupModal;
    const [privacy, setPrivacy] = useState<string>('false');
    const [firstname, setfirstname] = useState<string | undefined>(props.userData?.firstname);
    const [lastname, setlastname] = useState<string | undefined>(props.userData?.lastname);
    const [bio, setbio] = useState<string | undefined>(props.userData?.bio);
    const [photourl, setphotourl] = useState<string | undefined>();
    const [resdata, setresdata] = useState<any>(props.userData);
    const [imagePreview, setImagePreview] = useState(props.userData?.photo ? props.userData.photo_path : undefined);
    const [loading, setLoading] = useState<boolean>(false);
    function openinp() {
        document.getElementById('photoinp')?.click();
    }

    function get_photo() {
        const location = window.location.href;
        const loc = location.split('/');
        get<any>(APIPath.profile.edit_profile(props.userData!.username)).then((res) => {
            console.log(res.data);
            if (responseValidator(res.status)) {
                setphotourl(res.data.photo_url);
                if (res.data.is_private) setPrivacy('true');
                else setPrivacy('false');
                // this.setState({ followingCount: res.data.followings_count, followingList: res.data.result });
            }
            // else{
            //     this.setState({
            //         photourl:Logo
            //     })
            // }
        });
    }

    function upload_photo(e: any) {
        const file = e.target.files[0];
        setImagePreview(URL.createObjectURL(e.target.files[0]));
        console.log(file);
        post<any>(APIPath.profile.upload_photo(resdata.username), {}).then((res) => {
            if (responseValidator(res.status) && res.data) {
                const fd = new FormData();

                fd.append('key', res.data.upload_photo.fields.key);
                //  fd.append('acl', 'public-read');
                //fd.append('Content-Type', file.type);
                fd.append('AWSAccessKeyId', res.data.upload_photo.fields.AWSAccessKeyId);
                fd.append('policy', res.data.upload_photo.fields.policy);
                fd.append('signature', res.data.upload_photo.fields.signature);

                fd.append('file', file);

                const xhr = new XMLHttpRequest();

                // xhr.upload.addEventListener("progress", uploadProgress, false);
                // xhr.addEventListener("load", uploadComplete, false);
                // xhr.addEventListener("error", uploadFailed, false);
                // xhr.addEventListener("abort", uploadCanceled, false);

                xhr.open('POST', res.data.upload_photo.url, true); //MUST BE LAST LINE BEFORE YOU SEND
                xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
                xhr.send(fd);
                setTimeout(() => get_photo(), 3000);

                console.log(xhr);
            }
        });
    }

    function editprofile() {
        setLoading(true);
        const body = {
            firstname: firstname,
            lastname: lastname,
            bio: bio,
            is_private: privacy,
        };

        put<any>(APIPath.profile.edit_profile(resdata.username), body).then((res) => {
            console.log(res);
            setLoading(false);
            if (responseValidator(res.status)) {
                toast.success('Your Profile successfully edited');
                props.dispatch(setIsEdit(false));
                getUser(props.dispatch);
            } else toast.error('Something went wrong');
        });
    }

    return (
        <Modal
            className="vsharee-edit-profile-modal"
            show={props.isEdit}
            onHide={() => props.dispatch(setIsEdit(false))}
        >
            <div className="vsharee-edit-profile-component">
                <Card variant="outlined">
                    <div onClick={openinp} className="image-uploader">
                        {!imagePreview ? (
                            <img
                                onError={() => setphotourl(Logo)}
                                src={props.userData?.photo ? props.userData.photo_path : Logo}
                                alt="profile-photo"
                            />
                        ) : (
                            <img src={imagePreview} alt="profile-photo" />
                        )}
                        <input type="file" style={{ display: 'none' }} id="photoinp" onChange={upload_photo}></input>
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
                    <TextField
                        rows={4}
                        multiline={true}
                        label={'bio'}
                        id="outlined-basic bio"
                        variant="outlined"
                        value={bio}
                        onChange={(e) => setbio(e.target.value)}
                    />
                    <div className="my-radio">
                        <FormControl component="fieldset">
                            <FormLabel component="legend">{LANG.privacyTitle}</FormLabel>
                            <RadioGroup value={privacy} onChange={(e) => setPrivacy(e.target.value)}>
                                <FormControlLabel value="false" control={<Radio />} label={LANG.public} />
                                <p className="detail">{LANG.publicDescription}</p>
                                <FormControlLabel value="true" control={<Radio />} label={LANG.private} />
                                <p className="detail">{LANG.privateDescription}</p>
                            </RadioGroup>
                        </FormControl>
                    </div>
                    <div className="my-btn">
                        <Button onClick={() => props.dispatch(setIsEdit(false))} variant="contained" color="default">
                            Cancel
                        </Button>
                        <Button variant="contained" color="primary" onClick={editprofile}>
                            {loading ? <WhiteSpinner /> : 'Edit'}
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
