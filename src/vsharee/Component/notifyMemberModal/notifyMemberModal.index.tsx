import React, { useState } from 'react';
import { ReduxState } from 'interface';
import { connect, ConnectedProps } from 'react-redux';
import './notifyMemberModal.style.scss';
import { Modal } from 'react-bootstrap';
import { NotifyMemberModalProps } from './notifyMemberModal.interface';
import { Button, TextField } from '@material-ui/core';
import WhiteSpinner from '../../../utilities/component/whiteSpinner/whiteSpinner.index';
import { post, responseValidator } from '../../../scripts/api';
import { APIPath } from '../../../data';
import { toast } from 'react-toastify';

const NotifyMemberModal: React.FC<ConnectedProps<typeof connector> & NotifyMemberModalProps> = function (
    props: ConnectedProps<typeof connector> & NotifyMemberModalProps,
) {
    const [message, setMessage] = useState<string>();
    const [loading, setLoading] = useState<boolean>(false);

    function sendHandler() {
        setLoading(true);
        post(APIPath.groups.notifyMembers, { group: props.id, notice: message }).then((res) => {
            setLoading(false);
            if (responseValidator(res.status)) {
                toast.success('Your message successfully sent to your members');
                props.onClose();
            } else toast.error('Something went wrong , please try again');
        });
    }

    return (
        <Modal
            className="vsharee-create-group-modal"
            show={props.show}
            onHide={() => {
                props.onClose();
            }}
        >
            <div className="my-container">
                <div className={`context`}>
                    <h1>Notify members</h1>
                    <h5>Write your message to notify your members about the Big news!</h5>
                    <TextField
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        label="Message"
                        id="outlined-basic"
                        variant="outlined"
                        rows={4}
                        multiline={true}
                    />
                    <div className="my-btn">
                        <Button onClick={sendHandler} variant="contained" color="primary">
                            {loading ? <WhiteSpinner /> : 'Send'}
                        </Button>
                        <Button onClick={props.onClose} variant="contained" color="default">
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
export default connector(NotifyMemberModal);
