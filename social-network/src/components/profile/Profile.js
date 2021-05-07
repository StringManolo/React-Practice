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
    alert("Not yet available");
    //fetch(`http://localhost:8000/delete?$post{e.target.value}
  }

  const fetchProfile = () => {
    fetch("http://localhost:8000/profile", {
      method: "get",
      credentials: "include"
    })
    .then( res => res.json())
    .then( data => {
alert(JSON.stringify(data, null, 2));
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
		
        if (data.data.posts) {
          let posts = [];
          const availablePosts = data.data.posts;
          for (let i in availablePosts) {
            posts.push(
	      <>
                <article className="profilePost">
	        {availablePosts[i][0]}
	        </article>
	        <input type="button" onClick={hPostDelete} className="profilePost delete" value="X" deleteId={availablePosts[i][1]} />
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

