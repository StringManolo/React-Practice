import { Route, Switch } from "react-router-dom";

import Login from "./login/Login.js";
import Sigin from "./sigin/Sigin.js";
import Home from "./home/Home.js";
import NotFound from "./errorPages/NotFound.js";
import Profile from "./profile/Profile.js"
import "../index.css";

const App = () => (
  <>
    <Switch>
      <Route path="/" component={Home} exact />
      <Route path="/home" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/sigin" component={Sigin} />
      <Route path="/profile" component={Profile} />
      <Route component={NotFound} />
    </Switch>
  </>
)

export default App;
