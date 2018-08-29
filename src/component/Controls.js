import React, { Component } from 'react';
import ScrubberBar from './ScrubberBar';
import PlayButton from './PlayButton';
import SoundButton from './SoundButton';

class Controls extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTime: this.props.currentTime,
    };
  }

  UNSAFE_componentWillReceiveProps (nextProps) {
    const { currentTime } = this.props;
    if(currentTime !== nextProps.currentTime){
      this.setState({ currentTime: nextProps.currentTime });
    }
 }

  getDisplayTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time - minutes * 60);
    const hours = Math.floor(time / 3600);
    time = time - hours * 3600;
    let ret = "";
    if (hours > 0) {
        ret += "" + hours + ":" + (minutes < 10 ? "0" : "");
    }
    ret += "" + minutes + ":" + (seconds < 10 ? "0" : "");
    ret += "" + seconds;
    return ret;
  }

  computeSeekTime = (e) => {
    const { duration, onMouseup } = this.props;
    const seekTime = duration * ((e.clientX - 198) / this.scrubberBar.scrub.clientWidth);
    this.setState({ currentTime: seekTime });
    onMouseup(seekTime);
  }

  handleMouseMove = (e) => {
    const { nubGrabbing } = this.props;
    if (nubGrabbing === true) {
      this.computeSeekTime(e)
    }
  }

  render() {
    const { 
      duration, 
      onMouseup, 
      getPlayStatus, 
      mouseover, 
      mouseout, 
      getMuteStatus, 
      isPlaying, 
      inAd, 
      onNubMouseDown, 
      onNubMouseUp,
    } = this.props;

    const { 
      currentTime, 
    } = this.state;
    return (
      <div
        ref={(el) => { this.hitbox = el }}
        className={`${inAd ? 'ad' : ''} control-hitbox`} // for ad playing, forbid displaying control bar
        onMouseOver={mouseover}
        onMouseOut={mouseout}
        onMouseMove={this.handleMouseMove}
        onMouseUp={onNubMouseUp}
        onMouseLeave={onNubMouseUp}
      >
        <div className={'control-wrapper'}>
          <PlayButton 
            getPlayStatus={getPlayStatus}
            isPlaying={isPlaying}
          />
          <SoundButton 
            getMuteStatus={getMuteStatus}
          />
          <div className={'timer'}>
            <span>{this.getDisplayTime(currentTime)}</span>
          </div>
          <ScrubberBar
            ref={(el) => {this.scrubberBar = el}}
            currentTime={currentTime}
            duration={duration}
            onMouseup={onMouseup}
            onMouseDown={onNubMouseDown}
            onScrubberBarClick={e => this.computeSeekTime(e)}
          />
          <div className={'runtime'}>
            <span>{this.getDisplayTime(duration)}</span>
          </div>
        { 
          // <btn-play />
          // <btn-sound />
          // <timer />
          // <ScrubberBar />
          // <runtime />
          // <btn-cc>
          // <btn-share>
        }
        </div>
      </div>
    )
  }
}

export default Controls;
