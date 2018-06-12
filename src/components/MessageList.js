import React, { Component } from 'react';

class MessageList extends Component{
	constructor(props){
		super(props);
		this.state = {
			messages: [],
			displayedMessages:[],
			newMessage:[]
		}
		this.messageRef = this.props.firebase.database().ref('messages');
	}
		
	componentWillReceiveProps(nextProps){
		this.updateDisplayedMessages(nextProps.activeRoomId);
	}

	componentDidMount(){
		this.messageRef.on('child_added', snapshot => {
			const messages = snapshot.val();
			messages.key = snapshot.key;	
			this.setState({messages: this.state.messages.concat(messages)}, () =>
				this.updateDisplayedMessages(this.props.activeRoomId));
		})
	}

	createMessage(newMessage){
		var currentTime = new Date();
		this.messageRef.push({
			content: newMessage,
			roomId: this.props.activeRoomId,
			sentAt: currentTime.toLocaleTimeString(),
			username: this.props.user.displayName
		})
	}

  	handleSubmit(event) {
    	event.preventDefault();
    	if (!this.state.newMessage || !this.props.user) { return }
    	this.createMessage(this.state.newMessage);
    	this.setState( {newMessage: ''});
  	}	

  	handleChange(event) {
    	this.setState({ newMessage: event.target.value });
  	}

	updateDisplayedMessages(activeRoomId){
		this.setState({displayedMessages: this.state.messages.filter(message => message.roomId === activeRoomId)});
	}

	formatTime(time) {
	}		

	render() {
		return (
			<div>
				{
					this.state.displayedMessages.map((message) =>
						<p key={message.key}>{message.username}: {message.content} - {message.sentAt}</p>

					)
				}

				<form onSubmit={ (e) => this.handleSubmit(e) }>
					<label>
						<input type="text" value={ this.state.newMessage } onChange={ (e) => this.handleChange(e)} />
					</label>
					<input type="submit"/>
				</form>
			</div>
		)
	}
}

export default MessageList;