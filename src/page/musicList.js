import React, {Component} from 'react';
import {MUSIC_LIST} from '../config/musicList'
import MusicListItem from '../components/musicListItem'

class MusicList extends Component {

  render() {
    return (
      <ul>
        {this.props.musicList.map((item, index) => (
          <MusicListItem
            key={index}
            focus= {item === this.props.currentMusicItem }
             musicItem={item}>
          </MusicListItem>
        ))
}
      </ul>
    )
  }

}

export default MusicList;
