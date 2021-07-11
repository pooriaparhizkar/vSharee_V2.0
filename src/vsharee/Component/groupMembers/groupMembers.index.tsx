import React, { useEffect, useRef, useState } from 'react';
import { GroupType, MembersInGroupType, ReduxState, Roles, UserData } from 'interface';
import { connect, ConnectedProps } from 'react-redux';
import './groupMembers.style.scss';
import { Modal } from 'react-bootstrap';
import { GroupMembersProps } from './groupMembers.interface';
import { get, post, put, responseValidator } from '../../../scripts/api';
import { APIPath, RoutePath } from '../../../data';
import { toast } from 'react-toastify';
import { Card, CircularProgress, FormControl, MenuItem, Select, TextField } from '@material-ui/core';
import Logo from 'assets/images/landing/logo.png';
import DashboardEmptyState from '../../Dashboard/emptyState/emptyState.index';
import { Link, useHistory } from 'react-router-dom';
import useOnBlur from '../../../scripts/useOnBlur';
import ReactTooltip from 'react-tooltip';
import { USER_DATA } from '../../../redux/actions';
const GroupMembersModal: React.FC<ConnectedProps<typeof connector> & GroupMembersProps> = function (
    props: ConnectedProps<typeof connector> & GroupMembersProps,
) {
    const LANG = props.text.components;
    const [data, setData] = useState<MembersInGroupType[]>();
    const [copyData, setCopyData] = useState<MembersInGroupType[]>();
    const [role, setRole] = useState<Roles>(Roles.Viewer);
    const [search, setSearch] = useState<string>();
    const [editSelected, setEditSelected] = useState<any[]>([]);
    const [admin, setAdmin] = useState<string>();
    const [isAdd, setIsAdd] = useState<boolean>(false);
    const [findUser, setFindUser] = useState<UserData[]>([]);
    const [searchLoading, setSearchLoading] = useState<boolean>(false);
    function getData() {
        get<any>(APIPath.groups.preview(props.id)).then((res) => {
            if (responseValidator(res.status) && res.data) {
                setData(res.data['users&permissions']);
                setCopyData(res.data['users&permissions']);
                const temp: any[] = [];
                res.data['users&permissions'].map(() => temp.push(false));
                setEditSelected(temp);
                setAdmin(res.data.group.created_by);
            } else toast.error('Something went wrong');
        });
    }
    useEffect(() => {
        getData();
    }, []);

    function searchHandler(e: any) {
        setSearch(e.target.value);
        if (!isAdd) {
            if (copyData) {
                setData(copyData?.filter((item) => item.member.includes(e.target.value)));
            }
        } else {
            setSearchLoading(true);
            get<UserData[]>(APIPath.user.find, { search: e.target.value }).then((res) => {
                setSearchLoading(false);
                if (responseValidator(res.status) && res.data) {
                    let temp: any;
                    data?.map((item) => {
                        temp = res.data!.filter((item2) => item.member !== item2.username);
                    });
                    setFindUser(temp);
                }
            });
        }
    }

    function changePermission(item: any) {
        const body: any = {
            member: item,
            group: props.id,
        };

        if (role === Roles.Selector) {
            body.chat_permission = true;
            body.choose_video_permission = true;
            body.playback_permission = true;
        }
        if (role === Roles.Controller) {
            body.chat_permission = true;
            body.choose_video_permission = false;
            body.playback_permission = true;
        }
        if (role === Roles.Viewer) {
            body.chat_permission = true;
            body.choose_video_permission = false;
            body.playback_permission = false;
        }
        if (role === Roles.Mute) {
            body.chat_permission = false;
            body.choose_video_permission = false;
            body.playback_permission = false;
        }
        put(APIPath.groups.permissions(props.id, item), body).then((res) => {
            if (responseValidator(res.status)) {
                toast.success('Permission successfully changed');
                setData(undefined);
                setCopyData(undefined);
                getData();
            }
        });
    }

    function addMemberHandler(user: UserData) {
        const body = {
            group: props.id,
            recipient: user.username,
        };
        post(APIPath.groups.invite, body).then((res) => {
            if (responseValidator(res.status)) {
                toast.success('The user successfully added to the group');
                setSearch('');
                setIsAdd(false);
                getData();
            } else toast.error('Something went wrong');
        });
    }

    function removeHandler(member: string) {
        console.log(member);
    }

    return (
        <Modal
            className="vsharee-group-members-modal"
            show={props.show}
            onHide={() => {
                props.onClose();
                setIsAdd(false);
            }}
        >
            <div className="my-container">
                <div className="context">
                    <h1>{isAdd ? 'Add member' : 'Members'}</h1>

                    <div className="items-container">
                        <div className="my-card">
                            <Card variant={'outlined'}>
                                <div className="my-card-inputs">
                                    <TextField
                                        value={search}
                                        onChange={searchHandler}
                                        autoComplete="new-password"
                                        id="standard-basic"
                                        placeholder={'Search'}
                                    />
                                    {props.isAdmin &&
                                        (!isAdd ? (
                                            <i
                                                onClick={() => {
                                                    setIsAdd(true);
                                                    setSearch('');
                                                }}
                                                data-tip
                                                data-for="global"
                                                className="material-icons"
                                            >
                                                person_add
                                            </i>
                                        ) : (
                                            <i
                                                onClick={() => {
                                                    setIsAdd(false);
                                                    setSearch('');
                                                }}
                                                className="material-icons"
                                            >
                                                clear
                                            </i>
                                        ))}
                                    <ReactTooltip id="global" place="right" type={'info'} effect="solid">
                                        <p>Add new member</p>
                                    </ReactTooltip>
                                </div>
                                <div className="context">
                                    {!isAdd ? (
                                        data ? (
                                            data.length !== 0 ? (
                                                data.map((item, index) => (
                                                    <div key={index} className="items">
                                                        <Link to={RoutePath.profileDetail(item.member)} target="_blank">
                                                            <img src={Logo} alt="profile-pic" />
                                                        </Link>

                                                        <p>{item.member}</p>
                                                        {/*{[...editSelected][index] !== false && (*/}
                                                        {/*    <label*/}
                                                        {/*        className="remove"*/}
                                                        {/*        onClick={() => removeHandler(item.member)}*/}
                                                        {/*    >*/}
                                                        {/*        Remove*/}
                                                        {/*    </label>*/}
                                                        {/*)}*/}
                                                        <span className="spacer" />
                                                        {props.isAdmin && (
                                                            <div className="admin-controller">
                                                                {/*<i className="material-icons">delete</i>*/}
                                                                {[...editSelected][index] !== true ? (
                                                                    <i
                                                                        onClick={() => {
                                                                            const temp = [];
                                                                            editSelected.map(() => temp.push(false));
                                                                            temp[index] = true;
                                                                            setEditSelected([...temp]);
                                                                        }}
                                                                        className="material-icons"
                                                                    >
                                                                        edit
                                                                    </i>
                                                                ) : (
                                                                    <i
                                                                        onClick={() => {
                                                                            const temp: any = [];
                                                                            editSelected.map(() => temp.push(false));
                                                                            setEditSelected([...temp]);
                                                                            changePermission(item.member);
                                                                        }}
                                                                        className="check material-icons"
                                                                    >
                                                                        check_circle
                                                                    </i>
                                                                )}
                                                            </div>
                                                        )}
                                                        {[...editSelected][index] !== false ? (
                                                            <FormControl variant="outlined">
                                                                <Select
                                                                    labelId="demo-simple-select-outlined-label"
                                                                    id="demo-simple-select-outlined"
                                                                    value={role}
                                                                    onChange={(e: any) => setRole(e.target.value)}
                                                                >
                                                                    <MenuItem value={Roles.Controller}>
                                                                        {'Controller'}
                                                                    </MenuItem>
                                                                    <MenuItem value={Roles.Selector}>
                                                                        {'Selector'}
                                                                    </MenuItem>
                                                                    <MenuItem value={Roles.Viewer}>{'Viewer'}</MenuItem>
                                                                    <MenuItem value={Roles.Mute}>{'Mute'}</MenuItem>
                                                                </Select>
                                                            </FormControl>
                                                        ) : (
                                                            <label>
                                                                {item.member === admin
                                                                    ? Roles[Roles.Owner]
                                                                    : item.choose_video_permission
                                                                    ? Roles[Roles.Selector]
                                                                    : item.playback_permission
                                                                    ? Roles[Roles.Controller]
                                                                    : !item.chat_permission
                                                                    ? Roles[Roles.Mute]
                                                                    : Roles[Roles.Viewer]}
                                                            </label>
                                                        )}
                                                    </div>
                                                ))
                                            ) : (
                                                <DashboardEmptyState info="No user Found" />
                                            )
                                        ) : (
                                            <CircularProgress />
                                        )
                                    ) : !search || search?.length === 0 ? (
                                        <div className="add-status">
                                            <i className="material-icons">person_add</i>
                                            <p>Search users and add them to the group</p>
                                        </div>
                                    ) : !searchLoading ? (
                                        findUser.length !== 0 ? (
                                            findUser.map((item, index) => (
                                                <div key={index} className="items">
                                                    <Link to={RoutePath.profileDetail(item.username)} target="_blank">
                                                        <img
                                                            src={item.photo ? item.photo_path : Logo}
                                                            alt="profile-pic"
                                                        />
                                                    </Link>

                                                    <p>{item.username}</p>
                                                    <span className="spacer" />
                                                    <i
                                                        onClick={() => addMemberHandler(item)}
                                                        className="material-icons add-icon"
                                                    >
                                                        add
                                                    </i>
                                                </div>
                                            ))
                                        ) : (
                                            <DashboardEmptyState info="No user Found" />
                                        )
                                    ) : (
                                        <CircularProgress />
                                    )}
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

const mapStateToProps = (state: ReduxState) => ({
    text: state.language,
    userData: state.userData,
});

const connector = connect(mapStateToProps);
export default connector(GroupMembersModal);
