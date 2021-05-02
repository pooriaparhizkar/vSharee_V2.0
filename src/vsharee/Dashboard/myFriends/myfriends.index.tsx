import React, {useEffect, useState} from 'react';
import { ReduxState } from 'interface';
import { connect, ConnectedProps } from 'react-redux';
import fakePic from 'assets/images/dashboard/fakepic.jpg';
import './myfriends.style.scss';
import {get, responseValidator} from "../../../scripts/api";
import {APIPath} from "../../../data";
import {toast} from "react-toastify";


const MyFriendsList: React.FC<ConnectedProps<typeof connector>> = function (props: ConnectedProps<typeof connector>) {


    const [offline,setOffline] = useState<any>(undefined)
    const [online,setOnline] = useState<any>(undefined)

    useEffect(()=>{
    get(APIPath.user.offline).then(res => {
        if(responseValidator(res.status)){
            console.log(res.data)
            setOffline(res.data)

        }
        else{
            toast.error('Something went wrong ')
        }
    })

        get(APIPath.user.online).then(result => {
        if(responseValidator(result.status)){
            console.log(result.data)
            setOnline(result.data)

        }
        else{
            toast.error('Something went wrong ')
        }
    })



    },[])

    return (
        <div className="vsharee-dashboard-my-friends">

                <div className={'rightcolumn-in'}>
                    <h3>My Friends</h3>
                    <div className={'context'}>


                        {
                            offline && offline.map((item: any, index: any) => <div key={index} className="items">
                                    <div className="left-items">
                                        <img src={fakePic} alt="fakePic"/>
                                        <i className="material-icons-outlined circle">circle</i>
                                    </div>
                                    <div className="right-items">
                                        <p>{
                                            item.username
                                        }</p>
                                        <span>watching movie</span>
                                    </div>
                                </div>
                            )
                        }


                        {
                            online && online.map((item: any, index: any) => <div key={index} className="items online">
                                    <div className="left-items">
                                        <img src={fakePic} alt="fakePic"/>
                                        <i className="material-icons-outlined circle">circle</i>
                                    </div>
                                    <div className="right-items">
                                        <p>{
                                            item.username
                                        }</p>
                                        <span>watching movie</span>
                                    </div>
                                </div>
                            )
                        }





                    </div>
                </div>



        </div>
    );
};

const mapStateToProps = (state: ReduxState) => ({
    text: state.language,
    isEdit: state.isEdit,
});

const connector = connect(mapStateToProps);
export default connector(MyFriendsList);
