import React from 'react';
import { Form } from 'react-bootstrap';

class Display extends React.Component {
  render() {
    const bankChecks = this.props.banks.map((i, x) => {
      return (
        <Form.Check
          custom
          inline
          type="radio"
          label={i.name}
          onChange={this.props.onBankSwitch}
          id={`bank-radio-${x}`}
          key={`bank-radio-${x}`}
          name="bank-radio"
          value={x}
          checked={this.props.currentBank.name === i.name}
        />
      );
    });
    return (
      <div className="display-container p-4 bg-dark text-light d-flex justify-content-center align-items-center flex-column">
        <Form.Check
          type="switch"
          label="Power"
          onChange={this.props.onPowerChange}
          id="power-switch"
          checked={this.props.power}
        />
        {bankChecks}
        {/* <h4 className="bank-name">{this.props.currentBank.name}</h4> */}
        <h5 id="display" className="display-title p-2 mt-2 bg-light text-dark text-center">{this.props.text}</h5>
        <div className="form-group">
          <label htmlFor="drum-volume" className="text-center">
            Volume
          </label>
          <input
            type="range"
            className="form-control-range"
            id="drum-volume"
            min="0"
            max="1"
            step="0.01"
            value={this.props.volume}
            onChange={this.props.onVolumeChange}
          />
        </div>
      </div>
    );
  }
}

export default Display;
