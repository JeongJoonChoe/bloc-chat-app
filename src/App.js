import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import './App.css';
import * as firebase from 'firebase';
import MessageList from './components/MessageList';
import RoomList from './components/RoomList';

var config = {
  apiKey: "AIzaSyDYeAj1nBXhJGkS6gtC2lYTTfV_mnYANVk",
  authDomain: "bloc-chat-app-537de.firebaseapp.com",
  databaseURL: "https://bloc-chat-app-537de.firebaseio.com",
  projectId: "bloc-chat-app-537de",
  storageBucket: "bloc-chat-app-537de.appspot.com",
  messagingSenderId: "406678716994"
};
firebase.initializeApp(config);

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      activeRoom:'',
      activeRoomId:'',
    }
  }

  handleRoomClick(room){
    this.setState({ 
      activeRoom: room.name,
      activeRoomId: room.key,
    }); 
  }

  render() {
    return (
      <div className="App">
        <header>
          <h1>Bloc Chat</h1>
          <h2>{this.state.activeRoom}</h2>
        </header>
        <main>
          <RoomList firebase={firebase} activeRoomId={this.state.activeRoomId} handleRoomClick={(room) => this.handleRoomClick(room)}/>
          <MessageList firebase={firebase} activeRoomId={this.state.activeRoomId} />
        </main>
      </div>
    );
  }
}

export default App;
