import React, {Component} from 'react';
import './App.css';

import $ from 'jquery'
import jPlayer from 'jplayer'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import Header from './components/header'
import Progress from './components/progress'
import Player from './page/player'
import MusicList from './page/musicList'

import {MUSIC_LIST} from './config/musicList'
import Pubsub from 'pubsub-js';

const MODEL = ['cycle', 'once', 'random'];

class App extends Component {
  constructor() {
    super()
    this.state = {
      currentMusicItem: MUSIC_LIST[1],
      musicList: MUSIC_LIST,
      cycleModel: MODEL[0]
    }
    // this.playMusic = this.playMusic

  }

  playMusic(musicItem) {
    $('#player').jPlayer('setMedia', {mp3: musicItem.file}).jPlayer('play');

    this.setState({currentMusicItem: musicItem})

  }

  playNext(type = "next") {
    let index = this.findMusicIndex(this.state.currentMusicItem);
    let newIndex = null
    let musicListLength = this.state.musicList.length
    switch (type) {
      case 'cycle':
        newIndex = (index + 1) % musicListLength;
        break;
      case 'once':
        newIndex = index;
        break;
      case 'random':
        newIndex = Math.round(Math.random() * musicListLength);
        break;
      case 'prev':
        newIndex = (index - 1 + musicListLength) % musicListLength;
        break;
      default:
        newIndex = (index + 1) % musicListLength;
    }

    this.setState({currentMusicItem: this.state.musicList[newIndex]})
    this.playMusic(this.state.musicList[newIndex])

  }

  findMusicIndex(musicItem) {
    return this.state.musicList.indexOf(musicItem)
  }

  //路由切换不停止音乐
  componentDidMount() {
    $('#player').jPlayer({supplied: 'mp3', wmode: 'window'});
    this.playMusic(this.state.currentMusicItem);

    $("#player").bind($.jPlayer.event.ended, (e) => {
      switch (this.state.cycleModel) {
        case 'cycle':
          this.playNext('cycle');
          break;
        case 'once':
          this.playNext('once');
          break;
        case 'random':
          this.playNext('random');
          break;
        default:

      }

    })

    Pubsub.subscribe('DELETE_MUSIC', (msg, musicItem) => {
      this.setState({
        musicList: this.state.musicList.filter(item => musicItem !== item)
      })
    })

    Pubsub.subscribe('PLAY_MUSIC', (msg, musicItem) => {
      this.playMusic(musicItem)
    })

    Pubsub.subscribe('PLAY_PREV', (msg) => {
      this.playNext('prev')
    })

    Pubsub.subscribe('PLAY_NEXT', (msg) => {

      this.playNext('next')
    })

    Pubsub.subscribe('CHANGE_CYCLE_MODEL', (msg) => {
      console.log('father receiver');
      let currentModel = MODEL.indexOf(this.state.cycleModel);
      let newModel = (currentModel + 1) % 3
      this.setState({cycleModel: MODEL[newModel]})

    })

  }

  componentWillUnmount() {
    //各种解绑
    Pubsub.unSubscribe('DELETE_MUSIC');
    Pubsub.unSubscribe('PLAY_MUSIC');
    Pubsub.unSubscribe('PLAY_PREV');
    Pubsub.unSubscribe('PLAY_NEXT');
    Pubsub.unSubscribe('CHANGE_CYCLE_MODEL');

    $("#player").unbind($.jPlayer.event.ended);

  }

  // //暂停播放
  // componentDidMount() {
  //   $("#player").unbind($.jPlayer.event.timeupdate);
  // }

  render() {
    const List = () => (
      <MusicList currentMusicItem={this.state.currentMusicItem} musicList={this.state.musicList}></MusicList>
    )

    const Home = () => (
      <Player cuerrentMusicItem={this.state.currentMusicItem} cycleModel={this.state.cycleModel}></Player>
    )

    return (
      <Router>
        <div >
          <Header></Header>
          <Route exact path="/" component={Home}/>
          <Route path="/list" component={List}/>
        </div>
      </Router>

    );
  }
}

export default App;
