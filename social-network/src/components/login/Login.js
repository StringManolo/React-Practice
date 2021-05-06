import { useState } from "react";
import { Link, Redirect } from "react-router-dom";

const Login = () => {
  const [ emailValue, setEmail ] = useState("");
  const [ passwordValue, setPassword ] = useState("");
  const [ redir, setRedir ] = useState("");

  const hSubmit = e => {
    e.preventDefault();

    let formData = new FormData();
    formData.append("email", emailValue);
    formData.append("password", passwordValue)

    fetch("http://localhost:8000/login", {
      method: "post",
      credentials: "include", 
      body: formData
    })
    .then( res => res.json())
    .then( data => {
      if (data.result === true) {
        setRedir(<Redirect push to={{ pathname: "/profile"}} />);
      }
    })
    .catch( err => alert(err) );

  }

  const hEmailChange = e => {
    setEmail(e.target.value);
  }

  const hPasswordChange = e => {
    setPassword(e.target.value);
  }

  return (
    <>
      <h1 className="loginTitle">Login</h1>
      <form onSubmit={hSubmit} className="form formLogin">
        <label className="loginLabel">
          <input type="email" className="loginEmail" placeholder="              email:" value={emailValue} onChange={hEmailChange} />
        </label>
        <label className="loginLabel">
          <input type="password" className="loginPassword" placeholder="              pass:" value={passwordValue} onChange={hPasswordChange} />
        </label>
        <input type="submit" className="loginSubmit" value="submit" />
      </form>
      <div className="loginLinks">
        <Link to="/signin" className="formLogin signinLink">Create New Account ?</Link>
        <Link to="/forgotPassword" className="formLogin forgotPasswordLink">Forgot Password ?</Link>
      </div>
      { redir }
    </>
  )
}

export default Login;
