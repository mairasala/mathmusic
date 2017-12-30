import React from 'React';

export class GradeProbability extends React.Component {
  constructor(props){
    super(props);
    this.handleSlide = this.handleSlide.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleSlide(value){
    this.props.onChange({
      note: this.props.index,
      value: value
    });
  }
  handleChange(event){
    this.props.onChangeGradeProb(this.props.index, event.target.checked);
  }
  render(){
    return (
      <div className='grade'>
        <div className='gradeIndex'>{this.props.index + 1}</div>
        <input type='range'
          step='1'
          minimum='0'
          maximum='10'
          orient='vertical'
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
