import React from 'react';
import { ReduxState } from 'interface';
import { connect, ConnectedProps } from 'react-redux';
import './createGroupModal.style.scss';
import { Modal } from 'react-bootstrap';
import { CreateGroupModalProps } from './createGroupModal.interface';

const CreateGroupModal: React.FC<ConnectedProps<typeof connector> & CreateGroupModalProps> = function (
    props: ConnectedProps<typeof connector> & CreateGroupModalProps,
) {
    const LANG = props.text.components.CreateGroupModal;
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
