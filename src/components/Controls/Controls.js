import React, { Component } from "react";
import { Button,Dialog,DialogActions,DialogContent,DialogTitle,
  FABButton,Icon,Slider,Switch,} from "react-mdl";

const Controls =({bpm, updateBPM, playing, 
                    start, stop, addTrack, share}) => {

    const onChange = event => updateBPM(parseInt(event.target.value, 10));
    
    return (
      <tfoot className="controls">
        <tr>
          <td style={{textAlign: "right"}}>
            <FABButton ripple onClick={addTrack} title="Add new track">
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
            BPM <input type="number" value={bpm} onChange={onChange} />
          </td>
          <td colSpan="13">
            <Slider min={30} max={240} value={bpm} onChange={onChange} />
          </td>
          <td colSpan="2">
            <FABButton onClick={share} title="Share">
              <Icon name="share" />
            </FABButton>
          </td>
        </tr>
      </tfoot>
    );
  }

  export default Controls;