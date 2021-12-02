import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch, Navigate, useLocation } from "react-router-dom";
import Utils from '../../Utils';
import Booking from './Booking';
import Menu from './Menu';
import Cancel from './Cancel';

import '../scss/Admin.scss';

import groupImg from '../../images/group.svg';
import yogaImg from '../../images/yoga.svg';
import personalImg from '../../images/personal.svg';
import more from '../../images/more.svg';

class Admin extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            adminSessionsData: null,
            adminSessionIndex: null,

            selectedSession: null,
        };
        this.homeSessionsRequest = this.homeSessionsRequest.bind(this);
        this.clearSelectedSession = this.clearSelectedSession.bind(this);
    }

    clearSelectedSession() {
        this.setState({ selectedSession: null })
    }

    componentDidMount() {
        if (this.props.currentUserData === null) {
            //pass
        } else {
            this.homeSessionsRequest();
        }
    }

    async homeSessionsRequest() {
        let allSessions = await Utils.adminRequestAll();
        console.log(allSessions)

        if (allSessions.error) {
            console.log(allSessions.message)
            this.setState({ adminSessionsData: 0, adminSessionIndex: 0 })
        } else {
            let pendingSortDate = {};
            allSessions.forEach(session => {
                let dateTime = new Date(session.startTime);
                let dDate = dateTime.getUTCDate();
                let dDateStr = "";
                if (dDate < 10) { dDateStr = "0" + dDate.toString(); } else { dDateStr = dDate.toString(); }
                let dMonth = dateTime.getUTCMonth() + 1;
                let dYear = dateTime.getUTCFullYear();
                let fullDate = dYear.toString() + dMonth.toString() + dDateStr;
                let numFullDate = parseInt(fullDate, 10);
                if (pendingSortDate[numFullDate] === undefined) {
                    pendingSortDate[numFullDate] = [session];
                } else {
                    pendingSortDate[numFullDate].push(session)
                }
            });
            let pSDT = Object.keys(pendingSortDate);
            this.setState({ adminSessionsData: pendingSortDate, adminSessionIndex: pSDT })
        }
    }

    render() {
        if (this.props.currentUserData === null) {
            console.log("no user data")
            return (
                <Navigate to="/account" />
            )
        } else if (this.state.adminSessionsData === null) {
            return (
                <div>loading</div>
            )
        } else {
            return (
                <React.Fragment>
                    <div className="adminScreenHolder">

                        <div className="adminHeaderHolder">
                            <div className="adminHeaderTitle">All Future Sessions</div>
                        </div>

                        <div className="adminAllSessions">
                            {this.state.adminSessionsData != 0 &&
                                this.state.adminSessionIndex.map((index) => (
                                    <div className="sessionDateHolder" key={index}>
                                        <div className="sessionDateHeader">{Utils.sessionTime(this.state.adminSessionsData[index][0].startTime)}</div>
                                        {
                                            this.state.adminSessionsData[index].map((session) => (
                                                <div className="sessionBlock" key={session._id}>
                                                    {session.sessionType === 'yoga' && <div className="sessionIcon"><img src={yogaImg} /></div>}
                                                    {session.sessionType === 'group' && <div className="sessionIcon"><img src={groupImg} /> </div>}
                                                    {session.sessionType === 'personal' && <div className="sessionIcon"><img src={personalImg} /> </div>}
                                                    <div className="sessionBlockDetail">
                                                        {session.sessionType === 'yoga' && <div className="sessionName">Yoga Session</div>}
                                                        {session.sessionType === 'group' && <div className="sessionName">Group Fitness Session</div>}
                                                        {session.sessionType === 'personal' && <div className="sessionName">Personal Training Session</div>}
                                                        <div className="sessionTime">{Utils.sessionTime(session.startTime)}</div>
                                                        <div>{session.attendees.length === 0 && "No one registered yet"}{session.attendees.length === 1 && "1 person registered"}{session.attendees.length > 1 && session.attendees.length + " person registered"}</div>
                                                        <div>Room {session.roomNumber}</div>
                                                    </div>
                                                    <div className="sessionMoreIcon"><img src={more} onClick={() => { this.setState({ selectedSession: session }) }} /></div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                ))
                            }
                            {this.state.adminSessionsData === 0 &&
                                <div>
                                    <div>No Booking Has Been Made</div>
                                    <div>Booking Now</div>
                                </div>
                            }
                        </div>
                    </div>
                    {this.state.selectedSession != null && <Cancel session={this.state.selectedSession} currentUserData={this.props.currentUserData} clearSelectedSession={this.clearSelectedSession} />}
                    <Menu currentUserData={this.props.currentUserData} />
                </React.Fragment>
            )
        }
    }
}

export default Admin;