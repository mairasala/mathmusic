import React from 'react';
import {Keyboard} from './Keyboard';
import {KeyboardOctave} from './KeyboardOctave';
import {ScaleGradesProbability} from './ScaleGradesProbability';
import {ScaleConstants} from '../utils/ScaleConstants';
import {ProbabilityConstants} from '../utils/ProbabilityConstants';
import {ScaleTypeSelector} from './ScaleTypeSelector';

export class App extends React.Component {
  constructor(props){
    super(props);
    this.handleEnableGrade = this.handleEnableGrade.bind(this);
    this.handleChangeProb = this.handleChangeProb.bind(this);
    this.handleChangeScaleType = this.handleChangeScaleType.bind(this);
    this.handleChangeScaleTone = this.handleChangeScaleTone.bind(this);
    this.onChangePlaying = this.onChangePlaying.bind(this);

    this.state = {
      scaleType: 'MAJOR',
      nOctaves: 2,
      tone: 'C',
      playing: false,
      grades:  ProbabilityConstants.mapGradesToProb(ScaleConstants.SCALE_GRADES['MAJOR'])
    };
  }

  onChangePlaying(evt){
    this.setState({
      playing: evt.target.checked
    });
  }

  handleEnableGrade(grade, enable){
    const gradeIndx = this.state.grades.findIndex(gr => gr.grade === grade);
    const isPresent = gradeIndx >= 0;
    const grades = this.state.grades.slice(0);
    if(!isPresent && enable){
      grades.push(ProbabilityConstants.mapGradeToProb(grade));
    } else if(isPresent && !enable) {
      grades.splice(gradeIndx, 1);
    }
    this.setState({
      grades: grades
    });
  }

  handleChangeProb(grade, value){
    const grades = this.state.grades.slice(0);
    const gradeIndex = grades.findIndex(gr => gr.grade === grade);
    if(gradeIndex >= 0){
      grades.splice(gradeIndex, 1, {grade:grade, prob:value});
      this.setState({
        grades: grades
      });
    }
  }

  handleChangeScaleType(type){
    const grades = ProbabilityConstants.mapGradesToProb(ScaleConstants.SCALE_GRADES[type]);
    if(this.state.scaleType !== type && grades){
      this.setState({
        scaleType: type,
        grades: grades
      });
      // this.updateAudiomanager();
    }
  }
  handleChangeScaleTone(tone){
    const clearTone = tone.split('-')[0];
    if(this.state.tone !== clearTone){
      this.setState({tone: clearTone});
    }
  }

  render() {
    const activeNotes = this.state.grades
                        .map((gr) => {
                          return {
                            note: ScaleConstants.getNoteByGrade(gr.grade, this.state.tone),
                            prob: gr.prob
                          };
                        }
                      );
    const allNotes = ScaleConstants.NOTES.map(n => {
      return { note: n };
    });
    const scaleTypes = Object.keys(ScaleConstants.SCALE_GRADES);

    return (
      <div>
        <input type='checkbox'
          onChange={this.onChangePlaying}
          className='player'>
          </input>
        <div className="scaleSelector">
          <KeyboardOctave
            octave='0'
            selected={this.state.tone}
            onKeyPress={this.handleChangeScaleTone}
            activeNotes={allNotes}>
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
          onChange={this.handleChangeProb}
          onChangeGradeProb={this.handleEnableGrade}>
        </ScaleGradesProbability>
        <Keyboard
          nOctaves={this.state.nOctaves}
          playing={this.state.playing}
          activeNotes={activeNotes}>
        </Keyboard>
      </div>
    );
  }
}
