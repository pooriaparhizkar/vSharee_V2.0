import React, { useEffect } from 'react';
import { ReduxState } from 'interface';
import { connect, ConnectedProps } from 'react-redux';
import './onlineMember.style.scss';
import { get, responseValidator } from '../../../scripts/api';
import { APIPath } from '../../../data';

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
            {props.id}
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
