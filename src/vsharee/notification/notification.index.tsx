import React, { useEffect, useState } from 'react';
import { NotificationType, ReduxState, UserData } from 'interface';
import { connect, ConnectedProps } from 'react-redux';
import './notification.style.scss';
import { get, post, responseValidator } from "../../scripts/api";
import { APIPath } from "../../data";
import { toast } from "react-toastify";


const Notification: React.FC<ConnectedProps<typeof connector>> = function (props: ConnectedProps<typeof connector>) {

    const [notification, setNotification] = useState<any>([]);
    const [firendReqCount, setfirendReqCount] = useState<any>("0")
    const [groupReqCount, setgroupReqCount] = useState<any>("0")
    const [groupNotifCount, setgroupNotifCount] = useState<any>("0")
    const [groupAlarmCount, setgroupAlarmCount] = useState<any>("0")
    const [previewNotif, setpreviewNotif] = useState<any>(true)
    const [detailNotiffriendReq, setdetailNotiffriendReq] = useState<any>(false)
    const [countFollowReqview,setcountFollowReqview]=useState<any>(false)
    const [followReqlist,setfollowReqlist]=useState<any>([])
    const [groupnotice,setgroupnotice]=useState<any>([])
    const [groupnoticeview,setgroupnoticeview]=useState<any>(false)
    useEffect(() => {
        get<any>(APIPath.notification.index).then((res) => {
            if (responseValidator(res.status) && res.data) {

                console.log(res.data)
                const notifarray = []
                for (let i = 0; i < res.data.length; i++) {
                    if (res.data[i].notification_type === NotificationType.GroupRequestnumber)
                        setgroupReqCount(res.data[i].text_preview)
                    else if (res.data[i].notification_type === NotificationType.FollowRequestNumber)
                        setfirendReqCount(res.data[i].text_preview)
                    else if (res.data[i].notification_type === NotificationType.GroupNotifnumber)
                        setgroupNotifCount(res.data[i].text_preview)
                    else if (res.data[i].notification_type === NotificationType.Groupalarmnumber)
                        setgroupAlarmCount(res.data[i].text_preview)
                    else {

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
        if(props.userData?.is_private){
            setcountFollowReqview(true)
               get<any>(APIPath.notification.followReq).then((res) => {
            if (responseValidator(res.status) && res.data) {

                console.log(res.data)
        setfollowReqlist(res.data.result)

            } else {
                toast.error('Something went wrong ');
            }
        });
        }

              get<any>(APIPath.notification.groupnotice).then((res) => {
            if (responseValidator(res.status) && res.data) {

                console.log(res.data)
            
        setgroupnotice(res.data)

            } else {
                toast.error('Something went wrong ');
            }
        });
     
    }, []);

    function clickonfriendReq() {
        setpreviewNotif(false)
        setdetailNotiffriendReq(true)
    }
    function clickonbackArrow(){
        setpreviewNotif(true)
        setdetailNotiffriendReq(false)
        setgroupnoticeview(false)
    }
    function clickgroupnotice(){
        if(groupNotifCount!=="0"){
                setpreviewNotif(false)
        setgroupnoticeview(true) 
        }
   
    }
    function answerRequest(id:any,type:any){
        console.log('123')
        post<any>(APIPath.notification.acceotordecline(id,type),{}).then((res:any) => {
            if (responseValidator(res.status) && res.data) {
                toast.error(res.data.Success);
                console.log(res.data)
     

            } else {
                toast.error('Something went wrong ');
            }
        });
    }
    return (

        <div className="vsharee-notification">
            <div hidden={!previewNotif}>
                <div hidden={!countFollowReqview} className="friends-list" onClick={clickonfriendReq}>

                    <p>Friend Requests </p>
                    <i />
                    <span>{firendReqCount}</span>



                </div>
                <div className="groups">
                    <p>Group Requests </p>
                    <i />
                    <span>{groupReqCount}</span>

                </div>
                <div onClick={clickgroupnotice} className="groups">
                    <p>Group Notif </p>
                    <i />
                    <span>{groupNotifCount}</span>

                </div>
                <div onClick={clickgroupnotice} className="groups">
                    <p>Group Added </p>
                    <i />
                    <span>{groupAlarmCount}</span>

                </div>
                {notification.map((index: any) => (

                    <div key={index.id} className="group-accept-join">
                        <p>{index.text_preview}</p>

                    </div>
                ))}
            </div>
            <div hidden={!detailNotiffriendReq}>
            <span style={{cursor:'pointer'}} onClick={clickonbackArrow} className="material-icons-outlined">
arrow_back
</span>
               
                    {followReqlist.map((index:any)=>(
                      <div key={index.id} className="friends-list" >   
                       <p>{index.sender} want Follow You </p>
                    <i />
                    <span style={{ color: 'green' }} className="material-icons-outlined"onClick={()=>answerRequest(index.sender,'acc')}>
                        check_circle
                    </span>
                    <span style={{ color: 'red' }} className="material-icons-outlined"onClick={()=>answerRequest(index.sender,'dec')}>
                        highlight_off
                    </span>
                </div>
                    ))}
                   
             
            </div>
            <div hidden={!groupnoticeview}>
            <span style={{cursor:'pointer'}} onClick={clickonbackArrow} className="material-icons-outlined">
arrow_back
</span>
               
                    {groupnotice.map((index:any)=>(
                   
                      <div key={index.id} className="friends-list" >   
                       <p>{index.sender} want Follow You </p>
                    <i />
                    <i style={{ color: 'green' }} className="material-icons-outlined" >
                        check_circlecheck_circle
                    </i>
                    <i style={{ color: 'red' }} className="material-icons-outlined" >
                        highlight_off
                    </i>
                </div>
                    ))}
                   
             
            </div>




        </div>


    );
};


const mapStateToProps = (state: ReduxState) => ({
    text: state.language,
    userData:state.userData
});

const connector = connect(mapStateToProps);
export default connector(Notification);
