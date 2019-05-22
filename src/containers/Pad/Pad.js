import React, { Component } from "react";
import "./Pad.css";

export default class Pad extends Component<Props, State>{
    constructor(props) {
        super(props);
        this.state = {
            isCurrent: false,
            active: false,
            flip: false,
        };
    }

    componentDidMount(){
        this.setState({isCurrent: this.props.myKey === this.props.currBeat});
    }

    onClick = (event) => {
        this.props.click(); 
        this.setState({active: !this.state.active})
    }
    
    render(){
        let classes = this.state.active ? "active" : this.state.isCurrent ? "current" : "";

        return(<td key={this.props.myKey} 
                    className={`beat ${classes}`}>
                            <a href="" 
                                    onClick={(event) => this.onClick(event)} 
                            >
                                    {classes}
                            </a>
                 </td>)
    }

}