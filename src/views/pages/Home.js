import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch, Navigate, useLocation } from "react-router-dom";
import Utils from '../../Utils';
import Booking from '../../views/pages/Booking';
import Menu from './Menu';

import '../scss/Home.scss';

import groupImg from '../../images/group.svg';
import yogaImg from '../../images/yoga.svg';
import personalImg from '../../images/personal.svg';
import more from '../../images/more.svg';

import loadingImg from '../../images/loading.svg';

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            availableSessions: null,
            selectedSession: null,
        };
        this.clearSelectedSession = this.clearSelectedSession.bind(this);
    }

    componentDidMount() {
        if (this.props.currentUserData === null) {
            //pass
        } else {
            this.homeSessionsRequest();
        }
    }

    async homeSessionsRequest() {
        let arr = [];
        Utils.fetchData("yoga")
            .then(res => {
                if (res === "none") {
                    //pass
                    return null;
                } else {
                    arr.push(res[0])
                    return null;
                }
            })
            .then(() => {
                return Utils.fetchData("personal")
            })
            .then(res => {
                if (res === "none") {
                    //pass
                    return null;
                } else {
                    arr.push(res[0])
                    return null;
                }
            })
            .then(() => {
                return Utils.fetchData("group")
            })
            .then(res => {
                if (res === "none") {
                    //pass
                    return null;
                } else {
                    arr.push(res[0])
                    return null;
                }
            })
            .then(() => {
                this.setState({ availableSessions: arr })
            })
    }

    clearSelectedSession() {
        this.setState({ selectedSession: null })
    }

    render() {
        console.log(this.props.currentUserData)
        if (this.props.currentUserData === null) {
            console.log("no user data")
            return (
                <Navigate to="/account" />
            )
        } else if (this.state.availableSessions === null) {
            return (
                <div className="pageLoadingScreenHolder">
                        <div className="pageLoading"><img src={loadingImg} /></div>
                </div>
            )
        } else {
            return (
                <React.Fragment>
                    <div className="homeHolder">
                        <div className="greetingHolder">
                            <div className="greetingTitle">Good Day!</div>
                            <div className="greetingUserName">{this.props.currentUserData.firstName}</div>
                        </div>
                        <div className="exerciseHistory">
                            <div className="historyTitle">Summary</div>
                            <div className="histroyIntro">Your excerise this week</div>
                            <div className="typeHolder">
                                <div className="typeImageHolder">
                                    <img src={groupImg} />
                                </div>
                                <div className="typeHistoryInfo">
                                    <div className="typeTime">30mins</div>
                                    <div className="typeCategory">Group Fitness Sessions</div>
                                </div>
                            </div>
                            <div className="typeHolder">
                                <div className="typeImageHolder">
                                    <img src={yogaImg} />
                                </div>
                                <div className="typeHistoryInfo">
                                    <div className="typeTime">60mins</div>
                                    <div className="typeCategory">Yoga Sessions</div>
                                </div>
                            </div>
                            <div className="typeHolder">
                                <div className="typeImageHolder">
                                    <img src={personalImg} />
                                </div>
                                <div className="typeHistoryInfo">
                                    <div className="typeTime">60mins</div>
                                    <div className="typeCategory">Personal Training Sessions</div>
                                </div>
                            </div>
                        </div>
                        <div className="upcomingClass">
                            <div className="homeClassScrollHolder">
                                <div className="classTitle">Upcoming Classes</div>
                                <div className="classIntro">Secure the slot now!</div>
                                {
                                    this.state.availableSessions.length != 0 &&
                                    this.state.availableSessions.map((session) => (
                                        <div className="sessionBlock" key={session._id}>
                                            {session.sessionType === 'yoga' && <div className="sessionIcon"><img src={yogaImg} /></div>}
                                            {session.sessionType === 'group' && <div className="sessionIcon"><img src={groupImg} /> </div>}
                                            {session.sessionType === 'personal' && <div className="sessionIcon"><img src={personalImg} /> </div>}
                                            <div className="sessionBlockDetail">
                                                {session.sessionType === 'yoga' && <div className="sessionName">Yoga Session</div>}
                                                {session.sessionType === 'group' && <div className="sessionName">Group Fitness Session</div>}
                                                {session.sessionType === 'personal' && <div className="sessionName">Personal Training Session</div>}
                                                <div className="sessionTime">{Utils.sessionTime(session.startTime)}</div>
                                                <div>Room: {session.roomNumber}</div>
                                            </div>
                                            <div className="sessionMoreIcon"><img src={more} onClick={() => { this.setState({ selectedSession: session }) }} /></div>
                                        </div>
                                    ))
                                }
                                {
                                    this.state.availableSessions.length === 0 &&
                                    <div className="emptySession">No Future Booking Available Now</div>
                                }
                            </div>
                        </div>
                    </div>
                    {this.state.selectedSession != null && <Booking session={this.state.selectedSession} currentUserData={this.props.currentUserData} clearSelectedSession={this.clearSelectedSession} />}
                    <Menu currentUserData={this.props.currentUserData} />
                </React.Fragment>
            )
        }
    }
}

export default Home;