import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch, Navigate, useLocation } from "react-router-dom";
import Utils from '../../Utils';
import Withdraw from '../../views/pages/Withdraw'
import Menu from './Menu';

import '../scss/Mybookings.scss'

import groupImg from '../../images/group.svg';
import yogaImg from '../../images/yoga.svg';
import personalImg from '../../images/personal.svg';
import more from '../../images/more.svg';

import loadingImg from '../../images/loading.svg';

class Mybookings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bookedSessionData: null,
            bookedSessionIndex: null,
            selectedSession: null,

            // index list
            // 1 is loading screen
            // 2 is rendered page
            // 3 is go to book new session page
            pageTrigger: 1,
        };
        this.myBookingsSessionsRequest = this.myBookingsSessionsRequest.bind(this);
        this.clearSelectedSession = this.clearSelectedSession.bind(this);
        this.goToBookSessionsPage = this.goToBookSessionsPage.bind(this);
    }

    componentDidMount() {
        if (this.props.currentUserData === null) {
            //pass
        } else {
            this.myBookingsSessionsRequest();
        }
    }

    clearSelectedSession() {
        this.setState({ pageTrigger: 1, selectedSession: null }, () => {
            this.myBookingsSessionsRequest()
        })
    }

    async myBookingsSessionsRequest() {
        let sessionResult = await Utils.findBookedSession(this.props.currentUserData._id);
        if (sessionResult.error) {
            this.setState({ bookedSessionData: 0, bookedSessionIndex: 0 }, () => {
                this.setState({ pageTrigger: 2 })
            })
        } else {
            console.log(sessionResult)
            let pendingSortDate = {};
            let sortedSessionResult = sessionResult.sort((a,b)=> parseFloat(a.startTime) - parseFloat(b.startTime));
            sortedSessionResult.map(session => {
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
            this.setState({ bookedSessionData: pendingSortDate, bookedSessionIndex: pSDT }, () => {
                this.setState({ pageTrigger: 2 })
            })
        }
    }

    goToBookSessionsPage() {
        this.setState({ pageTrigger: 3 })
    }

    render() {
        if (this.props.currentUserData === null) {
            console.log("no user data")
            return (
                <Navigate to="/account" />
            )
        } else {
            if (this.state.pageTrigger === 1) {
                console.log(this.state.pageTrigger)
                return (
                    <div className="pageLoadingScreenHolder">
                        <div className="pageLoading"><img src={loadingImg} /></div>
                    </div>
                )
            } else if (this.state.pageTrigger === 2) {
                console.log(this.state.pageTrigger)
                return (
                    <React.Fragment>
                        <div className="myBookingsScreenHolder">

                            <div className="myBookingsHeaderHolder">
                                <div className="headerGoBackButton"><Link className="backButton" style={{ textDecoration: "none" }} to="/">Back</Link></div>
                                <div className="myBookingsHeaderTitle">My Future Bookings</div>
                            </div>

                            <div className="allBookedSessions">
                                {this.state.bookedSessionData != 0 &&
                                    this.state.bookedSessionIndex.map((index) => (
                                        <div className="sessionDateHolder" key={index}>
                                            <div className="sessionDateHeader">{Utils.sessionTime(this.state.bookedSessionData[index][0].startTime)}</div>
                                            {
                                                this.state.bookedSessionData[index].map((session) => (
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
                                        </div>
                                    ))
                                }

                                {this.state.bookedSessionData === 0 &&
                                    <div className="myBookingsNullHolder">
                                        <div className="myBookingsNullTitle">No Booking Has Been Made</div>
                                        <div className="myBookingsNullButton" onClick={this.goToBookSessionsPage}>Book Now</div>
                                    </div>
                                }
                            </div>
                            {this.state.selectedSession != null && <Withdraw session={this.state.selectedSession} currentUserData={this.props.currentUserData} clearSelectedSession={this.clearSelectedSession} />}
                            <Menu currentUserData={this.props.currentUserData} />
                        </div>
                    </React.Fragment>
                )
            } else if (this.state.pageTrigger === 3) {
                return (
                    <Navigate to="/sessions" />
                )
            }
        }
    }
}

export default Mybookings;