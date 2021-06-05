import React, {useEffect, useState} from 'react';
import {NotificationType, ReduxState, UserData} from 'interface';
import { connect, ConnectedProps } from 'react-redux';
import './notification.style.scss';
import {get, responseValidator} from "../../scripts/api";
import {APIPath} from "../../data";
import {toast} from "react-toastify";


const Notification: React.FC<ConnectedProps<typeof connector>> = function (props: ConnectedProps<typeof connector>) {

    const [notification, setNotification] = useState<any>([]);
const [firendReqCount,setfirendReqCount]=useState<any>("0")
const [groupReqCount,setgroupReqCount]=useState<any>("0")
const [groupNotifCount,setgroupNotifCount]=useState<any>("0")
    useEffect(() => {
            get<any>(APIPath.notification.index).then((res) => {
            if (responseValidator(res.status) && res.data) {
               
                console.log(res.data)
                const notifarray=[]
for(let i =0;i<res.data.length;i++){
    if(res.data[i].notification_type===NotificationType.GroupRequestnumber)
    setgroupReqCount(res.data[i].text_preview)
    else if(res.data[i].notification_type===NotificationType.FollowRequestNumber)
    setfirendReqCount(res.data[i].text_preview)
    else if(res.data[i].notification_type===NotificationType.GroupNotifnumber)
    setgroupNotifCount(res.data[i].text_preview)
    else{
       
            notifarray.push(res.data[i])
    }

}
console.log(notifarray)
setNotification(notifarray)
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
                                <span>{firendReqCount}</span>



                            </div>
                            <div className="groups">
                                <p>Group Requests </p>
                                <i/>
                                <span>{groupReqCount}</span>

                            </div>
                            <div className="groups">
                                <p>Group Notif </p>
                                <i/>
                                <span>{groupNotifCount}</span>

                            </div>
                            {notification.map((index:any)=>(
                            
                                  <div key={index.id} className="group-accept-join">
                                <p>{index.text_preview}</p>

                            </div> 
                            ))}
                         
                           
                        </div>


    );
};


const mapStateToProps = (state: ReduxState) => ({
    text: state.language,
});

const connector = connect(mapStateToProps);
export default connector(Notification);
