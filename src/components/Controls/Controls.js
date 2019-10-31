import React, { Component } from "react";
import { Button,Dialog,DialogActions,DialogContent,DialogTitle,
  FABButton,Icon,Slider,Switch,} from "react-mdl";
import "./Controls.css";
import 'rc-input-number/assets/index.css';
import InputNumber from 'rc-input-number';

const Controls =({bpm, updateBPM, playing, 
                    start, stop, addTrack, share, numOfBars, numOfBeatsInABar,
                    updateNumberOfBars, updateNumberOfBeatsInABar}) => {
                       
    
    return (
            <span className="container">
                  <FABButton 
                    ripple 
                    onClick={addTrack} 
                    title="Add new track"
                  >
                      <Icon name="add" />
                  </FABButton>

                  <FABButton ripple onClick={playing ? stop : start}>
                      <Icon name={playing ? "stop" : "play_arrow"} />
                  </FABButton>
          
                  <FABButton 
                    onClick={share} 
                    title="Share"
                  >
                      <Icon name="share" />
                  </FABButton>

                  <span>bpm:</span>
                  <input 
                    type="number" 
                    value={bpm} 
                    onChange={event => updateBPM(parseInt(event.target.value, 10))} 
                  />
      
                  <span>bars:</span>
                  <input 
                    type="number" 
                    min={1} 
                    max={20} 
                    value={numOfBars} 
                    onChange={event => updateNumberOfBars(parseInt(event.target.value, 10))} 
                  />

                  <span>beats per bar:</span>
                  <input  
                    type="number" 
                    min={3} 
                    max={5} 
                    value={numOfBeatsInABar} 
                    onChange={event => updateNumberOfBeatsInABar(parseInt(event.target.value, 10))} 
                  />
            </span>
    );
  }

  export default Controls;