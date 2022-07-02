import React, { useState, useEffect } from "react"

const FormWrapper = ({ children }) => {
	return (
		<div className="form-wrapper">
			<div id="auth-form-and-options">
				<form className="auth-form" id="sign-up-form" onSubmit={this.handleSubmit}>
					<div className="auth-item">
						<label className="form-label auth-form-label">Name: </label>
						<input className="form-input auth-input" type="text" name="name" onChange={this.handleChange} value={this.state.name} required/>						
					</div>

					<div className="auth-item">
						<label className="form-label auth-form-label">Handle: </label>
						<input className="form-input auth-input" type="text" name="handle" onChange={this.handleChange} value={this.state.handle} required/>
					</div>
					<div id="handle-error-box" style={{color: "red", "font-size": "0.8em", width: "80%"}}></div>										
					
					<div className="auth-item">
						<label className="form-label auth-form-label">Email: </label>
						<input className="form-input auth-input" type="email" name="email" onChange={this.handleChange} value={this.state.email} required/>										
					</div>

					<div className="auth-item">
						<label className="form-label auth-form-label">Password: </label>
						<input className="form-input auth-input" type="password" name="password" onChange={this.handleChange} value={this.state.password} required/>										
					</div>
					<div id="error-box" style={{color: "red"}}></div>
					<input className="auth-button" type="submit" value="Sign up"/>
				</form>

				<div id="sign-up-prompt">Already have an account? <Link to="/login">Sign in</Link></div>									
			</div>
		</div>
	)
}

export default FormWrapper;