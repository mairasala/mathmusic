import React from 'react';
import {KeyboardOctave} from './KeyboardOctave';
import {AudioManager} from '../controllers/AudioManager';

export class Keyboard extends React.Component {
  constructor(props){
    super(props);
    this.onKeyPress = this.onKeyPress.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
    this.audioManager = new AudioManager();
  }
  onKeyPress(note){
    this.audioManager.playNote(note);
  }
  onKeyUp(note){
    this.audioManager.stopNote(note);
  }
  render() {
    const nOctaves = this.props.nOctaves;
    const centralOctave = 4;
    const octaves = [];

    const lastOctave = centralOctave + Math.floor(nOctaves/2);

    for(let i=lastOctave-nOctaves; i < lastOctave; i++){
      octaves.push(this.renderOctave(i));
    }
    return(
      <div>
        {octaves}
      </div>

    );
  }
  renderOctave(i){
    return (
      <KeyboardOctave
        key={i}
        octave={i+1}
        onKeyPress={this.onKeyPress}
        activeNotes={this.props.activeNotes}
        onKeyUp={this.onKeyUp}>
      </KeyboardOctave>);
  }
}
