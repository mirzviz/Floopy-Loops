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
    trackLengths: number[],
  };

  constructor(props: {}) {
    super(props);
    const hash = location.hash.substr(1);
    if (hash.length > 0) {
      try {
        const {bpm, tracks}: {
          bpm: number,
          tracks: EncodedTrack[],
        } = JSON.parse(atob(hash));
        this.initializeState({
          bpm,
          tracks: model.decodeTracks(tracks),
        });
      } catch(e) {
        console.warn("Unable to parse hash", hash, e);
        console.log("in catch befor initalizeState");
        this.initializeState({tracks: model.initTracks()});
      } finally {
        location.hash = "";
      }
    } else {
      this.initializeState();
    }

    this.initializeState();
  }

  initializeState() {
    this.state = {
      bpm: 120,
      playing: true,
      currentBeat: -1,
      shareHash: null,
      numOfTracks: 5,
      trackLengths: [16,16,16,16,16],
      tracks: model.initTracks(5, [16,16,16,16,16]),
    };
    this.loop = sequencer.create(this.state.tracks, this.updateCurrentBeat);
    sequencer.updateBPM(this.state.bpm);
    //this.start();
  }

  componentDidMount(){
    this.start();
  }

  start = () => {
    this.setState({playing: true});
    this.loop.start();
  };
  
  stop = () => {
    this.loop.stop();
    this.setState({currentBeat: -1, playing: false});
  };

  updateCurrentBeat = (beat: number): void => {
    this.setState({currentBeat: beat});
  };

  updateTracks = (newTracks: Track[]) => {
    this.loop = sequencer.update(this.loop, newTracks, this.updateCurrentBeat);
    this.setState({tracks: newTracks});
  };

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
    const {tracks} = this.state;
    this.updateTracks(model.toggleTrackBeat(tracks, id, beat));
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

  render() {
    const {bpm, currentBeat, playing, shareHash, tracks, trackLengths, numOfTracks} = this.state;
    const {updateBPM, start, stop, addTrack, share, randomSong, closeDialog} = this;
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
            trackLengths={trackLengths}
            clearTrack={this.clearTrack}
            deleteTrack={this.deleteTrack} />
          <Controls {...{bpm, updateBPM, playing, start, stop, addTrack, share}} />
        </table>
      </div>
    );
  }
}

export default App;
