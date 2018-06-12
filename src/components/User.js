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
				<button onClick={this.props.user ? () => this.handleSignOutClick() :() => this.handleSignInClick()}>
					<span>{this.props.user ? "Sign Out" : "Sign In" }</span> 
				</button>
				<p>{userName}</p>
			</div>
		)
	}
}

export default User;