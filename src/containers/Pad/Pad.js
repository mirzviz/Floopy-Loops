import React, { PureComponent } from "react";
import "./Pad.css";

export default class Pad extends PureComponent{
    constructor(props) {
        super(props);
        this.state = {
            isCurrent: false,
            active: false,
            flip: false
        };
    }

    // static getDerivedStateFromProps(props, state){
    //     if(props.myKey === props.currBeat)
    //     {
    //         console.log('props.myKey === props.currBeat');
    //     }
        
    //     return {
    //         ...state,
    //         isCurrent: props.myKey === props.currBeat
    //     }
    // }

    componentDidUpdate(){
        //let str = this.state.isCurrent ? `current` : this.state.active ? `active` : `` ;
        //let newClasses = this.state.classes + str;
        this.setState({
            isCurrent: this.props.myKey === this.props.currBeat
        })
    }

    onClick = () => {
        this.setState({
                        active: !this.state.active,
                        flip: !this.state.flip
                    });
        this.props.click(); 
    }
    
    getClasses(){
        let classes;
        if(this.props.numberOfBeatsInABar === 3)
            classes= `beat3 `;
        if(this.props.numberOfBeatsInABar === 4)
            classes= `beat4 `;
        if(this.props.numberOfBeatsInABar === 5)
            classes= `beat5 `;

        let str = ``; //= this.state.isCurrent ? `current` : this.state.active ? `active` : `` ;
        if(this.state.isCurrent === true){
            str = `current`;
        }
        else
        {
            if(this.state.active === true)
            {
                str = `active`;
            }
            if(this.state.flip === true)
            {
                str = str + ` flip`;
            }
        }
        classes = classes + str;
        
        return classes;
    }

    render(){
        // this.state.classes = this.state.isCurrent ? 'current' : this.state.active ? 'active' : '';
        // if(this.state.flip == true){
        //     classes = classes + ' flip';
        //     console.log(classes);
        // }

        let classes = this.getClasses();
        return(<td 
                    className={`${classes}`}
                >
                            <a className="fullsize" href="" 
                                    onClick={(event) => {
                                        event.preventDefault(); 
                                        this.onClick();
                                    }} 
                            >
                              
                            </a>
                 </td>)
    }

}