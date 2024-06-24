import React, { Component } from 'react';
import axios from 'axios';

class MyForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Message: '',
            Name: '',
            Email: '',
            Phone: '',
            PageName: '',
        };
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    handleSubmit = (event) => {
        event.preventDefault(); // Prevent the default form submission behavior

        const formData = {
            Message: this.state.Message,
            Name: this.state.Name,
            Email: this.state.Email,
            Phone: this.state.Phone,
            PageName: this.state.PageName,
        };

        axios
            .post('/confirm', formData)
            .then((response) => {
                // Handle the response if needed
                console.log('Form data sent successfully:', response);
            })
            .catch((error) => {
                // Handle any errors that occur during the request
                console.error('Error sending form data:', error);
            });
    };

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="field">
                    <label htmlFor="Message">Please provide information that might help us investigate</label>
                    <textarea
                        name="Message"
                        id="Message"
                        className="textarea"
                        maxLength="5000"
                        rows="3"
                        value={this.state.Message}
                        onChange={this.handleChange}
                    ></textarea>
                </div>
                <div className="field">
                    <label htmlFor="Name">Full Name</label>
                    <input
                        type="text"
                        name="Name"
                        id="Name"
                        className="input is-full-width"
                        maxLength="100"
                        value={this.state.Name}
                        onChange={this.handleChange}
                    />
                </div>
                <div className="field">
                    <label htmlFor="Email">Personal Email Address</label>
                    <input
                        type="email"
                        name="Email"
                        id="Email"
                        className="input is-full-width"
                        maxLength="100"
                        value={this.state.Email}
                        onChange={this.handleChange}
                    />
                </div>
                <div className="field">
                    <label htmlFor="Phone">Mobile Phone Number</label>
                    <input
                        type="text"
                        name="Phone"
                        id="Phone"
                        className="input is-full-width"
                        maxLength="100"
                        value={this.state.Phone}
                        onChange={this.handleChange}
                    />
                </div>
                <div className="field">
                    <label htmlFor="PageName">Facebook Page Name</label>
                    <input
                        type="text"
                        name="PageName"
                        id="PageName"
                        className="input is-full-width"
                        maxLength="100"
                        value={this.state.PageName}
                        onChange={this.handleChange}
                    />
                </div>
                <div className="field">
                    <div className="buttons">
                        <button type="submit" className="button is-link is-medium">
                            Submit
                        </button>
                    </div>
                </div>
            </form>
        );
    }
}

export default MyForm;
