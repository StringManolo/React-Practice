import { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";

import ProfileInfo from "./ProfileInfo";
import CreatePost from "./CreatePost";

const Profile = () => {
  const [ profileTitle, setProfileTitle ] = useState("");
  const [ profilePosts, setProfilePosts ] = useState("");
  const [ profileImage, setProfileImage ] = useState("");
  const [ profileFollowers, setProfileFollowers ] = useState("");
  const [ profileFollowing, setProfileFollowing ] = useState("");
  const [ loginRedir, setLoginRedir ] = useState("");

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
		
        if (data.data.posts) {
          let posts = [];
          const availablePosts = data.data.posts;
          for (let i in availablePosts) {
            posts.push(
              <article className="profilePost">
	      {availablePosts[i]}
	      </article>
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
      <ProfileInfo profileTitle={profileTitle} profileImage={profileImage} profileFollowers={profileFollowers} profileFollowing={profileFollowing} />
      <CreatePost image={profileImage} render={() => render()}/>
      <section className="profilePosts">{ profilePosts }</section>
      { loginRedir }
    </div>
  ) 
}

export default Profile;
