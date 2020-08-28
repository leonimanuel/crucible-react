import React, { Component } from 'react';
import { Link } from "react-router-dom"
import splitRetain from "split-retain"
import "./landing-page.css"
import Claire from "./IMG-4792.JPG"
class LandingPage extends Component {
	componentDidMount() {
    // BLOB
    let blob = document.querySelector("#blob")
		blob.style.width = "100%"
		blob.style.height = "100%"		
		blob.style.borderRadius = "0px";

		let wordArray = document.querySelectorAll(".welcome-word")
		let nodeToJsArr = []
		wordArray.forEach(word => nodeToJsArr.push(word))
		let shuffledArray = this.shuffle(nodeToJsArr)
		shuffledArray.forEach((word, index) => {
			setTimeout(() => {
				word.style.opacity = "1";
				// setTimeout(() => {
				// 	word.style.backgroundColor = "#0f4c75"
				// 	// word.style.filter = "blur(0px)";
				// }, 10*index)
			}, 50*index)

			setTimeout(() => {
				shuffledArray.forEach((word, index) => {
					setTimeout(() => {
						word.style.backgroundColor = "#0f4c75"
					}, 100*index)
				})
			}, 2500)
		})
		
		let header = document.getElementById("welcome-header")
		setTimeout(() => header.style.opacity = "1", 1500)

		let buttons = document.getElementById("landing-buttons-container")
		setTimeout(() => buttons.style.opacity = "1", 4500)		
	}

	renderText = () => {
		// let text = "We hold these truths to be self-evident, that all men are created equal, that they are endowed by their Creator with certain unalienable Rights, that among these are Life, Liberty and the pursuit of Happiness. That to secure these rights, Governments are instituted among Men, deriving their just powers from the consent of the governed, --That whenever any Form of Government becomes destructive of these ends, it is the Right of the People to alter or to abolish it, and to institute new Government, laying its foundation on such principles and organizing its powers in such form, as to them shall seem most likely to effect their Safety and Happiness. Prudence, indeed, will dictate that Governments long established should not be changed for light and transient causes; and accordingly all experience hath shewn, that mankind are more disposed to suffer, while evils are sufferable, than to right themselves by abolishing the forms to which they are accustomed."
		let text = "Crucible was designed as an antidote to modern public discourse; a bulwark against the empty rhetoric that seems to fill up more and more of our airwaves and news feeds. It's predicated on the idea that we owe it to ourselves and to each other to know, without hesitation, why we stand where we stand on the issues and that the ground beneath our feet is solid.\n\nOn Crucible, the right to be heard is not a given; it's earned. It's a place where research and accuracy is rewarded and the lazy and disingenuous penalized. Where mistruth, generalizations and lies are burned away by the flames of scrutiny so that truth can shine through.\n\nConversation is the lifeblood of society. Truth is its foodstuff, misinformation is its poison. In these next few months, when the two start getting all jumbled up, outpace and cut through the noise, with Crucible." 
		// let textArray = text.split(" ")
		let textArray = splitRetain(text, "y")
		return textArray.map(word => {
			return (
				<React.Fragment>
					{/*<span className="welcome-word">{word}</span><span> </span>*/}
					<span className="welcome-word">{word}</span>
				</React.Fragment>
			)
		})		
	}

	shuffle = (array) => {
	  var currentIndex = array.length, temporaryValue, randomIndex;

	  // While there remain elements to shuffle...
	  while (0 !== currentIndex) {

	    // Pick a remaining element...
	    randomIndex = Math.floor(Math.random() * currentIndex);
	    currentIndex -= 1;

	    // And swap it with the current element.
	    temporaryValue = array[currentIndex];
	    array[currentIndex] = array[randomIndex];
	    array[randomIndex] = temporaryValue;
	  }

	  return array;
	}

	render() { 	
		return (
			<div id="landing-page">
				<h3 id="welcome-header">Welcome to Crucible   <span style={{"background-color": "gold", "border-radius": "5px", "font-size": "0.7em", "padding": "0 5px", "color": "black"}}>beta for Chrome</span></h3>

				<div id="main-text">
					{this.renderText()}
				</div>
				<div id="landing-buttons-container">
					<Link to="/login"><button className="landing-button" id="landing-login-buttom">log in</button></Link>
					<Link to="/signup"><button className="landing-button" id="landing-create-account-buttom">create account</button></Link>
				</div>
			</div>
		)
	}
}


export default LandingPage;