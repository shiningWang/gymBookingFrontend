import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch, Navigate, useLocation } from "react-router-dom";
import Utils from '../../Utils';
import '../scss/Menu.scss'

import menuBarImg from '../../images/menuBar.svg';
import closeMenuBarImg from '../../images/closeMenuBar.svg';

import homeImg from '../../images/home.svg';
import sessionImg from '../../images/session.svg';
import newbookingImg from '../../images/newbooking.svg';

import logoutImg from '../../images/logout.svg';

class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowMenu: false,
        };
    }

    openMenuPage() {
        this.setState({ isShowMenu: !this.state.isShowMenu })
    }

    render() {
        if (this.props.currentUserData.admin === true) {
            return (
                <React.Fragment>
                    <div className="menuBarImgHolder" onClick={() => this.openMenuPage()}>
                        {this.state.isShowMenu === true && <img ref={this.buttonStyle} src={closeMenuBarImg} /> || this.state.isShowMenu === false && <img ref={this.buttonStyle} src={menuBarImg} />}
                    </div>

                    {this.state.isShowMenu === true &&
                        <div className="menuPage">
                            <div className="menuHeader">
                                <div className="menuTitle">{this.props.currentUserData.firstName}</div>
                                <div className="menuUserEmail">{this.props.currentUserData.email}</div>
                            </div>
                            <div className="menuButtonsHolder">
                                <nav>
                                    <Link style={{ textDecoration: "none", color: "#ffffff" }} to="/admin"><div className={window.location.pathname === '/admin' ? ("navButtonActive") : ("navButton")}><img src={sessionImg} /><div className="menuTitle">All Sessions</div></div></Link>
                                    <Link style={{ textDecoration: "none", color: "#ffffff" }} to="/createsession"><div className={window.location.pathname === '/createsession' ? ("navButtonActive") : ("navButton")}><img src={sessionImg} /><div className="menuTitle">Create Session</div></div></Link>

                                    <Link style={{ textDecoration: "none", color: "#ffffff", marginTop: "2em" }} to="/account" onClick={() => { localStorage.removeItem('accessToken') }}><div className={window.location.pathname === '/account' ? ("navButtonActive") : ("navButton")}><img src={logoutImg} /><div className="menuTitle">Sign Out</div></div></Link>
                                </nav>
                            </div>
                        </div>
                    }
                </React.Fragment>
            )
        } else {
            return (
                <React.Fragment>
                    <div className="menuBarImgHolder" onClick={() => this.openMenuPage()}>
                        {this.state.isShowMenu === true && <img ref={this.buttonStyle} src={closeMenuBarImg} /> || this.state.isShowMenu === false && <img ref={this.buttonStyle} src={menuBarImg} />}
                    </div>

                    {this.state.isShowMenu === true &&
                        <div className="menuPage">
                            <div className="menuHeader">
                                <div className="menuTitle">{this.props.currentUserData.firstName}</div>
                                <div className="menuUserEmail">{this.props.currentUserData.email}</div>
                            </div>
                            <div className="menuButtonsHolder">
                                <nav>
                                    <Link style={{ textDecoration: "none", color: "#ffffff" }} to="/"><div className={window.location.pathname === '/' ? ("navButtonActive") : ("navButton")}><img src={homeImg} /><div className="menuTitle">Dashboard</div></div></Link>
                                    <Link style={{ textDecoration: "none", color: "#ffffff" }} to="/sessions"><div className={window.location.pathname === '/sessions' ? ("navButtonActive") : ("navButton")}><img src={sessionImg} /><div className="menuTitle">All Sessions</div></div></Link>
                                    <Link style={{ textDecoration: "none", color: "#ffffff" }} to="/mybookings"><div className={window.location.pathname === '/mybookings' || window.location.pathname === '/mybookings' ? ("navButtonActive") : ("navButton")}><img src={newbookingImg} /><div className="menuTitle">My Bookings</div></div></Link>

                                    <Link style={{ textDecoration: "none", color: "#ffffff", marginTop: "2em" }} to="/account" onClick={() => { localStorage.removeItem('accessToken') }}><div className={window.location.pathname === '/account' ? ("navButtonActive") : ("navButton")}><img src={logoutImg} /><div className="menuTitle">Sign Out</div></div></Link>
                                </nav>
                            </div>
                        </div>
                    }
                </React.Fragment>
            )
        }
    }
}

export default Menu;