import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch, Navigate, useLocation } from "react-router-dom";
import Utils from '../../Utils';
import Menu from './Menu';

import '../scss/Createsession.scss';

import groupImg from '../../images/group.svg';
import yogaImg from '../../images/yoga.svg';
import personalImg from '../../images/personal.svg';
import more from '../../images/more.svg';

import groupCharImg from '../../images/groupChar.svg';
import yogaCharImg from '../../images/yogaChar.svg';
import personalCharImg from '../../images/personalChar.svg';

import bookingFailImg from '../../images/bookingFail.svg';
import loadingImg from '../../images/loading.svg';
import confirmedImg from '../../images/confirmed.svg';

import Calendar from './Calendar';

class Createsession extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

            dateDay: -1,
            dateMonth: -1,
            dateYear: -1,

            startHour: 8,
            startMinute: 30,
            endHour: 8,
            endMinute: 45,

            roomNumber: 105,
            attendeeLimit: 15,

            // pageTrigger index
            // 1 is enter date and time page
            // 2 is select session type and data page
            // 3 is loading page
            // 4 is back to admin home with message box
            // 5 is showing added successful page
            pageTrigger: 1,

            currentType: "",
        };
        this.getDateFromCalendar = this.getDateFromCalendar.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleNextSubmit = this.handleNextSubmit.bind(this);
        this.changeType = this.changeType.bind(this);
        this.returnTimeSelectPage = this.returnTimeSelectPage.bind(this);
        this.handleCreateSubmit = this.handleCreateSubmit.bind(this);
    }

    handleChange(event) {
        const value = event.target.value;
        const name = event.target.name;
        this.setState({ [name]: value });
    }

    getDateFromCalendar(day, month, year) {
        this.setState({ dateDay: day, dateMonth: month, dateYear: year })
    }

    handleNextSubmit(event) {
        event.preventDefault();

        if (
            this.state.dateDay < 0 ||
            this.state.dateMonth < 0 ||
            this.state.dateYear < 0
        ) {
            console.log("Please Select Date");
            this.setState({ pageTrigger: 2 });
        } else if (
            parseInt(this.state.endHour, 10) === parseInt(this.state.startHour, 10) && parseInt(this.state.endMinute, 10) <= parseInt(this.state.startMinute, 10) ||
            parseInt(this.state.endHour, 10) < parseInt(this.state.startHour, 10)
        ) {
            console.log("please enter correct time")
        } else {
            this.setState({ pageTrigger: 2 })
        }
    }

    async handleCreateSubmit(event) {
        event.preventDefault();

        this.setState({ pageTrigger: 3 })

        if (
            this.state.dateDay < 0 ||
            this.state.dateMonth < 0 ||
            this.state.dateYear < 0 ||
            this.state.currentType === ""
        ) {
            this.setState({ pageTrigger: 2 }, ()=> {
                console.log("Data Not Enough")
            })
        } else {
            let startTimePending = new Date(this.state.dateYear, this.state.dateMonth - 1, this.state.dateDay,
                this.state.startHour, this.state.startMinute, 0);

            let endTimePending = new Date(this.state.dateYear, this.state.dateMonth - 1, this.state.dateDay,
                this.state.endHour, this.state.endMinute, 0);
            // get formdata ready date etc

            let durationPending = (endTimePending.getTime() - startTimePending.getTime()) / 60000;

            let formData = new FormData();
            formData.append('startTime', startTimePending.getTime());
            formData.append('endTime', endTimePending.getTime());
            formData.append('roomNumber', this.state.roomNumber);
            formData.append('duration', durationPending);
            formData.append('sessionType', this.state.currentType);
            formData.append('attendeeLimit', this.state.attendeeLimit);

            let createResponse = await Utils.createNewSession(formData);
            if (createResponse.error) {
                this.setState({ pageTrigger: 2 }, () => {
                    console.log(createResponse.message)
                })
            } else {
                this.setState({ pageTrigger: 5 })
            }
        }
    }

    changeType(str) {
        this.setState({ currentType: str })
    }

    returnTimeSelectPage() {
        this.setState({ pageTrigger: 1 })
    }

    render() {
        if (this.props.currentUserData === null) {
            console.log("no user data")
            return (
                <Navigate to="/account" />
            )
        } else {
            if (this.state.pageTrigger === 1) {
                return (
                    <React.Fragment>
                        <div className="createSessionScreenHolder">
                            <div className="createSessionHeaderHolder">
                                <div className="createSessionHeaderTitle">Create New Session</div>
                            </div>

                            <div className="calendarSection">
                                <Calendar getDateFromCalendar={this.getDateFromCalendar} parentSelectedDay={this.state.dateDay} />
                            </div>

                            <div className="sessionTimeHolder">
                                <form className="timeForm" onSubmit={this.handleNextSubmit}>
                                    <div className="formSection">
                                        <div className="startTimeForm">
                                            <div className="startTimeFormInput">
                                                <div className="inputText">Start</div><input type="number" min="0" max="23" placeholder='Hour' name='startHour' required value={this.state.startHour} onChange={this.handleChange} /><input type="number" min="0" max="59" placeholder="Min" name='startMinute' required value={this.state.startMinute} onChange={this.handleChange} />
                                            </div>
                                        </div>
                                        <div className="endTimeForm">
                                            <div className="endTimeFormInput">
                                                <div className="inputText">Finish</div><input type="number" min="0" max="23" placeholder='Hour' name='endHour' required value={this.state.endHour} onChange={this.handleChange} /><input type="number" min="0" max="59" placeholder="Min" name='endMinute' required value={this.state.endMinute} onChange={this.handleChange} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="projectConfirmButton">
                                        <input type='submit' value='Next' />
                                    </div>
                                </form>
                            </div>
                            <Menu currentUserData={this.props.currentUserData} />
                        </div>
                    </React.Fragment >
                )
            } else if (this.state.pageTrigger === 2) {
                return (
                    <React.Fragment>
                        <div className="createSessionScreenHolder">

                            <div className="createSessionHeaderHolder">
                                <div className="createSessionHeaderTitle">Create New Session</div>
                            </div>

                            <div className="createSessionTypeHolder">
                                <div className="TypeImgHolder">
                                    {
                                        this.state.currentType === "" && <img className="typeImg" src={bookingFailImg} /> ||
                                        this.state.currentType === "yoga" && <img className="typeImg" src={yogaCharImg} /> ||
                                        this.state.currentType === "personal" && <img className="typeImg" src={personalCharImg} /> ||
                                        this.state.currentType === "group" && <img className="typeImg" src={groupCharImg} />
                                    }
                                </div>
                                <div className="typePickerHolder">
                                    {this.state.currentType === "yoga" && <div className="typeButtonActive" onClick={() => { this.changeType("yoga") }}>Yoga</div> || this.state.currentType != "yoga" && <div className="typeButton" onClick={() => { this.changeType("yoga") }}>Yoga</div>}
                                    {this.state.currentType === "personal" && <div className="typeButtonActive" onClick={() => { this.changeType("personal") }}>Personal</div> || this.state.currentType != "personal" && <div className="typeButton" onClick={() => { this.changeType("personal") }}>Personal</div>}
                                    {this.state.currentType === "group" && <div className="typeButtonActive" onClick={() => { this.changeType("group") }}>Group</div> || this.state.currentType != "group" && <div className="typeButton" onClick={() => { this.changeType("group") }}>Group</div>}
                                </div>
                            </div>

                            <div className="createSessionStoreHolder">
                                <form className="timeForm" onSubmit={this.handleCreateSubmit}>
                                    <div className="formSection">
                                        <div className="startTimeForm">
                                            <div className="startTimeFormInput">
                                                <div className="inputText">Attendees </div><input type="number" min="0" placeholder='Limit' name='attendeeLimit' required value={this.state.attendeeLimit} onChange={this.handleChange} />
                                            </div>
                                        </div>
                                        <div className="endTimeForm">
                                            <div className="endTimeFormInput">
                                                <div className="inputText">Room </div><input type="text" placeholder='105' name='roomNumber' required value={this.state.roomNumber} onChange={this.handleChange} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="projectConfirmButton">
                                        <div className="backToTimeSelection" onClick={() => { this.returnTimeSelectPage() }}>Back</div>
                                        <input type='submit' value='Create' />
                                    </div>
                                </form>
                            </div>
                            <Menu currentUserData={this.props.currentUserData} />
                        </div>
                    </React.Fragment >
                )
            } else if (this.state.pageTrigger === 3) {
                return (
                    <div className="pageLoadingScreenHolder">
                        <div className="pageLoading"><img src={loadingImg} /></div>
                    </div>
                )
            } else if (this.state.pageTrigger === 4) {
                return (
                    <Navigate to="/admin" />
                )
            } else if (this.state.pageTrigger === 5) {
                return (
                    <div className="viewSessionHolder">
                        <div className="viewSessionBlock">
                            <div className="sessionBookingSuccess">
                                <div className="bookingSuccessIcon"><img src={confirmedImg} /></div>
                                <div className="bookingSuccessTitle">Session Created</div>
                            </div>

                            <div className="viewSessionButtons">
                                <button className="returnButton" onClick={()=>{this.setState({ pageTrigger: 4 })}}>Home</button>
                                <button className="returnButton" onClick={()=>{this.setState({ pageTrigger: 1, dateDay: -1, dateMonth: -1, dateYear: -1, startHour: 8, startMinute: 30, endHour: 8, endMinute: 45, roomNumber: 105, attendeeLimit: 15, })}}>Create More</button>
                            </div>

                        </div>
                    </div>
                )
            }
        }
    }
}

export default Createsession;