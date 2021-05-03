import React, { useRef } from 'react';
import { ReduxState } from 'interface';
import { connect, ConnectedProps } from 'react-redux';
import './landing.style.scss';
import topPic from 'assets/images/landing/top.jpg';
import logo from 'assets/images/landing/logo.png';
import Slider from 'react-slick';
import movie1Pic from 'assets/images/landing/tenet.jpg';
import movie2Pic from 'assets/images/landing/johnwick.jpg';
import moviePreview from 'assets/images/landing/tenetHeader.jpg';
import { Link, useHistory } from 'react-router-dom';
import { RoutePath } from '../../data';
import redBackground from 'assets/images/landing/red-background.svg';
const Landing: React.FC<ConnectedProps<typeof connector>> = function () {
    const history = useHistory();
    const sliderRef = useRef<Slider | null>(null);
    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        variableWidth: true,
    };
    return (
        <div className="vsharee-landing-page">
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
                    <Link to={RoutePath.login} className="items">
                        <i className="material-icons">person</i>
                    </Link>
                </div>
            </div>
            <div className="slider-top">
                <img className="top-pic-image" src={topPic} alt="TopPic" />
                <div className="top-pic">
                    <div className="top-pic-container">
                        <div className="name">
                            <h2>Rampage</h2>
                            <p>
                                When three different animals become infected with a dangerous pathogen, a primatologist
                                and a geneticist team up to stop them from destroying Chicago.
                            </p>
                            <div className="detail">
                                <i className="material-icons">grade</i>
                                <span>6.5</span>
                                <h4>Action | Adventure | sci-fi</h4>
                            </div>
                            <button onClick={() => history.push(RoutePath.login)}>
                                <i className="material-icons">play_arrow</i>
                                <h3>Watch Now</h3>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="category">
                <div className="items active">
                    <h2>Trend Now</h2>
                    <i className="material-icons">trending_up</i>
                </div>
                <div className="items">
                    <h2>Popular</h2>
                    <i className="material-icons">local_fire_department</i>
                </div>
                <div className="items">
                    <h2>Premieres</h2>
                    <i className="material-icons">grade</i>
                </div>
                <div className="items">
                    <h2>Recently Added</h2>
                    <i className="material-icons">add</i>
                </div>
            </div>
            <div className="genres">
                <div className="items active">
                    <h2>All</h2>
                </div>
                <div className="items">
                    <h2>Action</h2>
                </div>
                <div className="items">
                    <h2>Adventure</h2>
                </div>
                <div className="items">
                    <h2>Animation</h2>
                </div>
                <div className="items">
                    <h2>Biography</h2>
                </div>
                <div className="items">
                    <h2>Crime</h2>
                </div>
                <div className="items">
                    <h2>Comedy</h2>
                </div>
                <div className="items">
                    <h2>Documentry</h2>
                </div>
                <div className="items">
                    <h2>Drama</h2>
                </div>
                <div className="items">
                    <h2>Horrible</h2>
                </div>
            </div>
            <div className="movies">
                <div className="right-gradient my-gradient" />
                <div className="left-gradient my-gradient" />
                <i onClick={() => sliderRef?.current?.slickNext()} className="cfi cfi-chevron-right arrow" />
                <i onClick={() => sliderRef?.current?.slickPrev()} className="cfi cfi-chevron-left arrow" />
                <Slider ref={sliderRef} {...settings}>
                    {Array.from(Array(11).keys()).map((item, index) => (
                        <div key={index} className="items">
                            <img src={movie1Pic} alt="movie" />
                            <div className="detail">
                                <h2>Tenet</h2>
                                <div className="more">
                                    <h4>2018</h4>
                                    <span />
                                    <i className="material-icons heart">favorite</i>
                                    <i className="material-icons eye">visibility</i>
                                    <i className="material-icons star">grade</i>
                                    <p>6.5</p>
                                </div>
                            </div>
                        </div>
                    ))}
                    {Array.from(Array(11).keys()).map((item, index) => (
                        <div key={index} className="items">
                            <img src={movie2Pic} alt="movie" />
                            <div className="detail">
                                <h2>Tenet</h2>
                                <div className="more">
                                    <h4>2018</h4>
                                    <span />
                                    <i className="material-icons heart">favorite</i>
                                    <i className="material-icons eye">visibility</i>
                                    <i className="material-icons star">grade</i>
                                    <p>6.5</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
            <div className="total-info">
                <div className="left">
                    <div className="logo">
                        <img src={logo} alt="logo" />
                        <div className="text">
                            <h1>See</h1>
                            <h2>a Movie</h2>
                        </div>
                    </div>
                    <p>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
                        the industrys standard dummy text ever since the 1500s.
                    </p>
                </div>
                <div className="right">
                    <div className="row">
                        <div className="items">
                            <i className="material-icons">live_tv</i>
                            <div className="index">
                                <h2>Stream</h2>
                                <p>
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                                    Ipsum has been the industry
                                </p>
                            </div>
                        </div>
                        <div className="items">
                            <i className="material-icons">movie</i>
                            <div className="index">
                                <h2>Play Music and Video</h2>
                                <p>
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                                    Ipsum has been the industry
                                </p>
                            </div>
                        </div>
                    </div>
                    <span className="spacer" />
                    <div className="row">
                        <div className="items">
                            <i className="material-icons">local_movies</i>
                            <div className="index">
                                <h2>Local Sync Movie</h2>
                                <p>
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                                    Ipsum has been the industry
                                </p>
                            </div>
                        </div>
                        <div className="items">
                            <i className="material-icons">groups</i>
                            <div className="index">
                                <h2>Create Group</h2>
                                <p>
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                                    Ipsum has been the industry
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="online">
                <div className="left">
                    <div className="video">
                        <video
                            controls
                            src={
                                'https://imdb-video.media-imdb.com/vi1504821529/1434659607842-pgv4ql-1598916742145.mp4?Expires=1616803257&Signature=peeZNhumTT4fbOAUxWex8du6lP~B42vICPq45NZpiZBsqZUjQrLv93ZgdpuaZcaWhxCPDmDBKb85zrAG-r2i6r98CFTBLz2l6sXKxsbizqv~Gkh11BCEy-bKmtRybso-u024VEgmXgJ~a9F1AclKXz459SOt~W1DlDirh7RLPFR0OuC8noLG-9edJOxNEGEbNFvUvXLqkvjhd7IEfpDRibfHP9nI4FIqZ26A5n0Hu28-yO5R3Vf~0jGIu5Jgr5OmMRmPgo08ixvxzNTTrF860FGTFq1kL2XPlcHucY5S2~qf1Yy5QmiJ9q9nS9x-mwiZL6yMc0AtbI14ErULf86m0w__&Key-Pair-Id=APKAIFLZBVQZ24NQH3KA'
                            }
                            poster={moviePreview}
                        />

                        <div className="shadow" />
                    </div>
                </div>
                <div className="right">
                    <h1>Online Members & Groups </h1>
                    <h3>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</h3>
                    <div className="statistic">
                        <div className="items">
                            <span>3875</span>
                            <h4>Online Members</h4>
                        </div>
                        <div className="items">
                            <span>240</span>
                            <h4>Active Groups</h4>
                        </div>
                    </div>
                </div>
            </div>
            <div className="join-us">
                {/*<img src={redBackground} alt="vSharee" />*/}
                <div className="context">
                    <h1>Join Us</h1>
                    <p>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
                        the industrys standard dummy text ever since the 1500s.
                    </p>
                    <div className="email">
                        <div className="my-input">
                            <input placeholder="Enter your Email here… " />
                        </div>
                        <div className="my-btn">
                            <span>Join</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="questions">
                <h1>Questions Looks Here </h1>
                <h3>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the{' '}
                </h3>
                <div className="box">
                    <div className="my-column">
                        <div className="items">
                            <h4>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h4>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ante nibh, scelerisque
                                a vehicula nec, eleifend at tortor. Aliquam eget suscipit lectus. Suspendisse efficitur
                                congue purus non molestie. Phasellus pulvinar massa in mauris imperdiet, eget tristique
                                ex pharetra. Proin viverra mattis felis, eu egestas urna pharetra maximus. Aliquam non
                                faucibus neque, a interdum purus. Maecenas vitae suscipit justo.
                            </p>
                        </div>
                        <div className="items">
                            <h4>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h4>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ante nibh, scelerisque
                                a vehicula nec, eleifend at tortor. Aliquam eget suscipit lectus. Suspendisse efficitur
                                us. Maecenas vitae suscipit justo.
                            </p>
                        </div>
                        <div className="items">
                            <h4>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h4>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ante nibh, scelerisque
                                a vehicula nec, eleifend at tortor. Aliquam eget suscipit lectus. Suspendisse efficitur
                                r massa in mauris imperdiet, eget tristique ex pharetra. Proin viverra mattis felis, eu
                                egestas urna pharetra maximus. Aliquam non faucibus neque, a interdum purus. Maecenas
                                vitae suscipit justo.
                            </p>
                        </div>
                    </div>
                    <div className="my-column">
                        <div className="items">
                            <h4>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h4>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ante nibh, scelerisque
                                a vehicula nec, eleifend at tortor. Aliquam eget suscipit lectus. Suspendisse efficitur
                                congue purus non molestie. Phasellus pulvinar massa in mauris imperdiet, eget tristique
                                ex pharetra. Proin viverra mattis felis, eu egestas urna pharetra maximus. Aliquam non
                                congue purus non molestie. Phasellus pulvinar massa in mauris imperdiet, eget tristique
                                ex pharetra. Proin viverra mattis felis, eu eg congue purus non molestie. Phasellus
                                pulvinar massa in mauris imperdiet, eget tristique ex pharetra. Proin viverra mattis
                                felis, eu eg faucibus neque, a interdum purus. Maecenas vitae suscipit justo.
                            </p>
                        </div>
                        <div className="items">
                            <h4>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h4>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ante nibh, scelerisque
                                a vehicula nec, eleifend at tortor. Aliquam eget suscipit lectus. Suspendisse efficitur
                                congue purus non molestie. Phasellus pulvinar massa in mauris imperdiet, eget tristique
                                ex pharetra. Proin viverra mattis felis, eu eg congue purus non molestie. Phasellus
                                pulvinar massa in mauris imperdiet, eget tristique ex pharetra. Proin viverra mattis
                                felis, eu eg congue purus non molestie. Phasellus pulvinar massa in mauris imperdiet,
                                eget tristique ex pharetra. Proin viverra mattis felis, eu egestas urna pharetra
                                maximus. Aliquam non faucibus neque, a interdum purus. Maecenas vitae suscipit justo.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="footer">
                <div className="logo">
                    <img src={logo} alt="logo" />
                    <h1>Sharee</h1>
                </div>
                <div className="links">
                    <Link to="#">Home</Link>
                    <Link to="#">About</Link>
                    <Link to="#">Service</Link>
                    <Link to="#">Contact Us</Link>
                </div>
                <div className="circles">
                    <div className="items">Po</div>
                    <div className="items">Ka</div>
                    <div className="items">Mo</div>
                </div>
                <h6>Copyright Vsharee</h6>
            </div>
        </div>
    );
};

const mapStateToProps = (state: ReduxState) => ({
    text: state.language,
});

const connector = connect(mapStateToProps);
export default connector(Landing);
