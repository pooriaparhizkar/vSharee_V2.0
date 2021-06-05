import React, { useEffect, useState } from 'react';
import { GroupType, ReduxState } from 'interface';
import { connect, ConnectedProps } from 'react-redux';
import './joinGroupModal.style.scss';
import { Modal } from 'react-bootstrap';
import { JoinGroupModalProps } from './joinGroupModal.interface';
import { get, post, responseValidator } from '../../../scripts/api';
import { APIPath, navigationAnim, RoutePath } from '../../../data';
import { toast } from 'react-toastify';
import { Button, CircularProgress } from '@material-ui/core';
import AlphabetPicture from '../../../utilities/component/alphabetPhoto/alphabetPhoto.index';
import WhiteSpinner from '../../../utilities/component/whiteSpinner/whiteSpinner.index';
import { useHistory } from 'react-router-dom';
const JoinGroupModal: React.FC<ConnectedProps<typeof connector> & JoinGroupModalProps> = function (
    props: ConnectedProps<typeof connector> & JoinGroupModalProps,
) {
    const LANG = props.text.components;
    const [data, setData] = useState<GroupType | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(false);
    const history = useHistory();
    const [isMember, setIsMember] = useState<boolean>();
    useEffect(() => {
        if (props.id) {
            setData(undefined);
            get<GroupType>(APIPath.groups.detail(props.id)).then((res) => {
                if (responseValidator(res.status) && res.data) {
                    //console.log(data?.members.filter((item) => item === props.userData?.username));
                    setData(res.data);
                    setIsMember(res.data?.members.filter((item) => item === props.userData?.username)?.length !== 0);
                } else toast.error('Something went wrong');
            });
        }
    }, [props.id]);
    function goToGroup() {
        props.onClose();
        document.body.classList.add(navigationAnim);
        setTimeout(() => {
            document.body.classList.remove(navigationAnim);
            history.push(RoutePath.group(data!.groupid));
        }, 500);
    }
    function submitHandler() {
        if (isMember) {
            goToGroup();
        } else {
            setLoading(true);
            const body = { the_group: data?.groupid };

            post<any>(APIPath.groups.join, body).then((res) => {
                setLoading(false);
                if (responseValidator(res.status)) {
                    if (data?.privacy === 0) {
                        toast.success('You joined this group successfully');
                        props.onClose();
                        goToGroup();
                    } else {
                        toast.success('Join request sent');
                        props.onClose();
                    }
                } else toast.error('Something went wrong');
            });
        }
    }

    return (
        <Modal className="vsharee-join-group-modal" show={props.show} onHide={props.onClose}>
            <div className="my-container">
                {data ? (
                    <div className="context">
                        <div className="image-container">
                            {data.photo ? (
                                <img src={data.photo_path} alt="fakePic" />
                            ) : (
                                <AlphabetPicture size={'large'} title={data.title} type={'square'} />
                            )}
                        </div>
                        <div className="name">
                            <h2>{data.title}</h2>
                            <h6>#{data.groupid}</h6>
                        </div>
                        <p>{data.describtion}</p>
                        <div className="my-btn">
                            <Button onClick={submitHandler} variant="contained" color="primary">
                                {loading ? (
                                    <WhiteSpinner />
                                ) : isMember ? (
                                    'Enter group'
                                ) : data.privacy === 0 ? (
                                    'Join now !'
                                ) : (
                                    'Request to Join'
                                )}
                            </Button>
                            <Button onClick={() => props.onClose()} variant="contained" color="default">
                                Cancel
                            </Button>
                        </div>
                    </div>
                ) : (
                    <CircularProgress />
                )}
            </div>
        </Modal>
    );
};

const mapStateToProps = (state: ReduxState) => ({
    text: state.language,
    userData: state.userData,
});

const connector = connect(mapStateToProps);
export default connector(JoinGroupModal);
