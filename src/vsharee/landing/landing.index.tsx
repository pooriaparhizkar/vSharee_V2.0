import React from 'react';
import { ReduxState } from 'interface';
import { connect, ConnectedProps } from 'react-redux';
import './landing.style.scss';
import topPic from 'assets/images/landing/top.jpg';
import logo from 'assets/images/landing/logo.png';

const Landing: React.FC<ConnectedProps<typeof connector>> = function (props: ConnectedProps<typeof connector>) {
    return (
        <div className="vsharee-landing-page">
            <div className="top-pic">
                <div className="top-pic-container">
                    <img src={topPic} alt="TopPic" />
                    <div className="name">
                        <h2>Rampage</h2>
                        <p>
                            When three different animals become infected with a dangerous pathogen, a primatologist and
                            a geneticist team up to stop them from destroying Chicago.
                        </p>
                        <div className="detail">
                            <i className="material-icons">grade</i>
                            <span>6.5</span>
                            <h4>Action | Adventure | sci-fi</h4>
                        </div>
                        <button>
                            <i className="material-icons">play_arrow</i>
                            <h3>Watch Now</h3>
                        </button>
                    </div>
                </div>
            </div>
            <div className="header">
                <div className="logo">
                    <img src={logo} alt="logo" />
                    <h1>Sharee</h1>
                </div>
                <span />
                <div className="menu">
                    <div className="items active">
                        <label>Home</label>
                    </div>
                    <div className="items">
                        <label>Movies</label>
                    </div>
                    <div className="items">
                        <i className="material-icons">search</i>
                    </div>
                    <div className="items">
                        <i className="material-icons">person</i>
                    </div>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state: ReduxState) => ({
    text: state.language,
});

const connector = connect(mapStateToProps);
export default connector(Landing);
