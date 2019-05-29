import TrackListView from '../../components/TrackListView/TrackListView'
import type { Track, EncodedTrack } from "../../types.js";
import Tone from "tone";
import React, { Component } from "react";
import { Button,Dialog,DialogActions,DialogContent,DialogTitle,
  FABButton,Icon,Slider,Switch,} from "react-mdl";
import "./App.css";
import "react-mdl/extra/css/material.light_blue-pink.min.css";
import "react-mdl/extra/material.js";
import * as sequencer from "../../sequencer";
import * as model from "../../model";
import samples from "../../samples.json";
import Controls from '../../components/Controls/Controls';
import ShareDialog from '../../components/ShareDialog/ShareDialog'

class App extends Component<Props, State> {
  loop: Tone.Sequence;
  state: {
    bpm: number,
    currentBeat: number,
    playing: boolean,
    tracks: Track[],
    shareHash: ?string,
    numOfTracks: number,
    numOfBars: number,
    numOfBeatsInABar: number
  };

  constructor(props: {}) {
    super(props);

    this.initializeState();
  }

  initializeState() {
    this.state = {
      bpm: 120,
      playing: false,
      currentBeat: -1,
      shareHash: null,
      numOfTracks: 4,
      numOfBars: 2,
      numOfBeatsInABar: 5,
      tracks: model.initTracks(4, 10)
    };
    // this.loop = sequencer.create(this.state.tracks, this.updateCurrentBeat, this.state.numOfBars * this.state.numOfBeatsInABar, this.state.bpm);
    // sequencer.updateBPM(this.state.bpm);
  }

  componentDidMount(){
    
  }

  start = () => {
    console.log(this.state.tracks);
    var context = new AudioContext();
    this.setState({
      playing: true,
      tracks: model.updateTracks(this.state.tracks, this.state.numOfTracks, this.state.numOfBars * this.state.numOfBeatsInABar)
    }, () => {
        this.loop = sequencer.create(this.state.tracks, this.updateCurrentBeat, this.state.numOfBars * this.state.numOfBeatsInABar, this.state.bpm);
        sequencer.updateBPM(this.state.bpm);
        this.loop.start();
    });
  };
  
  stop = () => {
    console.log(this.state.tracks);
    this.loop.stop();
    this.setState({currentBeat: -1, playing: false});
  };

  updateCurrentBeat = (beat: number): void => {
    this.setState({currentBeat: beat});
  };

  updateTracks = (newTracks: Track[]) => {
    if(this.loop){
      this.loop = sequencer.update(this.loop, newTracks, this.updateCurrentBeat);
    }
    this.setState({tracks: newTracks});
  }

  addTrack = () => {
    const {tracks} = this.state;
    this.updateTracks(model.addTrack(tracks));
  };

  clearTrack = (id: number,  numOfBeats: number) => {
    const {tracks} = this.state;
    this.updateTracks(model.clearTrack(tracks, id, numOfBeats));
  };

  deleteTrack = (id: number) => {
    const {tracks} = this.state;
    this.updateTracks(model.deleteTracks(tracks, id));
  };

  toggleTrackBeat = (id: number, beat: number) => {
    const oldTracks = this.state.tracks;
    let newTracks = model.toggleTrackBeat(oldTracks, id, beat);
    this.updateTracks(newTracks);
  };

  setTrackVolume = (id: number, vol: number) => {
    const {tracks} = this.state;
    this.updateTracks(model.setTrackVolume(tracks, id, vol));
  };

  muteTrack = (id: number) => {
    const {tracks} = this.state;
    this.updateTracks(model.muteTrack(tracks, id));
  };

  updateBPM = (newBpm: number) => {
    sequencer.updateBPM(newBpm);
    this.setState({bpm: newBpm});
  };

  updateTrackSample = (id: number, sample: string) => {
    const {tracks} = this.state;
    this.updateTracks(model.updateTrackSample(tracks, id, sample));
  };

  closeDialog = () => {
    this.setState({shareHash: null});
  };

  randomSong = () => {
    const {bpm, tracks} = model.randomSong();
    this.updateTracks(tracks);
    this.updateBPM(bpm);
  };

  share = () => {
    const {bpm, tracks} = this.state;
    const shareHash = btoa(JSON.stringify({
      bpm,
      tracks: model.encodeTracks(tracks),
    }));
    this.setState({shareHash});
  };

  // updateNumberOfBars = (newNumOfBars) => {
  //   console.log(newNumOfBars);
  //   this.stop();
  //   this.setState({
  //     numOfBars: newNumOfBars,
  //     tracks: model.initTracks(this.state.numOfTracks, newNumOfBars * this.state.numOfBeatsInABar)
  //   });
  // };

  render() {
    const {bpm, currentBeat, playing, shareHash, tracks, trackLengths, numOfTracks, numOfBars, numOfBeatsInABar} = this.state;
    const {updateBPM, start, stop, addTrack, share, randomSong, closeDialog, updateNumberOfBars} = this;
    return (
      <div className="app">
        <h3 className="header">Floopy Loops</h3>
        {
          shareHash ? <ShareDialog hash={shareHash} closeDialog={closeDialog} /> : null
        }

        <table>
          <TrackListView
            tracks={tracks}
            currentBeat={currentBeat}
            toggleTrackBeat={this.toggleTrackBeat}
            setTrackVolume={this.setTrackVolume}
            updateTrackSample={this.updateTrackSample}
            muteTrack={this.muteTrack}
            randomSong={this.randomSong}
            numOfTracks={this.numOfTracks}
            clearTrack={this.clearTrack}
            deleteTrack={this.deleteTrack} 
            numOfBars = {this.state.numOfBars}
            numOfBeatsInABar = { this.state.numOfBeatsInABar}
            />
          <Controls {...{bpm, updateBPM, playing, start, stop, addTrack, share, numOfBars, numOfBeatsInABar, updateNumberOfBars}} />
        </table>
      </div>
    );
  }
}

export default App;
