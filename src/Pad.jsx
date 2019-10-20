import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

class Pad extends React.Component {
  constructor(props) {
    super(props);
    const key = this.props.keyChar.toUpperCase();

    this.state = {
      keyCodes: [key.charCodeAt(0), key.toLowerCase().charCodeAt(0)],
      key,
    };

    this.onClick = this.onClick.bind(this);
    this.onKeypress = this.onKeypress.bind(this);
    document.addEventListener('keypress', this.onKeypress);
  }

  onClick(event) {
    if ('function' === typeof this.props.onClick) {
      this.props.onClick(event, this.props.name);
    }
    this.playSound();
  }

  playSound() {
    const audio = document.querySelector(`#${this.state.key.toUpperCase()}`);
    if (!audio) {
      return;
    }
    audio.currentTime = 0;
    audio.volume = this.props.volume;
    audio.play();
  }

  onKeypress(event) {
    console.debug('Key:', event.keyCode);
    if (this.props.power && this.state.keyCodes.includes(event.keyCode)) {
      const button = document.querySelector(`#button-${this.state.key}`);
      button.classList.add('active');
      button.click();
      const handle = setTimeout(() => {
        button.classList.remove('active');
        clearTimeout(handle);
      }, 300);
    }
  }

  render() {
    let audio;

    if (this.props.power) {
      audio = (
        <audio
          className="clip"
          src={this.props.audioSrc}
          id={this.state.key.toUpperCase()}
        ></audio>
      );
    }
    return (
      <Button
        className="drum-pad shadow"
        variant="info"
        onClick={this.onClick}
        data-trigger={this.state.key}
        id={'button-' + this.state.key}
        size="lg"
      >
        {this.state.key.toUpperCase()}
        {audio}
      </Button>
    );
  }
}

Pad.propTypes = {
  k: PropTypes.string,
};

export default Pad;
