/* @flow */
import type { Track, EncodedTrack } from "./types";

import samples from "./samples.json";


export function initTracks(numOfTracks: Number, trackLengths: number): Track[] {
  const tracks = [];
  for(let i = 0; i < numOfTracks; i++){
    tracks[i] = {
      id: i, 
      name: null, 
      vol: .5, 
      muted: false, 
      beats: initBeats(trackLengths)
    };
  }
  tracks[0].name = "kick-electro01";
  tracks[1].name = "hihat-plain";
  tracks[2].name = "snare-808";
  tracks[3].name = "perc-hollow";
  
  return tracks;
}

export function updateTracksLength(i_Tracks: Track[], newTrackLengths: number): Track[] {
  let newTracks;
  let oldTrackLengths = i_Tracks[0].beats.length;
  if(oldTrackLengths > newTrackLengths){
    newTracks = i_Tracks.map(track => { return {
                                          ...track,
                                          beats: new Array(newTrackLengths)
                                        }
                                      });
  }
  else{
    newTracks = [...i_Tracks];
  }

  newTracks.forEach((track, trackIndex) => {
    for(let i = 0; i < newTrackLengths; i++){
      track.beats[i] = i < oldTrackLengths ? i_Tracks[trackIndex].beats[i] : false ;
    }
  })

  return newTracks;
}

export function initBeats(n: number): boolean[] {
  const arr = [];
  for(let i = 0; i < n; i++)
  {
    arr[i] = false;
  }
  
  return arr;
}

export function addTrack(tracks: Track[]) {
  const id = Math.max.apply(null, tracks.map(t => t.id)) + 1;
  return [
    ...tracks, {
      id,
      name: samples[Math.floor(Math.random() * samples.length)],
      vol: .8,
      muted: false,
      beats: initBeats(16),
    }
  ];
}

export function clearTrack(tracks: Track[], id: number, numOfBeats: number): Track[] {
  return tracks.map((track) => {
    if (track.id !== id) 
    {
      return track;
    } 
    else 
    {
      let obj = {
                  ...track, 
                  beats: initBeats(numOfBeats)
                };
      console.log(obj.beats);
      return obj;
    }
  });
}

export function deleteTracks(tracks: Track[], id: number): Track[] {
  return tracks.filter((track) => track.id !== id);
}

export function toggleTrackBeat(tracks: Track[], id: number, beat: number): Track[] {
  const newTracks = [...tracks];
  if(tracks[id].beats[beat] === true)
  {
    newTracks[id].beats[beat] = false;
  }
  else
  {
    newTracks[id].beats[beat] = true;
  }

  return newTracks;
}

export function setTrackVolume(tracks: Track[], id: number, vol: number): Track[] {
  return tracks.map((track) => {
    if (track.id !== id) {
      return track;
    } else {
      return {...track, vol};
    }
  });
}

export function muteTrack(tracks: Track[], id: number): Track[] {
  return tracks.map((track) => {
    if (track.id !== id) {
      return track;
    } else {
      return {...track, muted: !track.muted};
    }
  });
}

export function updateTrackSample(tracks: Track[], id: number, sample: string): Track[] {
  return tracks.map((track) => {
    if (track.id !== id) {
      return track;
    } else {
      return {...track, name: sample};
    }
  });
}

function encodeBeats(beats: boolean[]): string {
  return beats.map(beat => beat ? "1" : "0").join("");
}

function decodeBeats(encodedBeats: string): boolean[] {
  return encodedBeats.split("").map(beat => beat === "1");
}

export function encodeTracks(tracks: Track[]): EncodedTrack[] {
  return tracks.map(({beats, ...track}) => {
    return {...track, beats: encodeBeats(beats)};
  });
}

export function decodeTracks(encodedTracks: EncodedTrack[]): Track[] {
  return encodedTracks.map(({beats, ...encodedTrack}) => {
    return {...encodedTrack, beats: decodeBeats(beats)};
  });
}

// export function randomTracks(): Track[] {
//   const nT = Math.floor(3 + (Math.random() * 10));
//   return new Array(nT).fill().map((_, i) => {
//     return {
//       id: i + 1,
//       name: samples[Math.floor(Math.random() * samples.length)],
//       vol: Math.random(),
//       muted: false,
//       beats: initBeats(16).map(_ => Math.random() > .75),
//     }
//   });
// }

// export function randomSong(): {bpm: number, tracks: Track[]} {
//   return {
//     bpm: Math.floor(Math.random() * 75) + 75,
//     tracks: randomTracks(),
//   };
// }
