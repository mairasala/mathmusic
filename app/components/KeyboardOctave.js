import React from 'react';
import {KeyboardKey} from './KeyboardKey';
import {ScaleConstants} from '../utils/ScaleConstants';

export class KeyboardOctave extends React.Component {
  renderKey(note, index){
    return (
       <KeyboardKey
         note={note}
         key={index}
         octave={this.props.octave}
         active={this.props.activeNotes.includes(note)}
         onPress={this.props.onKeyPress}
         onUp={this.props.onKeyUp}>
      </KeyboardKey>
    );
  }
  render() {
    const notes = ScaleConstants.NOTES.map(
      (name, index) => this.renderKey(name, index)
    );
     return (
       <ul className="octave">{notes}</ul>
     );
  }
}
