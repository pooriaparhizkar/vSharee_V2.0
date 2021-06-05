import React from 'react';
import { HeaderLang } from './Headers.lang';
import 'bootstrap/dist/css/bootstrap.min.css';
import VshareeLogo from '../../../assets/images/profile/vshareeLogo.png';
import './Header.scss';
import TextField from '@material-ui/core/TextField';
import { Accordion, Dropdown } from 'react-bootstrap';
import { authToken } from '../../../scripts/storage';
import { setAuth, setIsEdit, setUserData, USER_DATA } from '../../../redux/actions';
import { AuthStatus, GroupType, ReduxState, UserData } from '../../../interface';
import { connect } from 'react-redux';
import { APIPath, navigationAnim, RoutePath } from '../../../data';
import { Link, useHistory } from 'react-router-dom';
import CreateGroupModal from '../createGroupModal/createGroupModal.index';
import { get, responseValidator } from '../../../scripts/api';
import { Button, CircularProgress } from '@material-ui/core';
import emptyProfilePhoto from '../../../assets/images/fakeimage.svg';
import EditProfile from '../editProfile/editProfile.index';
import WhiteSpinner from '../../../utilities/component/whiteSpinner/whiteSpinner.index';
import Logo from '../../../assets/images/landing/logo.png';
import AlphabetPicture from '../../../utilities/component/alphabetPhoto/alphabetPhoto.index';
import JoinGroupModal from '../joinGroupModal/joinGroupModal.index';

class Headers extends React.Component<any, any> {
    searchResultRef: React.RefObject<HTMLDivElement>;

    constructor(props: any) {
        super(props);
        this.state = {
            hiddentextField: true,
            isCreateGroupModal: false,
            isJoinGroupModal: false,
            searchTerm: null,
            isLoadingSearch: true,
            searchResult: [],
            searchResult2: [],
            idSelected: undefined,
        };
        this.searchResultRef = React.createRef();
        this.logoutHandler = this.logoutHandler.bind('ss');
        this.onClickOutSide = this.onClickOutSide.bind(this);
    }

    showInput = (txt: string) => {
        if (txt === 'mob') {
            this.setState({
                hiddentextField: !this.state.hiddentextField,
            });
        }
    };
    clickOnOthers = () => {
        if (!this.state.hiddentextField) {
            this.setState({
                hiddentextField: !this.state.hiddentextField,
            });
        }
    };

    logoutHandler(item: any) {
        document.body.classList.add(navigationAnim);
        setTimeout(() => {
            document.body.classList.remove(navigationAnim);
            authToken.remove();
            item.dispatch(setAuth(AuthStatus.isInValid));
        }, 500);
    }

    profileSettingHandler(item: any) {
        item.dispatch(setIsEdit(true));
    }

    onSearchChangeHandler(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {
        this.setState({ isLoadingSearch: true });
        this.setState({ searchTerm: e.target.value });
        get<UserData[]>(APIPath.user.find, { search: e.target.value }).then((res) => {
            // this.setState({ isLoadingSearch: false });
            if (responseValidator(res.status)) {
                this.setState({ searchResult: res.data });
            }
        });
        get<GroupType[]>(APIPath.groups.index, { search: e.target.value }).then((res) => {
            this.setState({ isLoadingSearch: false });
            if (responseValidator(res.status)) {
                this.setState({ searchResult2: res.data });
            }
        });
    }

    private onClickOutSide(event: any) {
        // console.log(this.searchResultRef);
        if (this.searchResultRef.current && !this.searchResultRef.current.contains(event.target)) {
            this.setState({ searchResult: [], isLoadingSearch: true, searchTerm: '' });
        }
    }

    componentDidMount() {
        document.addEventListener('click', this.onClickOutSide, { passive: true });
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.onClickOutSide);
    }

