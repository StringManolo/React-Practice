import { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";

const Logout = () => {
  const [ logoutContent, setLogoutContent ] = useState("");
  const [ redir, setRedir ] = useState("");
  useEffect(() => {
    fetch("http://localhost:8000/logout", {
      method: "get",
      credentials: "include"
    })
    .then( res => res.json())
    .then( data => {

      if (data.result === true) {
        setLogoutContent("Logged out");
	setRedir(<Redirect push to={{ pathname: "/home"}} />);
      } else {
        setLogoutContent("No session open");
	setRedir(<Redirect push to={{ pathname: "/login"}} />);
      }

    })
    .catch( err => alert(err) );
  }, []);
  return (
    <div className="logoutDiv">
      <h1 className="logoutTitle">{ logoutContent }</h1>
      <nav className="logoutLinks">
        <Link to="/home" className="logoutLink homeLink">Home</Link>
      </nav>
      { redir }
    </div>
  ) 
}

export default Logout;
