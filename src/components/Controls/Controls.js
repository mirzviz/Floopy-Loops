import React, { Component } from "react";
import { Button,Dialog,DialogActions,DialogContent,DialogTitle,
  FABButton,Icon,Slider,Switch,} from "react-mdl";
import "./Controls.css";

const Controls =({bpm, updateBPM, playing, 
                    start, stop, addTrack, share, numOfBars, numOfBeatsInABar,
                    updateNumberOfBars, updateNumberOfBeatsInABar}) => {
                       
    
    return (
      <tfoot className="controls">
        <tr>
          <td style={{textAlign: "right"}}>
              <FABButton 
                ripple 
                onClick={addTrack} 
                title="Add new track"
              >
                  <Icon name="add" />
              </FABButton>
          </td>

          <td />

          <td>
              <FABButton ripple onClick={playing ? stop : start}>
                 <Icon name={playing ? "stop" : "play_arrow"} />
              </FABButton>
          </td>

          <td colSpan="2" className="bpm">
              <input 
                type="number" 
                value={bpm} 
                onChange={event => updateBPM(parseInt(event.target.value, 10))} 
              />
                BPM
          </td>
          <td colSpan="13">
              <Slider 
                min={30} 
                max={240} 
                value={bpm} 
                onChange={event => updateBPM(parseInt(event.target.value, 10))} 
              />
          </td>

          <td colSpan="2">
              <FABButton 
                onClick={share} 
                title="Share"
              >
                  <Icon name="share" />
              </FABButton>
          </td>
      
        </tr>

        <tr>
            <td colSpan="2" className="bpm">
                  <input 
                    type="number" 
                    value={numOfBars} 
                    onChange={event => updateNumberOfBars(parseInt(event.target.value, 10))} 
                  />
                  Number Of Bars
              </td>
              <td colSpan="13">
                  <Slider 
                    min={1} 
                    max={20} 
                    value={numOfBars} 
                    onChange={event => updateNumberOfBars(parseInt(event.target.value, 10))} 
                  />
              </td>
        </tr>

        <tr>
        <td colSpan="2" className="bpm">
                  <input 
                    type="number" 
                    value={numOfBeatsInABar} 
                    onChange={event => updateNumberOfBeatsInABar(parseInt(event.target.value, 10))} 
                  />
                  Number of beats in a bar
              </td>
              <td colSpan="13">
                  <Slider 
                    min={3} 
                    max={5} 
                    value={numOfBeatsInABar} 
                    onChange={event => updateNumberOfBeatsInABar(parseInt(event.target.value, 10))} 
                  />
              </td>
        </tr>

      </tfoot>
    );
  }

  export default Controls;