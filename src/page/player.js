import React, {Component} from 'react';
import Header from '../components/header'
import Progress from '../components/progress'
import $ from 'jquery'
import jPlayer from 'jplayer'
import './player.css'
import { Link } from 'react-router-dom';

let duration = null



class Player extends Component {
  state = ({progress: 0})

  componentDidMount() {
    $("#player").bind($.jPlayer.event.timeupdate, (e) => {
      duration = e.jPlayer.status.duration;
      this.setState({

        progress: Math.round(e.jPlayer.status.currentPercentAbsolute)
      })
    });
  }

  componentDidUnMount() {
    //解绑避免重复绑定
    $("#player").unbind($.jPlayer.event.timeupdate);
  }

  handleChangeProgress = (p) => {
    $("#player").jPlayer('play', duration * p)

  }

  setProgress = () =>{

  }

  setVolume = () =>{

  }


  render() {
    return (
      <div className="container-player">
          <h1 className="caption">
            我的私人音乐坊 &gt;
            {/* <Link to="/list">我的私人音乐坊 &gt;</Link> */}
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
                    <Progress
                      progress={this.state.volume}
                      setProgress={this.setVolume}
                      barColor='red'
                    />
                  </div>
                </div>
              </div>
              <div style={{
                height: 10,
                lineHeight: '10px',
                marginTop: '20px'
              }}>
                <Progress
                  progress={this.state.progress}
                  setProgress={this.setProgress}
                  barColor='green'
                />
              </div>
              <div className="mt35 row">
                <div>
                  <i onClick={this.prev} className="icon prev"></i>
                  <i
                    onClick={this.play}
                    className={`icon ml20 ${this.state.isPlay ? 'pause' : 'play'}`}
                  >
                  </i>
                  <i onClick={this.next} className="icon next ml20"></i>
                </div>
                <div className="-col-auto">
                  <i
                    onClick={this.changeCycleModel}
                    className={`icon repeat-${this.props.cycleModel}`}
                  ></i>
                </div>
              </div>
            </div>
            <div className="-col-auto cover">
              <img
                src={this.props.cuerrentMusicItem.cover}
                alt={this.props.cuerrentMusicItem.title}
              />
            </div>
          </div>
        </div>

    );
  }
}

export default Player;
