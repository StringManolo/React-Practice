import { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";

import ProfileInfo from "./ProfileInfo";
import CreatePost from "./CreatePost";
import Promotion from "./Promotion";

const Profile = () => {
  const [ profileTitle, setProfileTitle ] = useState("");
  const [ profilePosts, setProfilePosts ] = useState("");
  const [ profileImage, setProfileImage ] = useState("");
  const [ profileFollowers, setProfileFollowers ] = useState("");
  const [ profileFollowing, setProfileFollowing ] = useState("");
  const [ loginRedir, setLoginRedir ] = useState("");

  const hPostDelete = e => {
    e.preventDefault();

    let formData = new FormData();
    formData.append("deletePost", e.target.getAttribute("deleteId"));
    fetch("http://localhost:8000/deletePost", {
      method: "post",
      credentials: "include",
      body: formData
    })
    .then( res => res.json())
    .then( data => {
      fetchProfile();
    })
    .catch( err => alert(err) );
  }

  const openReply = e => {
    alert("Append textarea to reply");
  }

  const fetchProfile = () => {
    fetch("http://localhost:8000/profile", {
      method: "get",
      credentials: "include"
    })
    .then( res => res.json())
    .then( data => {
      if (data.result === true) {
        if (data.data.email) {
          setProfileTitle(data.data.email.split("@")[0]);
        }

        if (data.data.followers) {
          setProfileFollowers(data.data.followers.length);
	}

	if (data.data.following) {
          setProfileFollowing(data.data.following.length);
        }
  
	if (data.data.image) {
          setProfileImage(data.data.image);
	}
	
	/* Add posts and replies to the component */
	/* TODO: Maybe create a posts component ? */
        if (data.data.posts) {
          let posts = [];
          const availablePosts = data.data.posts;
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
		)
	      }
	    } else {

	    }

            posts.push(
	      <>
                <article className="profilePost" onClick={ e => openReply(e) } >
	          {availablePosts[i][0]}
	        </article>
		{!!replies.length && <article className="profilePost replies">
		  {replies}
		</article> }
		<form onSubmit={hPostDelete} deleteId={availablePosts[i][1]}>
	          <input type="submit" className="profilePost delete" value="X" />
	        </form>
	      </>
            );

          }
          setProfilePosts(posts);
        }
      } else {
        setLoginRedir(<Redirect push to={{ pathname: "/login"}} />);
      }
    })
    .catch( err => alert(err) );
  }

  /* Fetch only once */
  useEffect(() => {
    fetchProfile();
  }, []);

  /* Fetch again from child component (child update the database) */
  const render = () => {
    fetchProfile();
  }

  return (
    <div className="profileDiv">
      <nav className="profileLinks">
        <Link to="/home" className="profileLink homeLink">Home</Link>
        <Link to="/logout" className="profileLink logoutLink">Logout</Link>
      </nav>
      <div className="profileDiv flex">
        <ProfileInfo profileTitle={profileTitle} profileImage={profileImage} profileFollowers={profileFollowers} profileFollowing={profileFollowing} />
        <CreatePost image={profileImage} render={() => render()}/>
	<section className="profilePosts">{ profilePosts }</section>
        <Promotion title="New Social Event" slogan="Try Once, get popular forever" href="https://example.com/social-event.html" innerText="Social Event Example" />
      </div>
      { loginRedir }
    </div>
  ) 
}

export default Profile;

