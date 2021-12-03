import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch, Navigate, useLocation } from "react-router-dom";
import Utils from '../../Utils';
import '../scss/Popup.scss'

class Popup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowMenu: false,
        };
        this.popupDiv = React.createRef;
    }

    render() {
        if (this.props.popupMessage === null) {
            return (
                null
            )
        } else {
            return (
                <div className="popupWindowHolder" ref={this.popupDiv}>
                    {this.props.popupMessage}
                </div>
            )
        }
    }
}

export default Popup;