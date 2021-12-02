import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch, Navigate, useLocation } from "react-router-dom";
import Utils from '../../Utils';

import '../scss/Booking.scss'

import groupImg from '../../images/group.svg';
import yogaImg from '../../images/yoga.svg';
import personalImg from '../../images/personal.svg';

import groupCharImg from '../../images/groupChar.svg';
import yogaCharImg from '../../images/yogaChar.svg';
import personalCharImg from '../../images/personalChar.svg';

import bookingFailImg from '../../images/bookingFail.svg';
import loadingImg from '../../images/loading.svg';
import confirmedImg from '../../images/confirmed.svg';

class Booking extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // page index
            // 1 = loading page
            // 2 = showing detail of session page
            // 3 = booking success
            // 4 = booking error page
            // 5 = go see my booking page
            pageTrigger: 2,
            confirmedBooking: null,
            failedBooking: null,
        };
        this.makeNewBooking = this.makeNewBooking.bind(this);
    }

    makeNewBooking() {
        this.setState({ pageTrigger: 1 })
        Utils.makeBooking(this.props.session._id, this.props.currentUserData._id)
            .then(res => {
                if (!res.error) {
                    this.setState({ confirmedBooking: res }, () => { this.setState({ pageTrigger: 3 }) })
                } else {
                    this.setState({ failedBooking: res }, () => { this.setState({ pageTrigger: 4 }) })
                }
            })
    }

    render() {
        if (this.state.pageTrigger === 1) {
            return (
                <div className="viewSessionHolder">
                    <div className="viewSessionBlock">
                        <div className="bookingLoading"><img src={loadingImg} /></div>
                    </div>
                </div>
            )
        } else if (this.state.pageTrigger === 2) {
            let SD = this.props.session;
            return (
                <div className="viewSessionHolder">
                    <div className="viewSessionBlock">
                        <div className="viewSessionHeaderHolder">
                            {
                                SD.sessionType == 'yoga' && <div className="viewSessionIcon"><img src={yogaCharImg} /></div>
                                || SD.sessionType == 'group' && <div className="viewSessionIcon"><img src={groupCharImg} /> </div>
                                || SD.sessionType == 'personal' && <div className="viewSessionIcon"><img src={personalCharImg} /> </div>
                            }

                            {
                                SD.sessionType == 'yoga' && <div className="viewSessionTitle"> Yoga Fitness Session </div>
                                || SD.sessionType == 'group' && <div className="viewSessionTitle"> Group Fitness Session </div>
                                || SD.sessionType == 'personal' && <div className="viewSessionTitle"> Personal Training Session </div>
                            }
                        </div>

                        <div className="bookingDayTime">
                            <div className="sessionTime">{Utils.sessionTime(SD.startTime)}</div>
                            <div className="sessionHour">{Utils.sessionHour(SD.startTime, SD.endTime)}</div>
                            <div className="sessionRoom">Room: {SD.roomNumber}</div>
                        </div>

                        <div className="viewSessionButtons">
                            <button className="returnButton" onClick={() => this.props.clearSelectedSession()}>Close</button>
                            <button className="makeBookingButton" onClick={() => { this.makeNewBooking() }} >Enroll</button>
                        </div>
                    </div>
                </div>
            )
        } else if (this.state.pageTrigger === 3) {
            return (
                <div className="viewSessionHolder">
                    <div className="viewSessionBlock">
                        <div className="sessionBookingSuccess">
                            <div className="bookingSuccessIcon"><img src={confirmedImg} /></div>
                            <div className="bookingSuccessTitle">Booking Success!</div>
                        </div>

                        <div className="viewSessionButtons">
                            <button className="returnButton" onClick={() => this.props.clearSelectedSession()}>Close</button>
                        </div>
                        
                    </div>
                </div>
            )
        } else if (this.state.pageTrigger === 4) {
            console.log(this.state.failedBooking)
            return (
                <div className="viewSessionHolder">
                    <div className="viewSessionBlock">
                        <div className="sessionBookingFail">
                            <div className="bookingFailIcon"><img src={bookingFailImg} /></div>
                            <div className="bookingFailTitle">Booking Fail</div>
                        </div>
                        <div className="bookingFailMessage">{this.state.failedBooking.message}</div>

                        <div className="viewSessionButtons">
                            <button className="returnButton" onClick={() => this.props.clearSelectedSession()}>Close</button>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

export default Booking;