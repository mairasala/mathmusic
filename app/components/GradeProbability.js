import React from 'React';
import {ProbabilityConstants} from '../utils/ProbabilityConstants';

export class GradeProbability extends React.Component {
  constructor(props){
    super(props);
    this.handleSlide = this.handleSlide.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleSlide(evt){
    this.props.onChange(this.props.index, parseInt(evt.target.value));
  }
  handleChange(event){
    this.props.onChangeGradeProb(this.props.index, event.target.checked);
  }
  render(){
    return (
      <div className='grade'>
        <div className='gradeIndex'>{this.props.index + 1}</div>
        <input type='range'
          className='custom'
          // step={ProbabilityConstants.STEP}
          min={ProbabilityConstants.MIN_PROB}
          max={ProbabilityConstants.MAX_PROB}
          orient='vertical'
          value={this.props.probability}
          onChange={this.handleSlide}
          disabled={!this.props.active} />
        <div className='gradeName'>{this.props.noteName}</div>
        {/* <input type='checkbox'
          checked={this.props.active}
          onChange={this.handleChange}
          disabled={!this.props.active}>
        </input> */}
    </div>
  );
  }
}
