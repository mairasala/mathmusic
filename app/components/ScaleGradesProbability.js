import React from 'react';
import {GradeProbability} from './GradeProbability';
import {ScaleConstants} from '../utils/ScaleConstants';

export class ScaleGradesProbability extends React.Component{
  constructor(props){
    super(props);
    this.renderKeyProb = this.renderKeyProb.bind(this);
  }

  renderKeyProb(note, i){
    const active = this.props.grades.includes(i);
    return <GradeProbability
      noteName={note}
      key={i}
      index={i}
      active={active}
      onChangeGradeProb={this.props.onChangeGradeProb}>
    </GradeProbability>
  }

  render() {
    const dist = ScaleConstants.NOTES.indexOf(this.props.tone.toUpperCase());
    const orderedScale = ScaleConstants.NOTES.slice(dist).concat(ScaleConstants.NOTES.slice(0,dist));

    const grades = orderedScale.map(this.renderKeyProb);
    return(
      <div className="gradeProbability">
        {grades}
      </div>

    );
  }
}
