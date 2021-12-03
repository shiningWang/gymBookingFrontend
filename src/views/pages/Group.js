import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch, Navigate, useLocation } from "react-router-dom";
import Utils from '../../Utils';

import '../scss/Group.scss';

import Menu from './Menu';
import Booking from './Booking';

import groupCharImg from '../../images/groupChar.svg';
import yogaCharImg from '../../images/yogaChar.svg';
import personalCharImg from '../../images/personalChar.svg';

import groupImg from '../../images/group.svg';
import yogaImg from '../../images/yoga.svg';
import personalImg from '../../images/personal.svg';
import more from '../../images/more.svg';

import loadingImg from '../../images/loading.svg';

class Group extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            groupSessionData: null,
            groupSessionIndex: null,
            selectedSession: null,
        };
        this.groupSessionsRequest = this.groupSessionsRequest.bind(this);
        this.clearSelectedSession = this.clearSelectedSession.bind(this);
    }

    componentDidMount() {
        if (this.props.currentUserData === null) {
            //pass
        } else {
            this.groupSessionsRequest();
        }
    }

    clearSelectedSession() {
        this.setState({ selectedSession: null })
    }

    async groupSessionsRequest() {
        let sessionResult = await Utils.fetchData("group");
        if (sessionResult.error) {
            console.log(sessionResult.message)
        } else {
            let pendingSortDate = {};
            let sortedSessionResult = sessionResult.sort((a,b)=> parseFloat(a.startTime) - parseFloat(b.startTime));
            sortedSessionResult.map(session => {
                let dateTime = new Date(session.startTime);
                let dDate = dateTime.getUTCDate();
                let dDateStr = "";
                if (dDate < 10) { dDateStr = "0" + dDate.toString(); } else { dDateStr = dDate.toString(); }
                let dMonth = dateTime.getUTCMonth() + 1;
                let dYear = dateTime.getUTCFullYear();

                let fullDate = "";
                if (dMonth<10){
                    fullDate = dYear.toString() + "0" + dMonth.toString() + dDateStr;
                } else {
                    fullDate = dYear.toString() + dMonth.toString() + dDateStr;
                }

                let numFullDate = parseInt(fullDate, 10);
                if (pendingSortDate[numFullDate] === undefined) {
                    pendingSortDate[numFullDate] = [session];
                } else {
                    pendingSortDate[numFullDate].push(session)
                }
            });
            let pSDT = Object.keys(pendingSortDate);
            this.setState({ groupSessionData: pendingSortDate, groupSessionIndex: pSDT })
        }
    }

    render() {
        if (this.props.currentUserData === null) {
            console.log("no user data")
            return (
                <Navigate to="/account" />
            )
        } else {
            if (this.state.groupSessionData === null || this.state.groupSessionIndex === null) {
                return (
                    <div className="pageLoadingScreenHolder">
                        <div className="pageLoading"><img src={loadingImg} /></div>
                    </div>
                )
            } else {
                return (
                    <React.Fragment>
                        <div className="groupScreenHolder">
                            <div className="groupHeaderHolder">
                                <Link style={{ textDecoration: "none" }} to="/sessions"><div className="headerGoBackButton">Back</div></Link>
                                <div className="groupHeaderTitle">Group Fitness Sessions</div>
                            </div>
                            <div className="groupImgIntroHolder">
                                <div className="groupImgHolder"><img src={groupCharImg} /></div>
                                <div className="groupIntro">Group Training Session</div>
                                <div className="groupSessionsQuan">4 Available Sessions</div>
                            </div>
                            <div className="allGroupSessions">
                                {
                                    this.state.groupSessionIndex.map((index) => (
                                        <div className="sessionDateHolder" key={index}>
                                            <div className="sessionDateHeader">{Utils.sessionTime(this.state.groupSessionData[index][0].startTime)}</div>
                                            {
                                                this.state.groupSessionData[index].map((session) => (
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
                            </div>
                            {this.state.selectedSession != null && <Booking session={this.state.selectedSession} currentUserData={this.props.currentUserData} clearSelectedSession={this.clearSelectedSession} />}
                            <Menu currentUserData={this.props.currentUserData} />
                        </div>
                    </React.Fragment>
                )
            }
        }
    }
}

export default Group;