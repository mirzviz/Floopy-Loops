import React, { Component } from "react";
import samples from "../../../src/samples.json";

export default class SampleSelector extends Component<Props, State> {
    state: {
      open: boolean
    };
  
    constructor(props) {
      super(props);
      this.state = {open: false};
    }
  
    open = (event) => {
      event.preventDefault();
      this.setState({open: true});
    };
  
    close = () => {
      this.setState({open: false});
    };
  
    onChange = (event) => {
      const {id, onChange} = this.props;
      onChange(id, event.target.value);
      this.close();
    };
  
    render() {
      const {current} = this.props;
      const {open} = this.state;
      if (open) {
        return (
          <select className="select" autoFocus value={current} onChange={this.onChange} onBlur={this.close}>
          {
            samples.map((sample, i) => {
              return <option key={i}>{sample}</option>;
            })
          }
          </select>
        );
      } else {
          return (
              <a href="" onClick={this.open} className="button"> 
                      {current} 
              </a>
              );
      }
    }
  }