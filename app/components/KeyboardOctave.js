import React from 'react';
import {KeyboardKey} from './KeyboardKey';
import {ScaleConstants} from '../utils/ScaleConstants';

export class KeyboardOctave extends React.Component {
  constructor(props){
    super(props);
    this.handleOnKeyPress = this.handleOnKeyPress.bind(this);
  }
  handleOnKeyPress(key){
    var selected = key.split('-')[0];
    this.props.onKeyPress(key);
  }

  renderKey(note, index){
    const active = Boolean(this.props.activeNotes.find(n => n.note === note));
    return (
       <KeyboardKey
         note={note}
         selected={this.props.selected === note}
         key={index}
         octave={this.props.octave}
         active={active}
         onPress={this.handleOnKeyPress}
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
