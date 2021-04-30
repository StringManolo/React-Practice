import { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [ emailValue, setEmail ] = useState("example@gmail.com");
  const [ passwordValue, setPassword ] = useState("123");

  const hSubmit = e => {
    e.preventDefault();

    let formData = new FormData();
    formData.append("email", emailValue);
    formData.append("password", passwordValue)

    fetch("http://localhost:8000/login", {
      method: "post",
      /*credentials: "include", */
      body: formData
    })
    .then( res => res.json())
    .then( data => {
      alert(`Express login response: ${JSON.stringify(data, null, 2)}`);
    })
    .catch( err => alert(err) );

    alert(`Email: ${emailValue}
Password: ${passwordValue}`);
  }

  const hEmailChange = e => {
    setEmail(e.target.value);
  }

  const hPasswordChange = e => {
    setPassword(e.target.value);
  }

  return (
    <>
      <h1 className="loginTitle">Account Login</h1>
      <form onSubmit={hSubmit} className="form formLogin">
        <label className="loginLabel">
          Email:&nbsp;
          <input type="email" className="loginEmail" value={emailValue} onChange={hEmailChange} />
        </label>
        <label className="loginLabel">
          Password:&nbsp;
          <input type="password" className="loginPassword" value={passwordValue} onChange={hPasswordChange} />
        </label>
	<Link to="/sigin" className="formLogin siginLink">Create New Account ?</Link>
	<Link to="/forgotPassword" className="formLogin forgotPasswordLink">Forgot Password ?</Link>
        <input type="submit" className="loginSubmit" value="submit" />
      </form>
    </>
  )
}

export default Login;
