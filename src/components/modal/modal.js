import React, { Component } from "react";
// import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";

export default class Login extends Component {
  
    state = {
      email: "",
      password: ""
    };
  

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
	});
  }

  handleSubmit = event => {
	event.preventDefault();
	this.props.login(this.state.email, this.state.password)
  }

  render() {
    return (
		
			<div className="login">
				<form className="wrapper"  onSubmit={this.handleSubmit}>
					<div className="form-group"  >
						<div className="control-label">Email</div>
						<input className ="form-control"
						autoFocus
						type="email"
						name="email"
						value={this.state.email}
						onChange={this.handleChange}
						/>
					</div>
					<div className="form-group"  >
						<div className="control-label">Password</div>
						<input className ="form-control"
						value={this.state.password}
						onChange={this.handleChange}
						type="password"
						name="password"
						/>
					</div>
					<button className="btn btn-outline-secondary"
						disabled={!this.validateForm()}
						type="submit"
						>
						Login
					</button>
			</form>
		</div>
	
    );
  }
}