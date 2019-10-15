import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Row, Container, Jumbotron } from 'react-bootstrap';
import './App.css';
import Pad from './Pad';
import Display from './Display';

class App extends React.Component {
  constructor(props) {
    super(props);
    const banks = [
      {
        name: 'Heater Kit',
        pads: [
          {
            key: 'q',
            source: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3',
            name: 'Heater-1',
          },
          {
            key: 'w',
            source: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3',
            name: 'Heater-2',
          },
          {
            key: 'e',
            source: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3',
            name: 'Heater-3',
          },
          {
            key: 'a',
            source:
              'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3',
            name: 'Heater-4',
          },
          {
            key: 's',
            source: 'https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3',
            name: 'Clap',
          },
          {
            key: 'd',
            source: 'https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3',
            name: 'Open-HH',
          },
          {
            key: 'z',
            source:
              'https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3',
            name: "Kick-n'-Hat",
          },
          {
            key: 'x',
            source:
              'https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3',
            name: 'Kick',
          },
          {
            key: 'c',
            source: 'https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3',
            name: 'Closed-HH',
          },
        ],
      },
      {
        name: 'Smooth Piano',
        pads: [
          {
            key: 'q',
            source: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3',
            name: 'Chord-1',
          },
          {
            key: 'w',
            source: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3',
            name: 'Chord-2',
          },
          {
            key: 'e',
            source: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3',
            name: 'Chord-3',
          },
          {
            key: 'a',
            source:
              'https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3',
            name: 'Shaker',
          },
          {
            key: 's',
            source: 'https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3',
            name: 'Open-HH',
          },
          {
            key: 'd',
            source: 'https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3',
            name: 'Closed-HH',
          },
          {
            key: 'z',
            source:
              'https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3',
            name: 'Punchy-Kick',
          },
          {
            key: 'x',
            source:
              'https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3',
            name: 'Side-Stick',
          },
          {
            key: 'c',
            source: 'https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3',
            name: 'Snare',
          },
        ],
      },
    ];
    this.state = {
      banks,
      currentPad: '',
      currentBank: banks[0],
      volume: 0.3,
      power: true,
    };

    this.onPadClick = this.onPadClick.bind(this);
    this.onVolumeChange = this.onVolumeChange.bind(this);
    this.onPowerChange = this.onPowerChange.bind(this);
    this.onBankSwitch = this.onBankSwitch.bind(this);
  }

  onBankSwitch(event) {
    this.setState({
      currentBank: this.state.banks[event.target.value],
      currentPad: '',
    });
  }

  onPadClick(event, name) {
    this.setState({
      currentPad: name,
    });
  }

  onVolumeChange(event) {
    this.setState({
      volume: event.target.value,
    });
  }

  onPowerChange(event) {
    this.setState({
      power: !this.state.power,
    });
  }

  render() {
    const banks = this.state.currentBank.pads.map((i, ii) => {
      const xs = {
        span: 2,
        offset: ii % 3 === 0 ? 6 : 0,
      };
      return (
        <Col xs={xs} key={'pad-column' + ii} className="mb-2">
          <Pad
            keyChar={i.key}
            audioSrc={i.source}
            onClick={this.onPadClick}
            name={i.name}
            volume={this.state.volume}
            power={this.state.power}
          />
        </Col>
      );
    });

    return (
      <div className="App" id="drum-machine">
        <Jumbotron fluid>
          <Container>
            <Row className="align-items-center">
              <Col xs={12} lg={4}>
                <h1 className="text-center">Drum Machine</h1>
              </Col>
              <Col xs={12} lg={4}>
                <Row>{banks}</Row>
              </Col>
              <Col xs={12} lg={4}>
                <Display
                  text={this.state.currentPad}
                  onVolumeChange={this.onVolumeChange}
                  power={this.state.power}
                  onPowerChange={this.onPowerChange}
                  volume={this.state.volume}
                  banks={this.state.banks}
                  currentBank={this.state.currentBank}
                  onBankSwitch={this.onBankSwitch}
                />
              </Col>
            </Row>
          </Container>
        </Jumbotron>
      </div>
    );
  }
}

export default App;
