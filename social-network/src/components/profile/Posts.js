import { useState } from "react";
import { Link } from "react-router-dom";


const Posts = props => {
  const [ displayStatus, setDisplayStatus ] = useState(false);
  const [ textareaValue, setTextareaValue ] = useState();

  const hTextareaValue = e => {
    setTextareaValue(e.target.value);
  }

  const toggleReply = e => {
    setDisplayStatus(displayStatus === false ? true : false);
  }

  let posts = [];
  const availablePosts = props.posts;

/*
replies = [
  ["Hello and welcome.", "strmanolo@gmail.com"],
  ["Hi, i'm d1", "d1@gmail.com"]
];

email: req.body.email, 
password: req.body.password,
image: "/favicon.ico",
followers: [ "stringmanolo" ],
following: [ "stringmanolo" ],
posts: [
  ["Welcome!", 1, replies]
]


email: req.body.email,
password: req.body.password,
image: "/favicon.ico",                                                 followers: [ "stringmanolo" ],
following: [ "stringmanolo" ],                                         posts: [                                                                 [                                                                        {                                                                        text: "Welcome!",                                                      id: 1,                                                                 replies: [                                                               {                                                                        text: "Hello and welcome.",                                            author: "strmanolo@gmail.com"                                        },                                                                     {                                                                        text: "Hi, i'm d1",                                                    author: "d1@gmail.com"                                               }                                                                    ]                                                                    }                                                                    ]                                                                    ]

*/

  for (let i in availablePosts) {
    let replies = [];
    if (availablePosts[i].replies) {
      for(let j in availablePosts[i].replies) {
        const userName = availablePosts[i].replies[j].author.split("@")[0];
        const userProfile = `/profiles/${availablePosts[i].replies[j].author.replace("@", "+")}`;
        replies.push(
          <>
            <div className="profilePost reply">
              Reply: {availablePosts[i].replies[j].text}
            </div>
            <div className="profilePost name">
              By: <Link to={userProfile} className="profileLink userLink">{userName}</Link>
            </div>
          </>
        );
      }
    } else {

    }

    posts.push(
      <>
        <article className="profilePost" onClick={toggleReply} >
          {availablePosts[i].text}
        </article>

        RepliesLength: {replies.length}
        {replies.length > 0 && 
	<article className="profilePost replies">
Aqui replies: 
	  {replies}
	</article>}

	{displayStatus === true &&
	<form onSubmit={props.openReply} className="profilePost replyForm" postId={availablePosts[i].id} textareaValue={textareaValue}>
	  <textarea className="profilePost replyTextarea" onChange={hTextareaValue} placeholder="Write your reply...">{textareaValue}</textarea>
	  <input type="submit" className="profilePost replySubmit" value="Add Reply" />
	</form>}
        {props.del === true &&
	<form onSubmit={props.hPostDelete} deleteId={availablePosts[i].id}>
          <input type="submit" className="profilePost delete" value="Delete Post" />
        </form>}
      </>
    );
  }

  return posts;
}

export default Posts;
