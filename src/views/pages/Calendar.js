import React from 'react';

import '../scss/Calendar.scss';

import arrowLeftImg from '../../images/arrowLeft.svg';
import arrowRightImg from '../../images/arrowRight.svg';

class Calendar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            daysOfTheWeek: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'],
            months: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
            leapMonth: null,
            nowYear: null,
            nowMonth: null,
            nowDay: null,

            spaceInitMonth: null,

            currentSelectedId: null,
            currentSelectedDate: null,
        };
    }

    goNextMonth() {
        this.props.getDateFromCalendar(-1, -1, -1)
        if(this.state.currentSelectedId != null) {
            let removeDayDiv = document.getElementById(this.state.currentSelectedId);
            removeDayDiv.className = "weekSpace";
            this.setState({ currentSelectedId: null, currentSelectedDate: null })
        }
        
        if (this.state.nowMonth === 11) {
            let nextYear = this.state.nowYear + 1;

            let nowDate = new Date(nextYear, 0, 1);
            let nowMonth = nowDate.getMonth();
            let nowDay = nowDate.getDate();
            let nowYear = nowDate.getFullYear();

            let days = null;
            if (nowYear % 4 === 0 && nowYear % 100 !== 0) {
                days = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
            } else if (nowYear % 400 === 0) {
                days = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
            } else {
                days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
            };

            let getWeekDayPending = new Date(nowYear + "/" + (nowMonth + 1) + "/" + "1")
            let initWeekDay = getWeekDayPending.getDay() - 1;

            console.log(initWeekDay)

            let spaceInitMonth = [];
            if (initWeekDay === 0) {
                //pass
            } else if (initWeekDay < 0) {
                spaceInitMonth = Array.from(Array(7 - initWeekDay).keys())
            } else {
                spaceInitMonth = Array.from(Array(initWeekDay).keys())
            }
            this.setState({ nowDay: nowDay, nowMonth: nowMonth, nowYear: nowYear, leapMonth: days, spaceInitMonth: spaceInitMonth });

        } else {
            let nextMonth = this.state.nowMonth + 1;

            let nowDate = new Date(this.state.nowYear, nextMonth, 1);
            let nowMonth = nowDate.getMonth();
            let nowDay = nowDate.getDate();
            let nowYear = nowDate.getFullYear();

            let days = null;
            if (nowYear % 4 === 0 && nowYear % 100 !== 0) {
                days = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
            } else if (nowYear % 400 === 0) {
                days = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
            } else {
                days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
            };

            let getWeekDayPending = new Date(nowYear + "/" + (nowMonth + 1) + "/" + "1")
            let initWeekDay = getWeekDayPending.getDay() - 1;

            console.log(initWeekDay)

            let spaceInitMonth = [];
            if (initWeekDay === 0) {
                //pass
            } else if (initWeekDay < 0) {
                spaceInitMonth = Array.from(Array(7 - initWeekDay).keys())
            } else {
                spaceInitMonth = Array.from(Array(initWeekDay).keys())
            }
            this.setState({ nowDay: nowDay, nowMonth: nowMonth, nowYear: nowYear, leapMonth: days, spaceInitMonth: spaceInitMonth });
        }

    }

    goLastMonth() {
        this.props.getDateFromCalendar(-1, -1, -1)
        if(this.state.currentSelectedId != null) {
            let removeDayDiv = document.getElementById(this.state.currentSelectedId);
            removeDayDiv.className = "weekSpace";
            this.setState({ currentSelectedId: null, currentSelectedDate: null })
        }

        if (this.state.nowMonth === 0) {
            let nextYear = this.state.nowYear - 1;

            let nowDate = new Date(nextYear, 11, 1);
            let nowMonth = nowDate.getMonth();
            let nowDay = nowDate.getDate();
            let nowYear = nowDate.getFullYear();

            let days = null;
            if (nowYear % 4 === 0 && nowYear % 100 !== 0) {
                days = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
            } else if (nowYear % 400 === 0) {
                days = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
            } else {
                days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
            };

            let getWeekDayPending = new Date(nowYear + "/" + (nowMonth + 1) + "/" + "1")
            let initWeekDay = getWeekDayPending.getDay() - 1;

            console.log(initWeekDay)

            let spaceInitMonth = [];
            if (initWeekDay === 0) {
                //pass
            } else if (initWeekDay < 0) {
                spaceInitMonth = Array.from(Array(7 - initWeekDay).keys())
            } else {
                spaceInitMonth = Array.from(Array(initWeekDay).keys())
            }
            this.setState({ nowDay: nowDay, nowMonth: nowMonth, nowYear: nowYear, leapMonth: days, spaceInitMonth: spaceInitMonth });

        } else {
            let nextMonth = this.state.nowMonth - 1;

            let nowDate = new Date(this.state.nowYear, nextMonth, 1);
            let nowMonth = nowDate.getMonth();
            let nowDay = nowDate.getDate();
            let nowYear = nowDate.getFullYear();

            let days = null;
            if (nowYear % 4 === 0 && nowYear % 100 !== 0) {
                days = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
            } else if (nowYear % 400 === 0) {
                days = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
            } else {
                days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
            };

            let getWeekDayPending = new Date(nowYear + "/" + (nowMonth + 1) + "/" + "1")
            let initWeekDay = getWeekDayPending.getDay() - 1;

            console.log(initWeekDay)

            let spaceInitMonth = [];
            if (initWeekDay === 0) {
                //pass
            } else if (initWeekDay < 0) {
                spaceInitMonth = Array.from(Array(7 - initWeekDay).keys())
            } else {
                spaceInitMonth = Array.from(Array(initWeekDay).keys())
            }
            this.setState({ nowDay: nowDay, nowMonth: nowMonth, nowYear: nowYear, leapMonth: days, spaceInitMonth: spaceInitMonth });
        }
    }

    componentDidMount() {
        let nowDate = new Date();
        let nowMonth = nowDate.getMonth();
        let nowDay = nowDate.getDate();
        let nowYear = nowDate.getFullYear();

        let days = null;
        if (nowYear % 4 === 0 && nowYear % 100 !== 0) {
            days = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        } else if (nowYear % 400 === 0) {
            days = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        } else {
            days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        };

        let getWeekDayPending = new Date(nowYear + "/" + (nowMonth + 1) + "/" + "1")
        let initWeekDay = getWeekDayPending.getDay() - 1;
        let spaceInitMonth = Array.from(Array(initWeekDay).keys())

        this.setState({ nowDay: nowDay, nowMonth: nowMonth, nowYear: nowYear, leapMonth: days, spaceInitMonth: spaceInitMonth });
    }

    selectDate(itr) {
        if (this.state.currentSelectedId === null) {
            this.setState({ currentSelectedId: ("ele" + itr), currentSelectedDate: itr }, () => {
                let dayDiv = document.getElementById("ele" + itr);
                console.log(dayDiv.className)
                dayDiv.className = "weekSpaceActive";
                console.log(dayDiv.className)
                this.props.getDateFromCalendar(this.state.currentSelectedDate, this.state.nowMonth + 1, this.state.nowYear)
            })
        } else {
            let removeDayDiv = document.getElementById(this.state.currentSelectedId);
            removeDayDiv.className = "weekSpace";
            this.setState({ currentSelectedId: ("ele" + itr), currentSelectedDate: itr }, () => {
                let dayDiv = document.getElementById("ele" + itr);
                dayDiv.className = "weekSpaceActive";
                this.props.getDateFromCalendar(this.state.currentSelectedDate, this.state.nowMonth, this.state.nowYear)
            })
        }
    }

    // reset the calendar, remove everything everything but keep the year
    // month change will fire up change of year

    render() {
        if (this.state.spaceInitMonth != null) {
            return (
                <div className="calendarHolder">
                    <div className="lastMonth" onClick={() => { this.goLastMonth() }}><img src={arrowLeftImg} /></div>

                    <div className="calendarDisplay">
                        <div className="calendarShowMonth">{this.state.currentSelectedDate} {this.state.months[this.state.nowMonth]} {this.state.nowYear}</div>
                        <div className="calendarHeader">
                            {
                                this.state.daysOfTheWeek.map((theDay) => (
                                    <div className="weekDay" key={theDay}>{theDay}</div>
                                ))
                            }
                        </div>
                        <div className="calendarBody">
                            {
                                this.state.spaceInitMonth.length != 0 && this.state.spaceInitMonth.map((space) => (
                                    <div className="weekSpace" key={(space - 15)}></div>
                                ))
                            }
                            {
                                Array.from(Array(this.state.leapMonth[this.state.nowMonth]).keys()).map((calDay) => (
                                    <div className="weekSpace" id={"ele" + (calDay + 1)} key={calDay + 1} onClick={() => { this.selectDate(calDay + 1) }}>{(calDay + 1)}</div>
                                ))
                            }
                        </div>
                    </div>

                    <div className="nextMonth" onClick={() => { this.goNextMonth() }}><img src={arrowRightImg} /></div>
                </div>

            )
        } else {
            return (
                <div>loading</div>
            )
        }
    }
}

export default Calendar;