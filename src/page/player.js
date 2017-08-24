import React, {Component} from 'react';
import Header from '../components/header'
import Progress from '../components/progress'
import $ from 'jquery'
import jPlayer from 'jplayer'
import './player.css'
import {Link} from 'react-router-dom';
import Pubsub from 'pubsub-js';

let duration = null

class Player extends Component {
  state = ({progress: 0, volume: 0, isPlay: true, leftTime: ''})

  componentDidMount() {
    $("#player").bind($.jPlayer.event.timeupdate, (e) => {
      duration = e.jPlayer.status.duration;
      this.setState({
        progress: e.jPlayer.status.currentPercentAbsolute,
        volume: e.jPlayer.options.volume * 100,
        leftTime: this.formatTime(duration *
           (1 - e.jPlayer.status.currentPercentAbsolute / 100))
      })
    });
  }

  componentDidUnMount() {
    //解绑避免重复绑定
    $("#player").unbind($.jPlayer.event.timeupdate);
  }

  changeVolumeHandler = (p) => {
    $("#player").jPlayer('volume', p);

  }

  progressChangeHandler = (p) => {
    $("#player").jPlayer('play', duration * p)

  }

  play = () => {
    let nowPlayState = this.state.isPlay
    if (nowPlayState) {
      $("#player").jPlayer('pause')
    } else {
      $("#player").jPlayer('play')
    }
    this.setState({
      isPlay: !nowPlayState
    })
  }

  playPrev = () => {
    Pubsub.publish('PLAY_PREV')
  }

  playNext = () => {

    Pubsub.publish('PLAY_NEXT')
  }

  changeCycleModel = () => {
console.log('child sended');
    Pubsub.publish('CHANGE_CYCLE_MODEL');

  }

  formatTime = (time) => {
    time = Math.floor(time);
    let minutes = Math.floor(time / 60);
    let seconds = Math.floor(time % 60) + '';
    return `${minutes}:${seconds.padStart(2, '0')}`
  }

  render() {
    return (
      <div className="container-player">
        <h1 className="caption">
          <Link to="/list">我的私人音乐坊 &gt;</Link>
        </h1>
        <div className="mt20 row">
          <div className="controll-wrapper">
            <h2 className="music-title">

              {this.props.cuerrentMusicItem.title}
            </h2>
            <h3 className="music-artist mt10">

              {this.props.cuerrentMusicItem.artist}
            </h3>
            <div className="row mt20">
              <div className="left-time -col-auto">-{this.state.leftTime}</div>
              <div className="volume-container">
                <i className="icon-volume rt" style={{
                  top: 5,
                  left: -5
                }}></i>
                <div className="volume-wrapper">
                  <Progress progress={this.state.volume} onProgressChange={this.changeVolumeHandler} barColor='red'/>
                </div>
              </div>
            </div>
            <div style={{
              height: 10,
              lineHeight: '10px',
              marginTop: '20px'
            }}>
              <Progress progress={this.state.progress} onProgressChange={this.progressChangeHandler} barColor='green'/>
            </div>
            <div className="mt35 row">
              <div>
                <i onClick={this.playPrev} className="icon prev"></i>
                <i onClick={this.play} className={`icon ml20 ${this.state.isPlay
                  ? 'pause'
                  : 'play'}`}></i>
                <i onClick={this.playNext} className="icon next ml20"></i>

                <i onClick={this.changeCycleModel}
                   className={`icon ml20 repeat-${this.props.cycleModel}`}></i>
              </div>

            </div>
          </div>
          <div className="-col-auto cover">
            <img src={this.props.cuerrentMusicItem.cover} alt={this.props.cuerrentMusicItem.title}/>
          </div>
        </div>
      </div>

    );
  }
}

export default Player;
