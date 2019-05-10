import React from 'react'
import './InfoWindow.css'

export default class InfoWindow extends React.Component {
    constructor(props) {
        super(props);

        this.getClasses = this.getClasses.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    getClasses() {
        let classes = 'info-window';
        if (this.props.visible) {
            classes += ' visible'
        }
        return classes;
    }

    handleClick() {
        this.props.clickOK();
    }

    render() {
        return (
            <div className={this.getClasses()}>
                <p>{this.props.info}</p>
                <button onClick={this.handleClick}>OK</button>
            </div>
        )
    }
}