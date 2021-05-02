import React, {useEffect, useState} from 'react';
import { ReduxState } from 'interface';
import { connect, ConnectedProps } from 'react-redux';
import './myGroups.style.scss';
import fakePic from "../../../assets/images/dashboard/fakepic.jpg";
import {get, responseValidator} from "../../../scripts/api";
import {APIPath} from "../../../data";
import {toast} from "react-toastify";

const MyGroupsList: React.FC<ConnectedProps<typeof connector>> = function (props: ConnectedProps<typeof connector>) {
    const [data,setData] = useState<any>(undefined)
    useEffect(()=>{
    get(APIPath.groups.my).then(result => {
        if(responseValidator(result.status)){
            console.log(result.data)
            setData(result.data)

        }
        else{
            toast.error('Something went wrong ')
        }
    })

    },[])


    return (
        <div className="vsharee-dashboard-my-groups">
            <div className={'top'}>
                    <div className="top-in">
                        <h3>My Groups</h3>
                        <div className="index">

                            {
                                data && data.map((item: any, index: any) => <div key={index} className="items-top">
                                        <div className="items-top-left">
                                            <img src={fakePic} alt="fakePic"/>
                                        </div>
                                        <div className="items-top-right">
                                            <p>{
                                                item.title
                                            }</p>
                                        </div>
                                    </div>
                                )
                            }

                        </div>
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
export default connector(MyGroupsList);
