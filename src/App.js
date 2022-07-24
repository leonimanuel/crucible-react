import React, { useState, useEffect } from "react"
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
import { API_ROOT, GA4_MEASUREMENT_ID, MIXPANEL_TOKEN, APP_NAME } from "./constants"
import ReactGA from "react-ga4";
import mixpanel from 'mixpanel-browser';


import NewLandingPage from "./components/home/NewLandingPage.js"
import SideNav from "./containers/SideNav.js"
// import Home from "./containers/Home.js"
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
// import { addFactFromCable } from "./actions/topicsActions.js"
// import { isLoggedIn } from 

const App = props => {
  // const [stateSidenavvOpen, setStateSidenavOpen] = useState(true);

  // state = {
  //   sidenavOpen: true
  // }

  useEffect(() => {
    console.log("API ROOT: " + API_ROOT)
    ReactGA.initialize(GA4_MEASUREMENT_ID);
    mixpanel.init(MIXPANEL_TOKEN);
    // ReactGA.initialize([
    //   {
    //     trackingId: GA4_MEASUREMENT_ID,
    //   }
    // ]);

    // Send pageview with a custom path
    // ReactGA.send({ hitType: "pageview", page: "/" });

    // window.dataLayer = window.dataLayer || [];
    // function gtag() {dataLayer.push(arguments);}
    // gtag('config', 'G-YT8SYJHZTD', {
    //   'user_id': localStorage.getItem("userId")
    // });
    // window.dataLayer.push({

    // })

    props.logIn()
    props.getArticleRecommendations()

    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
     alert(`${APP_NAME} is not yet fully optimized for mobile, features will be limited on this device`)
    }       
  }, [])

  // componentDidMount() {
  //   ReactGA.initialize([
  //     {
  //       trackingId: "your GA measurement id",
  //     }
  //   ]);

  //   // Send pageview with a custom path
  //   ReactGA.send({ hitType: "pageview", page: "/" });

  //   props.logIn()
  //   props.getArticleRecommendations()

  //   if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
  //    alert("Crucible is not yet fully optimized for mobile, features will be limited on this device")
  //   }    
  // }

  const handleUnreadUpdate = (response) => {
    if (!response.total_unreads) { //special case for chrome extension
      if (response.sender_id !== props.userId) {
        props.resetUnreadCount(response)      
      }
    }
  }

  // const handleReceivedMessage = response => {
  //   debugger
  //   console.log("handling received message")
  //   const { message } = response;
  //   props.addMessageToDiscussion(message, props.userId)
  // }

  // const handleReceivedComment = response => {
  //   debugger
  //   const { comment } = response;
  //   props.addCommentToDiscussion(comment, props.userId)   
  // }

  // const handleReadDiscussion = response => {
  //   debugger
  //   props.resetUnreadCount(response)
  // }

  // const handleReviewedItem = response => {
  //   debugger
  //   if (response.daily_reviews) {
  //     props.resetItemUnderReview(response)      
  //   } else if (response.total_votes) {
  //     props.updateAccuracyScore(response)
  //   }
  // }

  // const handleMiscItem = response => {
  //   debugger
  //   if (response.fact) {
  //     props.addFactFromCable(response)
  //   } 
  //   else if (response.discussion) {
  //     props.addDiscussionFromCable(response.discussion)
  //   } else if (response.quotas) {
  //     props.resetQuotas()
  //   }
  // }

  const handleMainClick = () => {
    let sideNav = document.getElementById("side-nav");
    let sectionTabs = document.getElementById("sections-list")
    sideNav.style = `left: -${sideNav.clientWidth - sectionTabs.clientWidth}px`
    props.toggleSidenav(false)
  }

  const handleSidenavToggle = (bool) => {
    props.toggleSidenav(bool)
  }
  
  const renderMain = () => {
    return (
      <div>        
        <main id="main-content" onClick={handleMainClick}>               

          <SideNav onSidenavToggle={handleSidenavToggle}/>
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
    )
  }
  // basically, what I'm trying to say if that exact path === "/", then if user logged in, load main stuff, else load landing page
  // else, if exact path === "/discover", 

  const allPaths = ["/timeline", "/discover", "/profiles", "/groups", "/posts"]
  return (
    <Router>
      <LastLocationProvider>
        <div className="App">
          <Route 
            path="/confirm-email/:token"
            render={routerProps => props.userId ? <Redirect to="/"/> : <ConfirmEmail {...routerProps} />} >
          </Route> 

          <Route path="/login"><Login/></Route>
          <Route path="/signup"><SignUp/></Route> 
          <Route path="/control"><Control/></Route> 

          <Route path="/reset-password-request"><ResetPasswordRequest/></Route>

          <Route 
            path="/reset-password/:token"
            render={routerProps => props.userId ? <Redirect to="/"/> : <ResetPassword {...routerProps} />} >
          </Route> 
        
          <Route path="/v2-brief"><Pitch /></Route>

          <Route path={allPaths} render={routerProps => <NavBar {...routerProps} />} ></Route>
          <Route exact path="/" render={routerProps => <NavBar {...routerProps} />} ></Route>

          {
            !props.userId 
              ?
            <React.Fragment>
              <Route exact path="/"><NewLandingPage/></Route>
              <Route path={allPaths}>{renderMain()}</Route>              
            </React.Fragment>
              :
            <React.Fragment>
              <Route exact path="/">{renderMain()}</Route>           
              <Route path={allPaths}>{renderMain()}</Route>
            </React.Fragment>
          }



        </div>      
      </LastLocationProvider>
    </Router>
  );
}

const mapStateToProps = state => {
  return {
    userId: state.users.userId,
    isConfirmed: state.users.isConfirmed,
    loginFailed: state.users.loginFailed
  }
}

export default connect(mapStateToProps, { logIn, resetUnreadCount, addMessageToDiscussion, addCommentToDiscussion, resetItemUnderReview, updateAccuracyScore, toggleSidenav, addDiscussionFromCable, resetQuotas, getArticleRecommendations })(App);




