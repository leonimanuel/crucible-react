import React, { Component } from 'react';
import mixpanel from 'mixpanel-browser';
import { Redirect, Link } from "react-router-dom";

// import ClammerSharePic from './clammer_share.png';
import HighlightGif from './contextual-highlight.gif';
import ActivityGif from "./activity.gif"
import DeviceFrame from "./iphone-14-pro-frame.png"
// import SearchGif from "./search.gif"
import SearchGif from "./search-simple.gif"

import ClammerPostPic from './clammer_feed.png';
import ClammerFeedPic from './clammer_feed_2.png';
import ChromeIcon from "./chrome-icon.png"
import SafariIcon from "./safari-logo.png"
import AppleNewsIcon from "./apple-news-logo.png"
import NyTimesIcon from "./nytimes-logo.png"
import WsjIcon from "./wsj-logo.png"
import PlusIcon from "./plus-icon.png"
import SupportingExcerpts from "./supporting_excerpts.png"
import { ReactComponent as AppStoreLogo } from './Download_on_the_App_Store_Badge_US-UK_RGB_blk_092917.svg';

import { API_ROOT, TERMS_AND_CONDITIONS_URL, PRIVACY_POLICY_URL } from "../../constants"

import Carousel from "./Carousel.js";
import AppstoreScreenshotCarousel from "./AppstoreScreenshotCarousel.js"

class AppLandingPage extends Component {	
  state = {
    email: ""
  }	

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    }) 
  }

	handleSubmit = async (e) => {
    e.preventDefault()
    let configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }, 
      body: JSON.stringify({
        email: this.state.email
      })      
    }

    let didSuccessfullyRegister = false
    try {
      let response = await fetch(API_ROOT + `/register-beta`, configObj)
      if (response.status == 200) {
      	didSuccessfullyRegister = true
      	alert("Thank you for signing up for the Clammer iOS Beta. Keep an eye out for an invitation, coming New Years!")      		
      } else { 	
      	alert("Sorry, something went wrong but no sweat, just email leon@clammer.io")
      }
    } catch (error) {
      // alert(error)
      alert("Sorry, something went wrong but no sweat, just email leon@clammer.io")
    }

  	mixpanel.track("Register Waitlist", {
  		success: didSuccessfullyRegister,
  		email: this.state.email
  	})

  	if (didSuccessfullyRegister) {
    	this.setState({email: ""})  
  	}     
	}

	render() {
		return (
			<div id="landing-and-footer-wrapper">
				<div id="app-landing-page">
					<div className="text-container app-landing-subcontainer">
						<h1 className="app-name">Clammer</h1>
						<div className="about-text">
							<h1 className="headline">All your friends on the same page.</h1>
							<h3>Save and share trackable highlights from wherever you get your news. Join the conversation with the facts at your fingertips.</h3>
						</div>

            <a href="https://apps.apple.com/us/app/clammer-weave-your-worldview/id1658190117?utm_source=BenchmarkEmail&utm_campaign=live_on_app_store_email&utm_medium=email">
              <AppStoreLogo />
            </a>
            

						<div className="spacer"></div>
						<div className="spacer"></div>
						<div className="spacer"></div>
					</div>

					<div className="image-container app-landing-subcontainer">
            <AppstoreScreenshotCarousel />
					</div>				
				</div>	

				<div id="footer">
					<ul>
						<li><a href="mailto: leon@clammer.io">Contact Us</a></li>
						<li><a href={TERMS_AND_CONDITIONS_URL} target="_blank" >Terms</a></li>
						<li><a href={PRIVACY_POLICY_URL} target="_blank" >Privacy</a></li>
						<li>Press</li>
					</ul>

					<Link to="/login">Sign In</Link>
				</div>	
			</div>
		)
	}
}

export default (AppLandingPage);

// import React, { Component } from 'react';

// class Jobs extends Component {

// 	render() {
// 		return (
// 			<div id="reviews-overview" className="overview-wrapper">
// 			</div>
// 		)
// 	}
// }

// export default Jobs;