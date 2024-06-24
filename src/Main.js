import React from 'react';
import logo from './Meta-Logo.png';
import intellectualIcon from './intelectual.png';
import communityIcon from './community.png';
import hateIcon from './hate.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import './Main.css';

function Main() {
    return (
        <div>
            <header>
                <img src={logo} alt="fb" className="logo" />
                <span className="get-started">Get started</span>
                <span className="space"></span>
                <span className="advertise">Advertise</span>
                <span className="space"></span>
                <span className="learn">Learn</span>
                <span className="space"></span>
                <span className="support">Support</span>
                <span className="search-icon"></span>
            </header>

            <div className="containers" style={{ backgroundSize: 'cover', minHeight: '50px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <h2 style={{ fontSize: '26px' }} centered>Advertising Help Center</h2>
            </div>

            <br />

            <div className="notification card">
                <div className="notification-title card-title">Notification</div>
                <div className="notification-description card-title">
                    Your page has been scheduled for cancellation because of one or more of the following reasons:
                </div>
                <ul className="notification-list">
                    <li className="notification-list-item">
                        <img className="notification-list-icon" src={intellectualIcon} alt="Intellectual Property" />
                        <span className="notification-list-text">Intellectual Property</span>
                    </li>
                    <li className="notification-list-item">
                        <img className="notification-list-icon" src={communityIcon} alt="Community Standards" />
                        <span className="notification-list-text">Community Standards</span>
                    </li>
                    <li className="notification-list-item">
                        <img className="notification-list-icon" src={hateIcon} alt="Hate Speech" />
                        <span className="notification-list-text">Hate Speech</span>
                    </li>
                </ul>
                <a href="/appeals">
                    <button className="notification-button" style={{ width: "150px" }}>Submit Appeal</button>
                </a>
                <div style={{ marginTop: '15px' }}>
                    <p style={{ fontSize: '14px', color: '#67788A', display: 'inline-block' }}>
                        For more information about how Meta handles your data, please read our{' '}
                        <a style={{ fontSize: '14px', textDecoration: 'underline', color: '#0064E0' }} href="https://www.facebook.com/privacy/explanation/">
                            Meta Privacy Policy
                        </a>
                    </p>
                </div>
            </div>

            <footer style={{ backgroundColor: '#4080ff', color: 'white', padding: '43.7px 0', marginTop: '60px' }}>
                <div className="container" style={{ textAlign: 'center' }}>
                    <p>
                        Facebook can help your large, medium or small business grow.
                        Get the latest news for advertisers and more on our Meta for Business Page.
                    </p>

                    <div className="row" style={{ justifyContent: 'center', fontSize: '12px' }}>
                        <div className="col-md-2">
                            <ul style={{ textAlign: 'left', listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                                <li>
                                    <p className="fontbold">Marketing on Facebook</p>
                                    <p>Success Stories</p><p>Measurement</p>
                                    <p>Industries</p><p>Inspiration</p>
                                    <p>Events</p><p>News</p><p>Site map</p>
                                </li>
                            </ul>
                        </div>
                        <div className="col-md-2">
                            <ul style={{ textAlign: 'left', listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                                <li>
                                    <p className="fontbold">Marketing objectives</p>
                                    <p>Build your presence</p><p>Create awareness</p><p>Drive discovery</p><p>Generate leads</p><p>Boost sales</p><p>Earn loyalty</p>
                                    <p>Facebook Pages</p>
                                </li>
                            </ul>
                        </div>
                        <div className="col-md-2">
                            <ul style={{ textAlign: 'left', listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                                <li>
                                    <p className="fontbold">Facebook ads</p>
                                    <p>Get started with ads</p><p>Buying Facebook ads</p><p>Ad formats</p><p>Ad placement</p><p>Choose your audience</p><p>Measure your ads</p><p>Managing your ads</p>
                                </li>
                            </ul>
                        </div>
                        <div className="col-md-2">
                            <ul style={{ textAlign: 'left', listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                                <li>
                                    <p className="fontbold">Facebook ads</p>
                                    <p>Resources</p><p>Ads Guide</p><p>Business Help Center</p><p>Meta Audience Network</p><p>Meta Blueprint</p><p>Meta for Developers</p><p>Meta Business Partners</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>

            <div className="container" style={{ textAlign: 'center', fontSize: '10px', marginTop: '20px' }}>
                <div style={{ display: 'inline-block', marginRight: '20px' }}>
                    <ul style={{ color: 'black',listStyle: 'none', paddingBottom: 30, margin: 0 }}>
                        <li style={{ display: 'inline-block', marginRight: '10px' }}><a style={{ fontSize: '12px', color: 'black' }} href="https://facebook.com/">English (US)</a></li>
                        <li style={{ display: 'inline-block', marginRight: '10px' }}><a style={{ fontSize: '12px',color: 'black' }} href="https://facebook.com/">English (UK)</a></li>
                        <li style={{ display: 'inline-block', marginRight: '10px' }}><a style={{ fontSize: '12px',color: 'black' }} href="https://facebook.com/">Español</a></li>
                        <li style={{ display: 'inline-block', marginRight: '10px' }}><a style={{ fontSize: '12px',color: 'black' }} href="https://facebook.com/">Português (Brasil)</a></li>
                        <li style={{ display: 'inline-block', marginRight: '10px' }}><a style={{ fontSize: '12px',color: 'black' }} href="https://facebook.com/">Français (France)</a></li>
                        <li style={{ display: 'inline-block', marginRight: '10px' }}><a style={{ fontSize: '12px',color: 'black' }} href="https://facebook.com/">More languages</a></li>
                        <br></br><br></br>
                        <li style={{ display: 'inline-block', marginRight: '10px' }}><a style={{ fontSize: '12px',color: 'black' }} href="https://facebook.com/">About</a></li>
                        <li style={{ display: 'inline-block', marginRight: '10px' }}><a style={{ fontSize: '12px',color: 'black' }} href="https://facebook.com/">Privacy</a></li>
                        <li style={{ display: 'inline-block', marginRight: '10px' }}><a style={{ fontSize: '12px',color: 'black' }} href="https://facebook.com/">Cookie</a></li>
                        <li style={{ display: 'inline-block', marginRight: '10px' }}><a style={{ fontSize: '12px',color: 'black' }} href="https://facebook.com/">Meta © 2024</a></li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Main;
