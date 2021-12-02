import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch, Navigate, useLocation } from "react-router-dom";
import Utils from '../../Utils';

import '../scss/Yoga.scss';

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

class Yoga extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            yogaSessionData: null,
            yogaSessionIndex: null,
            selectedSession: null,
        };
        this.yogaSessionsRequest = this.yogaSessionsRequest.bind(this);
        this.clearSelectedSession = this.clearSelectedSession.bind(this);
    }

    componentDidMount() {
        if (this.props.currentUserData === null) {
            //pass
        } else {
            this.yogaSessionsRequest();
        }
    }

    clearSelectedSession() {
        this.setState({ selectedSession: null })
    }

    async yogaSessionsRequest() {
        let sessionResult = await Utils.fetchData("yoga");
        if (sessionResult.error) {
            console.log(sessionResult.message)
        } else {
            let pendingSortDate = {};
            sessionResult.forEach(session => {
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
            this.setState({ yogaSessionData: pendingSortDate, yogaSessionIndex: pSDT })
        }
    }

    render() {
        if (this.state.yogaSessionData === null || this.state.yogaSessionIndex === null) {
            return (
                <div className="pageLoadingScreenHolder">
                        <div className="pageLoading"><img src={loadingImg} /></div>
                </div>
            )
        } else {
            return (
                <React.Fragment>
                    <div className="yogaScreenHolder">
                        <div className="yogaHeaderHolder">
                            <Link style={{ textDecoration: "none" }} to="/sessions"><div className="headerGoBackButton">← Back</div></Link>
                            <div className="yogaHeaderTitle">Yoga Sessions</div>
                        </div>
                        <div className="yogaImgIntroHolder">
                            <div className="yogaImgHolder"><img src={yogaCharImg} /></div>
                            <div className="yogaIntro">Burn Fat Yoga</div>
                            <div className="yogaSessionsQuan">4 Available Sessions</div>
                        </div>
                        <div className="allYogaSessions">
                            {
                                this.state.yogaSessionIndex.map((index) => (
                                    <div className="sessionDateHolder" key={index}>
                                        <div className="sessionDateHeader">{Utils.sessionTime(this.state.yogaSessionData[index][0].startTime)}</div>
                                        {
                                            this.state.yogaSessionData[index].map((session) => (
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

export default Yoga;