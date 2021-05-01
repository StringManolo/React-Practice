import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Profile = () => {
  const [ profileTitle, setProfileTitle ] = useState("");
  const [ profilePosts, setProfilePosts ] = useState("");

  useEffect(() => {
    fetch("http://localhost:8000/profile", {
      method: "get",
      credentials: "include"
    })
    .then( res => res.json())
    .then( data => {

      if (data.result === true) {
        if (data.data.email) {
          setProfileTitle(data.data.email);
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
      }
    })
    .catch( err => alert(err) );
  }, []);
	
  return (
    <div className="profileDiv">
      <h1 className="profileTitle">{ profileTitle }</h1>
      <nav className="profileLinks">
        <Link to="/home" className="profileLink homeLink">Home</Link>
        <Link to="/logout" className="profileLink logoutLink">Logout</Link>
      </nav>
      <div className="profilePosts">{ profilePosts }</div>
    </div>
  ) 
}

export default Profile;
