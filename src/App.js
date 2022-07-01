import React,{ Component } from 'react';
import './App.scss';
import './components/tools/menu.scss';
import './components/tools/modals.scss';
import { BrowserRouter as Router, Redirect, Route} from "react-router-dom";
import { LastLocationProvider } from 'react-router-last-location';
import { connect } from "react-redux"
import { ActionCableConsumer } from "react-actioncable-provider";
import { addMessageToDiscussion, addCommentToDiscussion } from "./actions/discussionsActions.js"
import { resetItemUnderReview, updateAccuracyScore } from "./actions/reviewsActions.js"
import { getArticleRecommendations } from "./actions/briefingsActions.js"
import { API_ROOT } from "./constants"


import NewLandingPage from "./components/home/NewLandingPage.js"
import SideNav from "./containers/SideNav.js"
import Home from "./containers/Home.js"
import NavBar from "./components/navigation/NavBar.js"
import Console from "./containers/Console.js"
import Review from "./containers/Review.js"
import Groups from "./containers/Groups.js"
import Timeline from "./containers/Timeline.js"
import Database from "./containers/Database.js"
import Control from "./containers/Control.js"
import Social from "./components/social/Social.js"
import ArticlesContainer from "./components/articles/ArticlesContainer.js"

import Login from "./components/authentication/Login.js"
import SignUp from "./components/authentication/SignUp.js"
import ConfirmEmail from "./components/authentication/ConfirmEmail.js"
import ResetPassword from "./components/authentication/ResetPassword.js"
import ResetPasswordRequest from "./components/authentication/ResetPasswordRequest.js"
import FeedbackButton from "./components/feedback/FeedbackButton.js"
import Pitch from "./Pitch.js"

import { logIn, resetQuotas } from "./actions/users.js"
import { resetUnreadCount, addDiscussionFromCable } from "./actions/discussionsActions.js"
import { toggleSidenav } from "./actions/sidenavActions.js"
import { addFactFromCable } from "./actions/topicsActions.js"
// import { isLoggedIn } from 

class App extends Component {
  state = {
    sidenavOpen: true
  }

  componentDidMount() {
    this.props.logIn()
    this.props.getArticleRecommendations()

    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
     alert("Crucible is not yet fully optimized for mobile, features will be limited on this device")
    }    
  }

  handleUnreadUpdate = (response) => {
    if (!response.total_unreads) { //special case for chrome extension
      if (response.sender_id !== this.props.userId) {
        this.props.resetUnreadCount(response)      
      }
    }
  }

  handleReceivedMessage = response => {
    debugger
    console.log("handling received message")
    const { message } = response;
    this.props.addMessageToDiscussion(message, this.props.userId)
  }

  handleReceivedComment = response => {
    debugger
    const { comment } = response;
    this.props.addCommentToDiscussion(comment, this.props.userId)   
  }

  handleReadDiscussion = response => {
    debugger
    this.props.resetUnreadCount(response)
  }

  handleReviewedItem = response => {
    debugger
    if (response.daily_reviews) {
      this.props.resetItemUnderReview(response)      
    } else if (response.total_votes) {
      this.props.updateAccuracyScore(response)
    }
  }

  handleMiscItem = response => {
    debugger
    if (response.fact) {
      this.props.addFactFromCable(response)
    } 
    else if (response.discussion) {
      this.props.addDiscussionFromCable(response.discussion)
    } else if (response.quotas) {
      this.props.resetQuotas()
    }
  }

  handleMainClick = () => {
    let sideNav = document.getElementById("side-nav");
    let sectionTabs = document.getElementById("sections-list")
    sideNav.style = `left: -${sideNav.clientWidth - sectionTabs.clientWidth}px`
    this.props.toggleSidenav(false)
  }

  handleSidenavToggle = (bool) => {
    this.props.toggleSidenav(bool)
  }

  render() {
    let blob = document.getElementById("blob")
    if (blob) blob.style.opacity = "1"    
    return (
      <Router>
        <LastLocationProvider>
          <div className="App">

            {/*<div id="blob"></div>*/}
            
            
            <Route 
              path="/confirm-email/:token"
              render={routerProps => this.props.userId ? <Redirect to="/"/> : <ConfirmEmail {...routerProps} />} >
            </Route> 


            {            
              this.props.userId
              ?
                
                <div>
                  {/*<Route path="/" render={routerProps => <NavBar {...routerProps} />} ></Route>*/}
                  
                  {/*
                    <ActionCableConsumer 
                      channel={{ channel: "MessageNotificationsChannel", user: this.props.userId }}
                      onReceived={this.handleUnreadUpdate} 
                    />          

                    <ActionCableConsumer 
                      channel={{ channel: "MessagesChannel", user: this.props.userId }}
                      onReceived={this.handleReceivedMessage} 
                    />

                    <ActionCableConsumer 
                      channel={{ channel: "CommentsChannel" }}
                      onReceived={this.handleReceivedComment} 
                    />            

                    <ActionCableConsumer 
                      channel={{ channel: "ReadDiscussionChannel", user: this.props.userId }}
                      onReceived={this.handleReadDiscussion} 
                    />    

                    <ActionCableConsumer 
                      channel={{ channel: "ReviewsChannel", user: this.props.userId }}
                      onReceived={this.handleReviewedItem} 
                    />    

                    <ActionCableConsumer 
                      channel={{ channel: "MiscChannel", user: this.props.userId }}
                      onReceived={this.handleMiscItem} 
                    />                      
                  */}
  

                  
                  <main id="main-content" onClick={this.handleMainClick}>               

                    <SideNav onSidenavToggle={this.handleSidenavToggle}/>
                    {/*<Route exact path="/"><Home/></Route>*/}
                    <Timeline/>
                    {<Route path="/console"><Console/></Route>}
                    <Route path="/review"><Review/></Route>
                    {/*<Route path="/groups"><Timeline/></Route>*/}  
                    <Route path="/database"><Database/></Route>  
                    
                    {/*<Social />*/}
                    <ArticlesContainer />
                    <FeedbackButton />
                  </main>
                </div>
              : 
                <React.Fragment>
                  <Route exact path="/" component={NewLandingPage} userId={this.props.userId}/>
                  <Route path="/groups">{this.props.loginFailed ? <Redirect to="/login"/> : null}</Route>                   
                </React.Fragment> 
            }            
              <Route path="/login"><Login/></Route>
              <Route path="/signup"><SignUp/></Route> 
              <Route path="/control"><Control/></Route> 

              <Route path="/reset-password-request"><ResetPasswordRequest/></Route>

              <Route 
                path="/reset-password/:token"
                render={routerProps => this.props.userId ? <Redirect to="/"/> : <ResetPassword {...routerProps} />} >
              </Route> 


          
            <Route path="/v2-brief"><Pitch /></Route>
          </div>      
        </LastLocationProvider>
      </Router>
    );
  }
}

const mapStateToProps = state => {
  return {
    userId: state.users.userId,
    isConfirmed: state.users.isConfirmed,
    loginFailed: state.users.loginFailed
  }
}

export default connect(mapStateToProps, { logIn, resetUnreadCount, addMessageToDiscussion, addCommentToDiscussion, resetItemUnderReview, updateAccuracyScore, toggleSidenav, addFactFromCable, addDiscussionFromCable, resetQuotas, getArticleRecommendations })(App);




