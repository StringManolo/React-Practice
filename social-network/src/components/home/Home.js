import { Link } from "react-router-dom";

const Home = () => (
  <div className="homeDiv">
    <h1 className="homeTitle">SNRPG</h1>
    <nav className="homeLinks">
      <Link to="/login" className="homeLink loginLink">Login</Link>
      <Link to="/signin" className="homeLink signinLink">Sign-In</Link>
    </nav>
  </div>
)

export default Home;
