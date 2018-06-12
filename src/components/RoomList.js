import React, { Component } from 'react';


class RoomList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			rooms: [],
			newRoom: '',
		};
		this.roomsRef = this.props.firebase.database().ref('rooms');
	}
	componentDidMount(){
		this.roomsRef.on('child_added', snapshot => {
			const room = snapshot.val();
			room.key = snapshot.key;
			this.setState({rooms: this.state.rooms.concat(room)});
		})
	}
	createRoom(newRoom){
		this.roomsRef.push({
			name: newRoom
		})
	}

  	handleSubmit(event) {
    	event.preventDefault();
    	if (!this.state.newRoom) { return }
    	this.createRoom(this.state.newRoom);
    	this.setState( {newRoom: ''});
  	}	

  	handleChange(event) {
    	this.setState({ newRoom: event.target.value });
  	}

  	handleDelete(room) {
  		if (this.props.activeRoomId === room.key) {
  			this.props.handleRoomClick('');
  		}
  		this.setState({rooms: this.state.rooms.filter(rooms => rooms.key !== room.key ) });
  		var roomDelete = this.roomsRef.child(room.key);
  		roomDelete.remove();
  	}

	render() {
		return (
			<div>
				{
					this.state.rooms.map( (room) =>
						<div key={room.key}>
							<button onClick={() => this.props.handleRoomClick(room)}>{room.name}</button>
							<button onClick={() => this.handleDelete(room)}>x</button>
						</div>
					)
				}

				<form onSubmit={ (e) => this.handleSubmit(e) }>
					<label>
						Create a room:
							<input type="text" value={ this.state.newRoom } onChange={ (e) => this.handleChange(e)} />
					</label>
					<input type="submit"/>
				</form>
			</div>
		)
	}
}

export default RoomList;