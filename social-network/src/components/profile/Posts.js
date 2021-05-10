import { useState } from "react";
import { Link } from "react-router-dom";


const Posts = props => {
  const [ displayStatus, setDisplayStatus ] = useState(false);
  const toggleReply = e => {
    setDisplayStatus(displayStatus === false ? true : false);
  }

  let posts = [];
  const availablePosts = props.posts;
  for (let i in availablePosts) {
    let replies = [];
    if (availablePosts[i][2] && availablePosts[i][2].length) {
      for(let j in availablePosts[i][2]) {
        const userName = availablePosts[i][2][j][1].split("@")[0];
        const userProfile = `/profiles/${availablePosts[i][2][j][1].replace("@", "+")}`;
        replies.push(
          <>
            <div className="profilePost reply">
              Reply: {availablePosts[i][2][j][0]}
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
          {availablePosts[i][0]}
        </article>
        
        {replies.length > 0 && 
	<article className="profilePost replies">
	  {replies}
	</article>}

	{displayStatus === true &&
	<form onSubmit={props.openReply} postId={availablePosts[i][1]}>
	  <textarea placeholder="Write your reply..."></textarea>
	  <input type="submit" className="profilePost reply" value="Add Reply" />
	</form>}

	<form onSubmit={props.hPostDelete} deleteId={availablePosts[i][1]}>
          <input type="submit" className="profilePost delete" value="X" />
        </form>
      </>
    );

  }

  return posts;
}

export default Posts;
