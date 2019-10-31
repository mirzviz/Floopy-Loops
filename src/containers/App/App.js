import TrackListView from '../../components/TrackListView/TrackListView'
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

class App extends Component{
  // loop: Tone.Sequence;
  // state: {
  //   bpm: number,
  //   currentBeat: number,
  //   playing: boolean,
  //   tracks: Track[],
  //   shareHash: ?string,
  //   numOfTracks: number,
  //   numOfBars: number,
  //   numOfBeatsInABar: number
  // };

  constructor(props) {
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
      //tracks: model.updateTracksLength(this.state.tracks, this.state.numOfBars * this.state.numOfBeatsInABar)
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

  updateCurrentBeat = (beat) => {
    this.setState({currentBeat: beat});
  };

  updateTracks = (newTracks) => {
    if(this.loop){
      this.loop = sequencer.update(this.loop, newTracks, this.updateCurrentBeat);
    }
    this.setState({tracks: newTracks});
  }

  addTrack = () => {
    const {tracks} = this.state;
    this.updateTracks(model.addTrack(tracks));
  };

  clearTrack = (id,  numOfBeats) => {
    const {tracks} = this.state;
    this.updateTracks(model.clearTrack(tracks, id, numOfBeats));
  };

  deleteTrack = (id) => {
    const {tracks} = this.state;
    this.updateTracks(model.deleteTracks(tracks, id));
  };

  toggleTrackBeat = (id, beat) => {
    console.log("old", this.state.tracks);
    let newTracks = model.toggleTrackBeat(this.state.tracks, id, beat);
    console.log("new", newTracks);
    this.updateTracks(newTracks);
  };

  setTrackVolume = (id, vol) => {
    const {tracks} = this.state;
    this.updateTracks(model.setTrackVolume(tracks, id, vol));
  };

  muteTrack = (id) => {
    const {tracks} = this.state;
    this.updateTracks(model.muteTrack(tracks, id));
  };

  updateBPM = (newBpm) => {
    sequencer.updateBPM(newBpm);
    this.setState({bpm: newBpm});
  };

  updateTrackSample = (id, sample) => {
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

  updateNumberOfBars = (newNumOfBars) => {
    let playing = this.state.playing;
    if(playing)
      this.stop();
    this.setState({
      numOfBars: newNumOfBars,
      tracks: model.updateTracksLength(this.state.tracks, newNumOfBars * this.state.numOfBeatsInABar)
    }, () =>{     
        if(playing)
          this.start();
    })
  };

  updateNumberOfBeatsInABar = (newNumOfBeatsInABar) => {
    let playing = this.state.playing;
    if(playing)
      this.stop();
    this.setState({
      numOfBeatsInABar: newNumOfBeatsInABar,
      tracks: model.updateTracksLength(this.state.tracks, this.state.numOfBars * newNumOfBeatsInABar)
    }, ()=>{
      if(playing)
        this.start();
    })
  };

  render() {
    const {bpm, currentBeat, playing, shareHash, tracks, trackLengths, numOfTracks, numOfBars, numOfBeatsInABar} = this.state;
          <Controls {...{bpm, updateBPM, playing, start, stop, addTrack, share, numOfBars, numOfBeatsInABar, updateNumberOfBars, updateNumberOfBeatsInABar}} />
    const {updateBPM, start, stop, addTrack, share, randomSong, closeDialog, updateNumberOfBars, updateNumberOfBeatsInABar} = this;

    //----------------------------------RETURN----------------------
    return (
      <div className="app">
        <h3 className="header">Floopy Loops</h3>
        {
          shareHash ? <ShareDialog hash={shareHash} closeDialog={closeDialog} /> : null
        }
        <Controls {...{bpm, updateBPM, playing, start, stop, addTrack, share, numOfBars, numOfBeatsInABar, updateNumberOfBars, updateNumberOfBeatsInABar}} />
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
      </div>
    );
  }
}

export default App;
