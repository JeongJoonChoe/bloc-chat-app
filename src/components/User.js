import React, { Component } from 'react';

class User extends Component {
	constructor(props){
		super(props);
	}

	componentDidMount(){
		this.props.firebase.auth().onAuthStateChanged( user => {
  			this.props.setUser(user);
		});
	}

	handleSignInClick(){
		const provider = new this.props.firebase.auth.GoogleAuthProvider();
		this.props.firebase.auth().signInWithPopup( provider );
	}

	handleSignOutClick(){
		this.props.firebase.auth().signOut();	
	}

	render() {
		let userName;
		if (this.props.user) {
			userName = this.props.user.displayName;
		}
		return (
			<div>
				<button onClick={() => this.handleSignInClick()}>Sign In</button>
				<button onClick={() => this.handleSignOutClick()}>Sign Out</button>
				<p>{userName}</p>
			</div>
		)
	}
}

export default User;