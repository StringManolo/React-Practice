import { Link } from "react-router-dom";

const Profile = () => {
  fetch("http://localhost:8000/profile", {
    method: "get",
    credentials: "include"
  })
  .then( res => res.json())
  .then( data => {
    alert(`Express profile response: ${JSON.stringify(data, null, 2)}`);
  })
  .catch( err => alert(err) );

  return (
    <div className="profileDiv">
      <h1 className="profileTitle">EMAIL</h1>
      <nav className="profileLinks">
        <Link to="/home" className="profileLink homeLink">Home</Link>
        <Link to="/logout" className="profileLink logoutLink">Logout</Link>
      </nav>
    </div>
  ) 
}

export default Profile;
