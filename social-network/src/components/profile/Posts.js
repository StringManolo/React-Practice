import { Link } from "react-router-dom";
const Posts = props => {
  let posts = [];
  const availablePosts = props.posts;
  for (let i in availablePosts) {
    let replies = [];
    if (availablePosts[i][2] && availablePosts[i][2].length) {
      for(let j in availablePosts[i][2]) {
        const userName = availablePosts[i][2][j][1].split("@")[0];
        availablePosts[i][2][j][1] = availablePosts[i][2][j][1].replace("@", "+");
        const userProfile = `/profiles/${availablePosts[i][2][j][1]}`;
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
        <article className="profilePost" onClick={ e => props.openReply(e) } >
          {availablePosts[i][0]}
        </article>
        
        {replies.length > 0 && 
	<article className="profilePost replies">
	  {replies}
	</article>}
        
	<form onSubmit={props.hPostDelete} deleteId={availablePosts[i][1]}>
          <input type="submit" className="profilePost delete" value="X" />
        </form>
      </>
    );

  }

  return posts;
}

export default Posts;
