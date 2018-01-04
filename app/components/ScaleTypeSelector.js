import React from 'react';

export class ScaleTypeSelector extends React.Component {
  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.renderScaleType = this.renderScaleType.bind(this);
  }

  handleChange(evt){
    this.props.onSelect(evt.target.value);
  }

  renderScaleType(type){
    return (
      <li className='scaleType'>
        <input type='radio'
          checked={type === this.props.selected}
          value={type}
          key={type}
          onChange={this.handleChange} />
        <span>{type}</span>
      </li>
    )
  }

  render(){
    var selectors = this.props.scaleTypes.map(this.renderScaleType);
    return (
      <div className="scaleTypeContainer">
        <div className="tone">TONE: {this.props.scaleTone}</div>
        <ul className="scaleTypeSelector">
          {selectors}
        </ul>
      </div>

    );
  }
}
