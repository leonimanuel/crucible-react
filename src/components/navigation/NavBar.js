import React, { Component } from 'react';
import { Link } from "react-router-dom"
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux"
import "./navigation.css"

import { logOut } from "../../actions/users.js"
import { API_ROOT } from "../../constants"

class NavBar extends Component {
	componentDidMount() {
		// this.updateDailyReviewsBar(500)
		// this.updateDailyFactsCommentsBar(200)		
	}

	updateDailyReviewsBar = (delay) => {
		setTimeout(() => {
			let outerScoreBar = document.getElementById("daily-reviews-bar")
			let scoreBar = document.getElementById("shadow-daily-reviews-bar");
			if (this.props.dailyReviews < 10) {
				scoreBar.style.width = `${this.props.dailyReviews * 10}px`
			} else {
				scoreBar.style.width = "100px"
				outerScoreBar.style.border = "2px solid gold"

				let fraction = document.getElementById("daily-reviews-fraction");
				fraction.style.color = "gold"				
			}			
		}, delay)					
	}

	updateDailyFactsCommentsBar = (delay)	=> {
		setTimeout(() => {
			let outerScoreBar = document.getElementById("daily-facts-comments-bar")
			let scoreBar = document.getElementById("shadow-daily-facts-comments-bar");
			debugger
			if (this.props.dailyFactsComments < 3) {
				scoreBar.style.width = `${this.props.dailyFactsComments * 33.33}px`
			} else {
				scoreBar.style.width = "100px"
				outerScoreBar.style.border = "2px solid gold"

				let fraction = document.getElementById("daily-facts-comments-fraction");
				fraction.style.color = "gold"
			}			
		}, delay)		
	}

	handleLogOut = () => {
		this.props.logOut();
		localStorage.removeItem("token")
    
    // this.props.history.push("/");
	}

	handleEmail = (email) => {
    let configObj = {
	    method: "GET",
	    headers: {
	      "Content-Type": "application/json",
	      Accept: "application/json",
	      Authorization: localStorage.getItem("token"),
	    }
	  	//,
			// body: JSON.stringify({
			// 	inviteEmail: email,
			// })
		}

	  fetch(API_ROOT + `/email`, configObj)
	  //   .then(resp => resp.json())
	  //   .then((response) => {
			// 	debugger
			// })
	}


	render() {
		if (this.props.user) {
			this.updateDailyReviewsBar(500);
			this.updateDailyFactsCommentsBar(200)				
		}
		return (
			<div id="nav-wrapper">
				<div id="menu-options">											
					<Link className="nav-link section-nav-link" to="/" >Home</Link>
				</div>
				
				{this.props.user ?
					<div id="user-ranks">
						<div class="scores-content" id="reach-scores-content">
							<div className="streak-label">Facts:</div>
							<div className="dailys-bar" id="daily-facts-comments-bar">
								<div className="daily-reviews-notch"></div>
								<div className="daily-reviews-notch"></div>
								<div className="daily-reviews-notch"></div>
							
								<div className="shadow-dailys-bar" id="shadow-daily-facts-comments-bar" ></div>
							</div>
							<div id="daily-facts-comments-fraction">{`${this.props.dailyFactsComments}/3`}</div>
						</div>							

						<div class="scores-content" id="review-scores-content">
							<div className="streak-label">Reviews: </div>
							<div className="dailys-bar" id="daily-reviews-bar">
								<div className="daily-reviews-notch"></div>
								<div className="daily-reviews-notch"></div>
								<div className="daily-reviews-notch"></div>
								<div className="daily-reviews-notch"></div>
								<div className="daily-reviews-notch"></div>
								<div className="daily-reviews-notch"></div>
								<div className="daily-reviews-notch"></div>
								<div className="daily-reviews-notch"></div>
								<div className="daily-reviews-notch"></div>
								<div className="daily-reviews-notch"></div>
							
								<div className="shadow-dailys-bar" id="shadow-daily-reviews-bar"></div>
							</div>
							<div id="daily-reviews-fraction">{`${this.props.dailyReviews}/10`}</div>
						</div>
					</div>
					: null
				}

				<div id="profile-options">
					{ this.props.userName 
						? 
							<div className="dropdown">
								<div className="nav-link user-dropdown">{this.props.userName}</div>
								<div className="dropdown-content">
									<Link to="/"><div className="nav-link dropdown-item" onClick={this.handleLogOut}>Logout</div></Link>
								</div>
							</div>
						: 
						<div>
							<Link className="nav-link" to="/login" >Login</Link>
							<Link className="nav-link" to="/signup" >Signup</Link>
						</div>
					} 										
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		userName: state.users.userName,
		user: state.users.user,
		dailyReviews: state.users.dailyReviews,
		dailyFactsComments: state.users.dailyFactsComments		
	}
}

export default connect(mapStateToProps, { logOut })(NavBar);




