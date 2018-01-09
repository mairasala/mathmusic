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

    this.state = {
      selectedNote: null
    }

    this.audioManager = new AudioManager();
    this.melodyGenerator = new MelodyGenerator({
      playHandler: this.noteIn
    });
    this.melodyGenerator.setNotes(this.props.activeNotes, this.props.nOctaves);
  }
  componentDidUpdate(lastProps, lastState) {
    if(lastProps.nOctaves !== this.props.nOctaves || lastProps.activeNotes !== this.props.activeNotes){
      this.melodyGenerator.setNotes(this.props.activeNotes, this.props.nOctaves);
    }
    if(lastProps.playing !== this.props.playing){
      if(this.props.playing){
        this.melodyGenerator.start();
      } else {
        this.melodyGenerator.stop();
      }
    }
  }
  onKeyPress(note){
    this.audioManager.playNote(note);
  }
  onKeyUp(note){
    this.audioManager.stopNote(note);
  }
  noteIn(evt){
    const noteName = `${evt.note.note}-${evt.note.scale}`;
    if(evt.type === 'stop'){
      this.setState({
        selectedNote: null
      });
      this.onKeyUp(noteName);
    } else if(evt.type === 'play'){
      this.setState({
        selectedNote: evt.note
      });
      this.onKeyPress(noteName);
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
    let selected = null;
    if(this.state.selectedNote){
      if(this.state.selectedNote.scale === i){
        selected = this.state.selectedNote.note;
      }
    }

    return (
      <KeyboardOctave
        key={i}
        octave={i+1}
        onKeyPress={this.onKeyPress}
        selected = {selected}
        activeNotes={this.props.activeNotes}
        onKeyUp={this.onKeyUp}>
      </KeyboardOctave>);
  }
}
