
import type { Track, EncodedTrack } from "../../types.js";
import Tone from "tone";
import React, { Component } from "react";
import { Button,Dialog,DialogActions,DialogContent,DialogTitle,
    FABButton,Icon,Slider,Switch,} from "react-mdl";
import "react-mdl/extra/css/material.light_blue-pink.min.css";
import "react-mdl/extra/material.js";
import "./TrackListView.css";
import SampleSelector from '../../containers/SampleSelector/SampleSelector'
import * as sequencer from "../../sequencer";
import * as model from "../../model";
import samples from "../../samples.json";
import Pad from "../../containers/Pad/Pad";

    const TrackListView = ({ tracks,
                            currentBeat,
                            toggleTrackBeat,
                            setTrackVolume,
                            updateTrackSample,
                            muteTrack,
                            randomSong,
                            numOfTracks,
                            clearTrack,
                            deleteTrack,
                            numOfBars,
                            numOfBeatsInABar,
                          }) => 
    {
    return (
      <table>
      <tbody>{
        tracks.map((track, i) => {
          return (
            <tr key={i} className="track">
              <th>{i}</th>
              
              {
                track.beats.map((beat, beatIndex) => {
      
                  return (
                    <Pad 
                        key={beatIndex} 
                        myKey={beatIndex}
                        currBeat={currentBeat}
                        click={ (event) => {
                                          toggleTrackBeat(track.id, beatIndex)
                                          }
                              }
                        numberOfBeatsInABar={numOfBeatsInABar}
                    >
                    </Pad>
           );})
              }
              <td>
                <SampleSelector id={track.id} current={track.name} onChange={updateTrackSample} />
              </td>
              <td className="vol">
                <Slider min={0} max={1} step={.1} value={track.vol}
                  onChange={event => setTrackVolume(track.id, parseFloat(event.target.value))} />
              </td>
              <td className="mute">
                <Switch defaultChecked={!track.muted} onChange={event => muteTrack(track.id)} />
              </td>

              <td>
                  {
                    track.beats.some(beat => beat) ? 
                  <a href="" 
                      title="Clear track" 
                      onClick={event => {
                                          event.preventDefault();
                                          clearTrack(track.id, numOfBars * numOfBeatsInABar);
                                        }}>
                      <Icon name="delete"/>
                      </a> :
                      <Icon className="disabled-icon" name="delete"/>
                  }
                  <a href="" title="Delete track" onClick={event => {
                                                          event.preventDefault();
                                                          deleteTrack(track.id);
                                                          }}
                  >
                  <Icon name="delete_forever"/></a>
              </td>

            </tr>
          );
        })
      }</tbody>
      </table>
    );
  }

  export default TrackListView;