import React, { Component } from 'react';
import { connect } from "react-redux"
// import { v4 as uuidv4 } from 'uuid';

class ArticleContent extends Component {
	createContent = () => {
		let parser = new DOMParser();
		let doc = parser.parseFromString(this.props.discussion.article.content, "text/html")
		let pCollection = doc.getElementsByTagName("p")
		let pArray	= Array.from(pCollection)
		// debugger
		let pTextArray = pArray.map((p, index) => <p key={index} id={`p-${index + 1}`}>{p.innerText}</p>)
		return pTextArray
	}

	render() {
		return (
			<div id={this.props.id} onMouseUp={this.props.onHighlight}>
				{this.props.discussion.article.content === "crucible tutorial" 
					?
						<React.Fragment>
							<p>Right now, you’re inside of a discussion. You’re reading this discussion’s article and in the top-left corner you’ll find a button to open and close this discussion’s forum, where you can freely discuss the discussion’s article with all the other people in the group to which this discussion belongs as well as any guests. Go ahead, try giving it a click.</p>
							<p>Didn’t work, did it? Just as the popup says, you’ll need to either make at least one comment on this discussion or meet both your daily streaks.</p>							

							<p>
								<span style={{"font-weight": "bold"}}>
									Comments 
								</span> 
								<br/>
								To comment on an article, simply highlight the article text that you’d like to comment on, like this sentence, for example. Enter your comment in the popup box that appears. To finish off your comment, you’ll need at least one supporting fact.
							</p>
							
							<p>
								<span style={{"font-weight": "bold"}}>
									Facts 
								</span> 
								<br/>
								Facts are the heart of Crucible and the currency with which comments are created. Facts can come from pretty much anywhere; you can gather facts from any online source using the <a href="https://chrome.google.com/webstore/detail/crucible/npbeagaahjohdgibaddadkhcffnedcnh?authuser=1" target="_blank"></a>Crucible Chrome extension as well as from articles you read in Crucible or from other users’ comments. To use one of the facts you’ve gathered in support of a comment, open the “Facts” section of the sidebar once you’ve started a comment, find your desired fact, and drag it into your comment. Once you have at least one supporting fact, you’re ready to post and unlock the discussion's forum. Each fact that you use in support of a comment brings you one step closer to meeting your daily facts streak, whose progress you can see up top. Hitting your daily streaks for both facts and reviews (we'll cover those in a bit) will unlock all discussion forums for the day.
							</p>
							<p>Once you’ve left a comment, anyone who reads your comment can add any of your comment’s supporting facts into their own fact collection. You get points anytime someone collects one of your comment’s facts as well as anytime someone collects that same fact from someone else's comment and so on. For example, let’s say Alice finds a great fact online and uses it in support of a comment. Billy reads that comment, sees Alice’s great supporting fact, and decides to add it to his own collection. Alice gets points for that. A while later, Billy makes a comment in some other discussion using the same fact. Charlie reads it and adds that same fact to his collection. The moment he does, everyone upstream of that fact’s collection chain gets points; Billy gets 50 for providing the fact to Charlie, Alice gets 100 (50 for providing the fact to Billy + 50 for being the fact’s original finder). You can view your points as well as all your other scores on the home page in the Status section.</p>

							<p>
								<span style={{"font-weight": "bold"}}>
									Reviews 
								</span> 
								<br/>
								Anytime you collect a fact or post a comment it gets submitted for peer review. Who are your peers? Your fellow Crucible members. It is everyone’s shared responsibility to burn the weak facts away so that the true, important may shine through. Accordingly, once it has been reviewed by enough peers, each fact and comment is graded and labeled for everyone to see whether it held up to scrutiny. 
							</p>
							<p>Additionally, any time someone reviews a comment you posted or fact you’ve added to Crucible, your overall accuracy score gets updated. This is a measure of your overall reputability when it comes to collecting and sharing accurate, high-quality information and will be available for all users to see. If you see the gold bar at the top flash green or red, that was someone reviewing one of your facts. To see a detailed breakdown of a fact's review performance, click on it in the Fact section. <i>Note: only facts that you’ve collected from outside Crucible (new facts), not facts you’ve collected from peers’ comments, affect your accuracy score.</i></p>
							<p>Reviewing your peers’ content is a straightforward process: on the home page, in the Review section, simply follow the prompts to make a review decision without personal or political bias. Every review brings you closer to hitting your daily review streak and earns you points. Your fair and unbiased review is critical to the health of the Crucible fact ecosystem. </p>
							
						</React.Fragment>
					: 
						this.createContent()
				}
			</div>
		)
	}
}

// const mapStateToProps = state => {
// 	return {
// 		discussion: state.discussions.allDiscussions.find(d => d.id === state.discussions.selectedDiscussionId),
// 	}
// }

export default connect()(ArticleContent);