    render() {
        return (
            <div className="row main-div-header">
                <JoinGroupModal
                    id={this.state.idSelected}
                    show={this.state.isJoinGroupModal}
                    onClose={() => {
                        this.setState({ isJoinGroupModal: false, idSelected: undefined });
                    }}
                />
                <EditProfile />
                <CreateGroupModal
                    show={this.state.isCreateGroupModal}
                    onClose={() => this.setState({ isCreateGroupModal: false })}
                />
                <div
                    style={{ cursor: 'pointer' }}
                    className="col-md-3 col-4 logo-div"
                    onClick={() => {
                        this.clickOnOthers();
                        document.body.classList.add(navigationAnim);
                        window.location.replace(RoutePath.dashboard);
                        setTimeout(() => {
                            document.body.classList.remove(navigationAnim);
                        }, 500);
                    }}
                >
                    <img src={VshareeLogo} alt="" />
                    <h1>{HeaderLang.body.sharee}</h1>
                </div>
                <div hidden={this.state.hiddentextField} className="col-6 input-main-div ">
                    <div ref={this.searchResultRef} className="search-input">
                        <TextField
                            InputProps={{
                                className: 'input-search ',
                            }}
                            value={this.state.searchTerm}
                            autoComplete="off"
                            id="searchInp"
                            placeholder="Search user, groups , …"
                            onChange={(e) => {
                                this.onSearchChangeHandler(e);
                            }}
                        />
                        <div
                            className={`search-result-box  ${
                                this.state.searchTerm !== '' && this.state.searchTerm ? 'open' : ''
                            }`}
                        >
                            {this.state.isLoadingSearch ? (
                                <div className="loader">
                                    <CircularProgress />
                                </div>
                            ) : this.state.searchResult.length !== 0 || this.state.searchResult2.length !== 0 ? (
                                <React.Fragment>
                                    <label>Groups</label>
                                    {this.state.searchResult2.length !== 0 ? (
                                        this.state.searchResult2.map((item: GroupType, index: number) => (
                                            <div
                                                onClick={() =>
                                                    this.setState({
                                                        isJoinGroupModal: true,
                                                        idSelected: item.groupid,
                                                        searchResult: [],
                                                        isLoadingSearch: true,
                                                        searchTerm: '',
                                                    })
                                                }
                                                key={index}
                                                className="items-group"
                                            >
                                                {item.photo ? (
                                                    <img src={item.photo_path} alt="fakePic" />
                                                ) : (
                                                    <AlphabetPicture
                                                        size={'small'}
                                                        title={item.title}
                                                        type={'square'}
                                                    />
                                                )}
                                                <p>{item.title}</p>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="not-found">No groups found</p>
                                    )}
                                    <label>Users</label>
                                    {this.state.searchResult.length !== 0 ? (
                                        this.state.searchResult.map((item: UserData, index: number) => (
                                            <div key={index} className="items-user">
                                                <img src={item.photo ? item.photo_path : Logo} alt="gp-photo" />
                                                <p>{item.username}</p>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="not-found">No user founds</p>
                                    )}
                                </React.Fragment>
                            ) : (
                                <p className="not-found">no result found</p>
                            )}
                        </div>
                    </div>

                    <i className="material-icons" onClick={() => this.showInput('mob')}>
                        search
                    </i>
                </div>
                <div
                    hidden={this.state.hiddentextField}
                    className="col-2 input-main-div-mobile "
                    onClick={this.clickOnOthers}
                />

                <div
                    className="col-md-3 col-3 input-main-div"
                    hidden={!this.state.hiddentextField}
                    onClick={this.clickOnOthers}
                >
                    <i className="material-icons  d-none d-md-block " onClick={() => this.showInput('desck')}>
                        search
                    </i>
                    <i className="material-icons d-md-none d-xs-block" onClick={() => this.showInput('mob')}>
                        search
                    </i>
                    <div ref={this.searchResultRef} className="search-input">
                        <TextField
                            InputProps={{
                                className: 'input-search d-none d-md-block',
                            }}
                            value={this.state.searchTerm}
                            autoComplete="off"
                            id="searchInp"
                            placeholder="Search user, groups , …"
                            onChange={(e) => {
                                this.onSearchChangeHandler(e);
                            }}
                        />
                        <div
                            className={`search-result-box d-none d-md-block ${
                                this.state.searchTerm !== '' && this.state.searchTerm ? 'open' : ''
                            }`}
                        >
                            {this.state.isLoadingSearch ? (
                                <div className="loader">
                                    <CircularProgress />
                                </div>
                            ) : this.state.searchResult.length !== 0 || this.state.searchResult2.length !== 0 ? (
                                <React.Fragment>
                                    <label>Groups</label>
                                    {this.state.searchResult2.length !== 0 ? (
                                        this.state.searchResult2.map((item: GroupType, index: number) => (
                                            <div
                                                onClick={() =>
                                                    this.setState({
                                                        isJoinGroupModal: true,
                                                        idSelected: item.groupid,
                                                        searchResult: [],
                                                        isLoadingSearch: true,
                                                        searchTerm: '',
                                                    })
                                                }
                                                key={index}
                                                className="items-group"
                                            >
                                                {item.photo ? (
                                                    <img src={item.photo_path} alt="fakePic" />
                                                ) : (
                                                    <AlphabetPicture
                                                        size={'small'}
                                                        title={item.title}
                                                        type={'square'}
                                                    />
                                                )}
                                                <p>{item.title}</p>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="not-found">No groups found</p>
                                    )}
                                    <label style={{ marginTop: '12px' }}>Users</label>
                                    {this.state.searchResult.length !== 0 ? (
                                        this.state.searchResult.map((item: UserData, index: number) => (
                                            <div
                                                onClick={() => {
                                                    document.body.classList.add(navigationAnim);
                                                    window.location.replace(RoutePath.profileDetail(item.username));
                                                    setTimeout(() => {
                                                        document.body.classList.remove(navigationAnim);
                                                    }, 500);
                                                }}
                                                key={index}
                                                className="items-user"
                                            >
                                                <img src={item.photo ? item.photo_path : Logo} alt="gp-photo" />
                                                <p>{item.username}</p>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="not-found">No user founds</p>
                                    )}
                                </React.Fragment>
                            ) : (
                                <p className="not-found">no result found</p>
                            )}
                        </div>
                    </div>
                </div>
                <div
                    className="col-md-2 col-1 icon-main-div"
                    hidden={!this.state.hiddentextField}
                    onClick={this.clickOnOthers}
                >
                    <Button
                        onClick={() => {
                            this.setState({ isCreateGroupModal: true });
                        }}
                    >
                        <i style={{ marginRight: '-18px' }} className="material-icons ">
                            add_circle_outlined
                        </i>
                        <h6 style={{ marginLeft: '6px' }} className="d-none d-md-block">
                            {HeaderLang.body.stream}
                        </h6>
                    </Button>
                </div>

                <div className="col-4 user-main-div" hidden={!this.state.hiddentextField} onClick={this.clickOnOthers}>
                    <Dropdown className="dropdownClasss">
                        <Dropdown.Toggle variant="none" className="dropdownToggleClasss">
                            <img
                                style={{ backgroundColor: 'black' }}
                                src={this.props.userData.photo ? this.props.userData.photo_path : Logo}
                                alt="gp-photo"
                            />
                            <h6 className="d-none d-md-block">{this.props.userData && this.props.userData.username}</h6>
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item>
                                <div
                                    onClick={() => {
                                        document.body.classList.add(navigationAnim);
                                        window.location.replace(RoutePath.profileDetail(this.props.userData.username));
                                        setTimeout(() => {
                                            document.body.classList.remove(navigationAnim);
                                        }, 500);
                                    }}
                                    className="dropdowm-item"
                                >
                                    <i className="material-icons">account_circle</i>
                                    <h6>{HeaderLang.body.profile}</h6>
                                </div>
                            </Dropdown.Item>
                            <Dropdown.Item>
                                <div
                                    onClick={() => this.profileSettingHandler(this.props.store)}
                                    className="dropdowm-item"
                                >
                                    <i className="material-icons">settings</i>
                                    <h6>{HeaderLang.body.setting}</h6>
                                </div>
                            </Dropdown.Item>
                            <Dropdown.Item>
                                <div onClick={() => this.logoutHandler(this.props.store)} className="dropdowm-item">
                                    <i className="material-icons">logout</i>
                                    <h6>{HeaderLang.body.logout}</h6>
                                </div>
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <i
                        onClick={() => {
                            document.body.classList.add(navigationAnim);
                            window.location.replace(RoutePath.directMessage);
                            setTimeout(() => {
                                document.body.classList.remove(navigationAnim);
                            }, 500);
                        }}
                        className="material-icons "
                    >
                        mail
                    </i>

                    <i className="material-icons paddingi">notifications</i>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: ReduxState) => ({
    // direction: state.direction,
    isAuth: state.authStatus,
    userData: state.userData,
    //language: state.language,
});

const connector = connect(mapStateToProps);
export default connector(Headers);
