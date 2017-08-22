import React, {Component} from 'react';
import './App.css';

import $ from 'jquery'
import jPlayer from 'jplayer'

import Header from './components/header'
import Progress from './components/progress'
import Player from './page/player'
import {MUSIC_LIST} from './config/musicList'

class App extends Component {
  state = {
    currentMusicItem: MUSIC_LIST[0]
  }
  componentWillMount() {
    console.log('aaa' + this.state.currentMusicItem.title);

  }

  //路由切换不停止音乐
  componentDidMount() {
    $('#player').jPlayer({
      ready: function() {
        $('#player').jPlayer('setMedia', {mp3: 'http://oj4t8z2d5.bkt.clouddn.com/%E9%AD%94%E9%AC%BC%E4%B8%AD%E7%9A%84%E5%A4%A9%E4%BD%BF.mp3 '}).jPlayer('play');
      },
      supplied: 'mp3',
      wmode: 'window'
    });

  }

  componentDidMount() {
    //暂停播放
    $("#player").unbind($.jPlayer.event.timeupdate);
  }

  render() {
    return (
      <div className="App">
        <h1>i am jehol app</h1>
        <Header></Header>
        <Player cuerrentMusicItem={this.state.currentMusicItem}></Player>
      </div>
    );
  }
}

export default App;
