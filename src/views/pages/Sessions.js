import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch, Navigate, useLocation } from "react-router-dom";
import Utils from '../../Utils';

import '../scss/Sessions.scss';

import Menu from './Menu';

import groupCharImg from '../../images/groupChar.svg';
import yogaCharImg from '../../images/yogaChar.svg';
import personalCharImg from '../../images/personalChar.svg';

class Sessions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <React.Fragment>
                <div className="sessionsScreenHolder">

                    <div className="sessionsHeaderHolder">
                        <Link style={{ textDecoration: "none" }} to="/"><div className="headerGoBackButton">← Go Home</div></Link>
                        <div className="sessionsHeaderTitle">All Future Sessions</div>
                    </div>

                    <div className="sessionTypeHolder">
                        <div className="sessionImgHolder">
                            <img className="sessionImg" src={yogaCharImg} />
                        </div>
                        <div className="sessionInfoHolder">
                            <div className="sessionInfoHeader">Burn Fat Yoga</div>
                            <div className="sessionInfoIntro">Special Asanas To Reduce Belly Fat</div>
                            <Link style={{ textDecoration: "none" }} to="/yoga"><div className="sessionInfoButton">View Sessions</div></Link>
                        </div>
                    </div>

                    <div className="sessionTypeHolder">
                        <div className="sessionImgHolder">
                            <img className="sessionImg" src={groupCharImg} />
                        </div>
                        <div className="sessionInfoHolder">
                            <div className="sessionInfoHeader">Group Fitness Session</div>
                            <div className="sessionInfoIntro">Ideal For Complete Body Workout</div>
                            <Link style={{ textDecoration: "none" }} to="/group"><div className="sessionInfoButton">View Sessions</div></Link>
                        </div>
                    </div>

                    <div className="sessionTypeHolder">
                        <div className="sessionImgHolder">
                            <img className="sessionImg" src={personalCharImg} />
                        </div>
                        <div className="sessionInfoHolder">
                            <div className="sessionInfoHeader">Personal Training Session</div>
                            <div className="sessionInfoIntro">Muscular Imbalances, Proper Form, And Good Posture</div>
                            <Link style={{ textDecoration: "none" }} to="/personal"><div className="sessionInfoButton">View Sessions</div></Link>
                        </div>
                    </div>
                    <Menu currentUserData={this.props.currentUserData} />
                </div>
            </React.Fragment>
        )
    }
}

export default Sessions;