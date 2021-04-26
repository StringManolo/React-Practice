import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import App from "./components/App.js";

const socialNetwork = (
  <>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </>
)

ReactDOM.render(socialNetwork, document.getElementById("root"));
