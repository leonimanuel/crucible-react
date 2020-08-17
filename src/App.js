import React,{ Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Redirect, Route} from "react-router-dom";
import { LastLocationProvider } from 'react-router-last-location';
import { connect } from "react-redux"
import { ActionCableConsumer } from "react-actioncable-provider";
import { addMessageToDiscussion } from "./actions/discussionsActions.js"
import { addCommentToDiscussion } from "./actions/discussionsActions.js"
import { resetItemUnderReview, updateAccuracyScore } from "./actions/reviewsActions.js"
import LandingPage from "./components/home/LandingPage.js"

import SideNav from "./containers/SideNav.js"
import Home from "./containers/Home.js"
import NavBar from "./components/navigation/NavBar.js"
import Console from "./containers/Console.js"
import Review from "./containers/Review.js"
import Groups from "./containers/Groups.js"
import Login from "./components/authentication/Login.js"
import SignUp from "./components/authentication/SignUp.js"
import ConfirmEmail from "./components/authentication/ConfirmEmail.js"
import FeedbackButton from "./components/feedback/FeedbackButton.js"

import { logIn } from "./actions/users.js"
import { resetUnreadCount } from "./actions/discussionsActions.js"
// import { isLoggedIn } from 

class App extends Component {
  componentDidMount() {
    this.props.logIn()
  }

  handleUnreadUpdate = (response) => {
    debugger
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
    this.props.addCommentToDiscussion(comment)   
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

  render() {
    let blob = document.getElementById("blob")
    if (blob) blob.style.opacity = "1"    
    return (
      <Router>
        <LastLocationProvider>
          <div className="App">

            <div id="blob"></div>
            <Route path="/" render={routerProps => <NavBar {...routerProps} />} ></Route>           
            
            {this.props.userId 
              ?
                <div>
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

                  <main>
                    <SideNav />
                    <Route exact path="/"><Home/></Route>
                    <Route path="/console"><Console/></Route>
                    <Route path="/review"><Review/></Route>
                    <Route path="/groups"><Groups/></Route>           
                    <FeedbackButton />
                  </main>
                </div>
              : 
                <React.Fragment>
                  <Route exact path="/" component={LandingPage} userId={this.props.userId}/>
                  <Route path="/groups">{this.props.loginFailed ? <Redirect to="/login"/> : null}</Route>                   
                </React.Fragment> 
            }            
              <Route path="/login"><Login/></Route>
              <Route path="/signup"><SignUp/></Route> 
              <Route 
                path="/:token/confirm-email"
                render={routerProps => this.props.userId ? <Redirect to="/"/> : <ConfirmEmail {...routerProps} />} >
              </Route> 
          </div>      
        </LastLocationProvider>
      </Router>
    );
  }
}

const mapStateToProps = state => {
  return {
    userId: state.users.userId,
    loginFailed: state.users.loginFailed
  }
}

export default connect(mapStateToProps, { logIn, resetUnreadCount, addMessageToDiscussion, addCommentToDiscussion, resetItemUnderReview, updateAccuracyScore })(App);




