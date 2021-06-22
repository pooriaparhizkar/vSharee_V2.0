import React, { useEffect } from 'react';
import { ReduxState } from 'interface';
import { connect, ConnectedProps } from 'react-redux';
import './onlineMember.style.scss';
import { get, responseValidator } from '../../../scripts/api';
import { APIPath } from '../../../data';
import Logo from '../../../assets/images/landing/logo.png';

const GroupOnlineMembers: React.FC<ConnectedProps<typeof connector> & { id: number }> = function (
    props: ConnectedProps<typeof connector> & { id: number },
) {
    useEffect(() => {
        get<any>(APIPath.groups.onlineMembers(props.id)).then((res) => {
            if (responseValidator(res.status)) {
                console.log(res.data);
            } else console.log('ss');
        });
    }, []);
    return (
        <div className="vsharee-group-online-members">
            <div className="items">
                <img src={props.userData!.photo ? props.userData!.photo_path : Logo} alt="gp-photo" />
                <div className="info">
                    <p>{props.userData!.username}</p>
                    <label>Owner</label>
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
export default connector(GroupOnlineMembers);
