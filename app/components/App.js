import React from 'react';
import {Keyboard} from './Keyboard';
import {KeyboardOctave} from './KeyboardOctave';
import {ScaleGradesProbability} from './ScaleGradesProbability';
import {ScaleConstants} from '../utils/ScaleConstants';
import {ScaleTypeSelector} from './ScaleTypeSelector';

export class App extends React.Component {
  constructor(props){
    super(props);
    this.handleChangeProb = this.handleChangeProb.bind(this);
    this.handleChangeScaleType = this.handleChangeScaleType.bind(this);
    this.handleChangeScaleTone = this.handleChangeScaleTone.bind(this);

    this.state = {
      scaleType: 'MAJOR',
      tone: 'C',
      grades: ScaleConstants.SCALE_GRADES['MAJOR']
    };
  }

  handleChangeProb(grade, enable){
    const isPresent = this.state.grades.includes(grade);
    const grades = this.state.grades.slice(0);
    if(!isPresent && enable){
      grades.push(grade);
    } else if(isPresent && !enable) {
      grades.splice(grades.indexOf(grade), 1);
    }
    this.setState({
      grades: grades
    });
  }

  handleChangeScaleType(type){
    const grades = ScaleConstants.SCALE_GRADES[type];
    if(this.state.scaleType !== type && grades){
      this.setState({
        scaleType: type,
        grades: grades
      });
    }
  }
  handleChangeScaleTone(tone){
    const clearTone = tone.split('-')[0];
    if(this.state.tone !== clearTone){
      this.setState({tone: clearTone});
    }
  }

  render() {
    const activeNotes = this.state.grades.map((grade) =>
      ScaleConstants.getNoteByGrade(grade, this.state.tone)
    );
    const scaleTypes = Object.keys(ScaleConstants.SCALE_GRADES);
    return (
      <div>
        <div className="scaleSelector">
          <KeyboardOctave
            octave='0'
            onKeyPress={this.handleChangeScaleTone}
            activeNotes={ScaleConstants.NOTES}>
          </KeyboardOctave>
          <ScaleTypeSelector
            scaleTypes={scaleTypes}
            selected={this.state.scaleType}
            scaleTone={this.state.tone}
            onSelect={this.handleChangeScaleType}>
          </ScaleTypeSelector>
        </div>
        <ScaleGradesProbability
          tone={this.state.tone}
          scale={this.state.scaleType}
          grades={this.state.grades}
          onChangeGradeProb={this.handleChangeProb}>
        </ScaleGradesProbability>
        <Keyboard
          nOctaves='2'
          activeNotes={activeNotes}>
        </Keyboard>
      </div>
    );
  }
}
