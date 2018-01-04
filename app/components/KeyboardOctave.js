import React from 'react';
import {KeyboardKey} from './KeyboardKey';
import {ScaleConstants} from '../utils/ScaleConstants';

export class KeyboardOctave extends React.Component {
  constructor(props){
    super(props);
    this.handleOnKeyPress = this.handleOnKeyPress.bind(this);

    this.state = {
      selectedKey: null
    }
  }
  handleOnKeyPress(key){
    var selected = key.split('-')[0];
    this.setState({
      selectedKey:selected
    })
    this.props.onKeyPress(key);
  }

  renderKey(note, index){
    return (
       <KeyboardKey
         note={note}
         selected={this.state.selectedKey === note}
         key={index}
         octave={this.props.octave}
         active={this.props.activeNotes.includes(note)}
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
