import React, { Component } from 'react';

class MessageList extends Component{
	constructor(props){
		super(props);
		this.state = {
			messages: [],
			displayedMessages:[]
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
			this.setState({messages: this.state.messages.concat(messages)});
		})
	}

	updateDisplayedMessages(activeRoomId){
		this.setState({displayedMessages: this.state.messages.filter(message => message.roomId === activeRoomId)});
	}		

	render() {
		return (
			<div>
				{
					this.state.displayedMessages.map((message) =>
						<p key={message.key}>{message.content}</p>
					)
				}
			</div>
		)
	}
}

export default MessageList;