import React, {useEffect, useState} from 'react';
import {NotificationType, ReduxState, UserData} from 'interface';
import { connect, ConnectedProps } from 'react-redux';
import './notification.style.scss';
import {get, responseValidator} from "../../scripts/api";
import {APIPath} from "../../data";
import {toast} from "react-toastify";


const Notification: React.FC<ConnectedProps<typeof connector>> = function (props: ConnectedProps<typeof connector>) {

    const [notification, setNotification] = useState<UserData[] | undefined>(undefined);

    useEffect(() => {
            get<any>(APIPath.notification.index).then((res) => {
            if (responseValidator(res.status) && res.data) {
                setNotification(res.data);
                console.log(res.data)
                // if (NotificationType.Follow == res.data){
                //
                // }

            } else {
                toast.error('Something went wrong ');
            }
        });

    }, []);



    return (

            <div className="vsharee-notification">
                            <div className="friends-list">

                                <p>Friend Requests </p>
                                <i/>
                                <span>15</span>



                            </div>
                            <div className="groups">
                                <p>Group Requests </p>
                                <i/>
                                <span>15</span>

                            </div>
                            <div className="group-accept-join">
                                <p>Group G1 Accepted Join Request</p>

                            </div>
                            <div className="user-accept-request">
                                <p>User U1 Accepted your Request</p>
                            </div>
                            <div className="start-follow">
                                <p>User U1 Started Following You</p>
                            </div>
                        </div>


    );
};


const mapStateToProps = (state: ReduxState) => ({
    text: state.language,
});

const connector = connect(mapStateToProps);
export default connector(Notification);
