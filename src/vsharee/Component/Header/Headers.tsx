import React from 'react';
import { HeaderLang } from './Headers.lang';
import 'bootstrap/dist/css/bootstrap.min.css';
import VshareeLogo from '../../../assets/images/profile/vshareeLogo.png';
import './Header.scss';
import TextField from '@material-ui/core/TextField';
import { Dropdown, Button } from 'react-bootstrap';
import { authToken } from '../../../scripts/storage';
import { setAuth } from '../../../redux/actions';
import { AuthStatus, ReduxState } from '../../../interface';
import { connect } from 'react-redux';
import { RoutePath } from '../../../data';
import { Link } from 'react-router-dom';
import CreateGroupModal from '../createGroupModal/createGroupModal.index';

class Headers extends React.Component<any, any> {
    constructor(props: any) {
        // console.log(props.store);
        super(props);
        this.state = {
            hiddentextField: true,
            isCreateGroupModal: false,
        };
        // console.log(props.store);
        this.logoutHandler = this.logoutHandler.bind('ss');
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
        authToken.remove();
        //vShareeInitialize(props);
        //    props.dispatch(setUserData(null));
        // console.log(this.props);
        item.dispatch(setAuth(AuthStatus.inValid));
        // console.log(item);
    }
    render() {
        return (
            <div className="row main-div-header">
                <CreateGroupModal
                    show={this.state.isCreateGroupModal}
                    onClose={() => this.setState({ isCreateGroupModal: false })}
                />
                <div className="col-md-3 col-4 logo-div" onClick={this.clickOnOthers}>
                    <img src={VshareeLogo} alt="" />
                    <h1>{HeaderLang.body.sharee}</h1>
                </div>
                <div hidden={this.state.hiddentextField} className="col-6 input-main-div-mobile ">
                    <TextField
                        InputProps={{
                            className: 'input-search ',
                        }}
                        id="searchInp"
                        placeholder="Search user, groups , …"
                    />
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
                    <TextField
                        InputProps={{
                            className: 'input-search d-none d-md-block',
                        }}
                        id="searchInp"
                        placeholder="Search user, groups , …"
                    />
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
                        <i className="material-icons ">play_circle_outline</i>
                        <h6 style={{ marginLeft: '6px' }} className="d-none d-md-block">
                            {HeaderLang.body.stream}
                        </h6>
                    </Button>
                </div>

                <div className="col-4 user-main-div" hidden={!this.state.hiddentextField} onClick={this.clickOnOthers}>
                    <Dropdown className="dropdownClasss">
                        <Dropdown.Toggle variant="none" className="dropdownToggleClasss">
                            <i className="material-icons">account_circle</i>
                            <h6 className="d-none d-md-block">{HeaderLang.body.defaultname}</h6>
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item>
                                <Link to={RoutePath.profile} className="dropdowm-item">
                                    <i className="material-icons">account_circle</i>
                                    <h6>{HeaderLang.body.profile}</h6>
                                </Link>
                            </Dropdown.Item>
                            <Dropdown.Item>
                                <div className="dropdowm-item">
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
                    <i className="material-icons ">mail</i>

                    <i className="material-icons paddingi">notifications</i>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: ReduxState) => ({
    // direction: state.direction,
    isAuth: state.authStatus,
    //language: state.language,
});

const connector = connect(mapStateToProps);
export default connector(Headers);
