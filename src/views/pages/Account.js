import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch, Navigate, useLocation } from "react-router-dom";
import Utils from '../../Utils';
import Popup from './Popup';

import '../scss/Account.scss'

import loadingImg from '../../images/loading.svg';


class Account extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            // index for the page
            // 1 is log in
            // 2 is sign up
            // 3 is loading
            pageTrigger: 1,

            // sign in required data
            loginEmail: "",
            loginPassword: "",

            // sign up required data
            clientFirstname: "",
            clientLastname: "",
            clientEmail: "",
            clientPassword: "",
            clientConfirmPassword: "",

            showMessage: null,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSignInSubmit = this.handleSignInSubmit.bind(this);
        this.handleSignUpSubmit = this.handleSignUpSubmit.bind(this);
    }

    handleChange(event) {
        const value = event.target.value;
        const name = event.target.name;
        this.setState({ [name]: value });
    }

    async handleSignInSubmit(event) {
        event.preventDefault();

        this.setState({ pageTrigger: 3 })

        let formData = new FormData();
        formData.append('email', this.state.loginEmail);
        formData.append('password', this.state.loginPassword);

        let currentUserData = await Utils.signIn(formData);
        if (!currentUserData.error) {
            this.setState({pageTrigger: 1});
            this.props.updateCurrentUserData(currentUserData.userCredit);
        } else {
            this.setState({ pageTrigger: 1}, ()=>{
                this.setState({ showMessage: currentUserData.error.message },()=>{
                    setTimeout(() => {
                        this.setState({ showMessage: null })
                    }, 3000);
                })
            })
        }
    }

    async handleSignUpSubmit(event) {
        event.preventDefault();

        this.setState({ pageTrigger: 3 })

        const passwd = this.state.clientPassword;
        const passwdre = this.state.clientConfirmPassword;
        if (passwd === passwdre) {
            let formData = new FormData();
            formData.append('firstName', this.state.clientFirstname);
            formData.append('lastName', this.state.clientLastname);
            formData.append('email', this.state.clientEmail);
            formData.append('password', this.state.clientPassword);
            let signUpData = await Utils.signUp(formData);
            if (!signUpData.error) {
                this.setState({ 
                    loginEmail: signUpData.loginData.email,
                    pageTrigger: 1,
                })
            } else {
                this.setState({ pageTrigger: 2}, ()=> {
                    this.setState({ showMessage: signUpData.error.message }, ()=>{
                        setTimeout(() => {
                            this.setState({ showMessage: null })
                        }, 3000);
                    })
                });
            }
        }
    }

    goToHome() {
        this.setState({ pageTrigger: 4 })
    }

    goToAdmin() {
        this.setState({ pageTrigger: 5 })
    }

    render() {
        if (this.state.pageTrigger === 1) {
            return (
                <React.Fragment>
                    <div className="screenHolder">
                        <div className="accountBoardDash"></div>
                        <div className="formHolder">
                            <div className="pageTriggerButtons">
                                <div className="triggerButtonCurrent" onClick={() => this.setState({ pageTrigger: 1 })}>Log in</div>
                                <div className="triggerButton" onClick={() => this.setState({ pageTrigger: 2 })}>Sign up</div>
                            </div>
                            <form className="signForm" onSubmit={this.handleSignInSubmit}>
                                <div className="projectForm">
                                    <div className="projectFormInput">
                                        <input type='email' placeholder='Email Address' name='loginEmail' required value={this.state.loginEmail} onChange={this.handleChange} />
                                    </div>
                                    <div className="projectFormInput">
                                        <input type='password' placeholder="Password" name='loginPassword' required value={this.state.loginPassword} onChange={this.handleChange} />
                                    </div>
                                </div>
                                <div className="projectConfirmButton">
                                    <input type='submit' value='Submit' />
                                </div>
                            </form>
                        </div>
                        < Popup popupMessage={this.state.showMessage} />
                    </div>
                </React.Fragment>
            )
        } else if (this.state.pageTrigger === 2) {
            return (
                <React.Fragment>
                    <div className="screenHolder">
                        <div className="accountBoardDash"></div>
                        <div className="formHolder">
                            <div className="pageTriggerButtons">
                                <div className="triggerButton" onClick={() => this.setState({ pageTrigger: 1 })}>Log in</div>
                                <div className="triggerButtonCurrent" onClick={() => this.setState({ pageTrigger: 2 })}>Sign up</div>
                            </div>
                            <form className="signForm" onSubmit={this.handleSignUpSubmit}>
                                <div className="projectForm">
                                    <div className="projectFormInput">
                                        <input type='text' placeholder='First Name' name='clientFirstname' required value={this.state.clientFirstname} onChange={this.handleChange} />
                                    </div>
                                    <div className="projectFormInput">
                                        <input type='text' placeholder='Last Name' name='clientLastname' required value={this.state.clientLastname} onChange={this.handleChange} />
                                    </div>
                                    <div className="projectFormInput">
                                        <input type='email' placeholder='Email Address' name='clientEmail' required value={this.state.clientEmail} onChange={this.handleChange} />
                                    </div>
                                    <div className="projectFormInput">
                                        <input type='password' placeholder='Password' name='clientPassword' required value={this.state.clientPassword} onChange={this.handleChange} />
                                    </div>
                                    <div className="projectFormInput">
                                        <input type='password' placeholder='Confirm Password' name='clientConfirmPassword' required value={this.state.clientConfirmPassword} onChange={this.handleChange} />
                                    </div>
                                </div>
                                <div className="projectConfirmButton">
                                    <input type='submit' value='Submit' />
                                </div>
                            </form>
                        </div>
                        < Popup popupMessage={this.state.showMessage} />
                    </div>
                </React.Fragment>
            )
        } else if ( this.state.pageTrigger === 3 ) {
            return(
                <div className="pageLoadingScreenHolder">
                        <div className="pageLoading"><img src={loadingImg} /></div>
                </div>
            )
        } else if (this.state.pageTrigger === 4) {
            return (
                <Navigate to="/" />
            )
        } else if (this.state.pageTrigger === 5) {
            return (
                <Navigate to="/admin" />
            )
        }
    }
}

export default Account;