import React from 'react';

export class KeyboardKey extends React.Component {
  constructor(props){
    super(props);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
  }
  handleMouseDown(){
    if(this.props.active){
      this.props.onPress(`${this.props.note}-${this.props.octave}`);
    }
  }
  handleMouseUp(){
      this.props.onUp(`${this.props.note}-${this.props.octave}`);
  }
  render(){
    const noteType =  this.isBlackNote() ? 'black' : 'white';
    const noteName = this.props.note.charAt(0).toLowerCase();
    const activeName = this.props.active ? "" : 'disabled';
    const noteClass = `${noteType} ${noteName} ${activeName}`;
    return (
      <li key={this.props.index}
        className={noteClass}
        onMouseDown={this.handleMouseDown}
        onMouseUp={this.handleMouseUp}>
      </li>
    );
  }
  isBlackNote(){
    return this.props.note.indexOf('#') !== -1;
  }
}
