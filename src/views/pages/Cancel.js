import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch, Navigate, useLocation } from "react-router-dom";
import Utils from '../../Utils';

import '../scss/Cancel.scss';

import groupImg from '../../images/group.svg';
import yogaImg from '../../images/yoga.svg';
import personalImg from '../../images/personal.svg';

import groupCharImg from '../../images/groupChar.svg';
import yogaCharImg from '../../images/yogaChar.svg';
import personalCharImg from '../../images/personalChar.svg';

import bookingFailImg from '../../images/bookingFail.svg';
import loadingImg from '../../images/loading.svg';
import confirmedImg from '../../images/confirmed.svg';

class Cancel extends React.Component {
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
            confirmedCancelling: null,
            failedCancelling: null,
        };
        this.cancelBooking = this.cancelBooking.bind(this);
    }

    cancelBooking() {
        this.setState({ pageTrigger: 1 })
        Utils.deleteBooking(this.props.session._id)
            .then(res => {
                if (!res.error) {
                    this.setState({ confirmedCancelling: res }, () => { this.setState({ pageTrigger: 3 }) })
                } else {
                    this.setState({ failedCancelling: res }, () => { this.setState({ pageTrigger: 4 }) })
                }
            })
    }

    render() {
        if (this.state.pageTrigger === 1) {
            return (
                <div className="viewSessionHolder">
                    <div className="viewSessionBlock">
                        <div className="cancelLoading"><img src={loadingImg} /></div>
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
                            <button className="makeBookingButton" onClick={() => { this.cancelBooking() }} >Cancel</button>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

export default Cancel;