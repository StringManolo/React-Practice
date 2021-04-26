import { Link } from "react-router-dom";

const Home = () => (
  <>
    <Link to="/login" className="link homeLink">Login</Link>
    <Link to="/sigin" className="link homeLink">Sigin</Link>
  </>
)

export default Home;
