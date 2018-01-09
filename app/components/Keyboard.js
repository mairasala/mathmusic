import React from 'react';
import {KeyboardOctave} from './KeyboardOctave';
import {ScaleConstants} from '../utils/ScaleConstants';
import {AudioManager} from '../controllers/AudioManager';
import {MelodyGenerator} from '../controllers/MelodyGenerator';

export class Keyboard extends React.Component {
  constructor(props){
    super(props);
    this.onKeyPress = this.onKeyPress.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
    this.noteIn = this.noteIn.bind(this);

    this.audioManager = new AudioManager();
    this.melodyGenerator = new MelodyGenerator({
      playHandler: this.noteIn
    });
    this.melodyGenerator.setNotes(this.props.activeNotes, this.props.nOctaves);
    this.melodyGenerator.start();
  }
  componentDidUpdate(lastProps, lastState) {
    if(lastProps.nOctaves !== this.props.nOctaves || lastProps.activeNotes !== this.props.activeNotes){
      this.melodyGenerator.setNotes(this.props.activeNotes, this.props.nOctaves);
    }
  }
  onKeyPress(note){
    this.audioManager.playNote(note);
  }
  onKeyUp(note){
    this.audioManager.stopNote(note);
  }
  noteIn(evt){
    if(evt.type === 'stop'){
      this.onKeyUp(evt.note);
    } else if(evt.type === 'play'){
      this.onKeyPress(evt.note);
    }
  }
  render() {
    const octaves = new Array();
    const octConfig = ScaleConstants.getOctaves(this.props.nOctaves);

    for(let i = octConfig.first; i <= octConfig.last; i++){
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
        onKeyPress={this.props.onKeyPress}
        activeNotes={this.props.activeNotes}
        onKeyUp={this.props.onKeyUp}>
      </KeyboardOctave>);
  }
}
