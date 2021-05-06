import { useState } from "react";
import { Link, Redirect } from "react-router-dom";

const Signin = () => {
  const [ emailValue, setEmail ] = useState("");
  const [ passwordValue, setPassword ] = useState("");
  const [ tosValue, setTos ] = useState(true);
  const [ loginRedir, setLoginRedir ] = useState();

  const hSubmit = e => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("email", emailValue);
    formData.append("password", passwordValue);
    formData.append("tos", tosValue);

    fetch("http://localhost:8000/signin", {
      method: "post",
      body: formData
    })
    .then( res => res.json())
    .then( data => {
      if (data.result === true) {
        setLoginRedir(<Redirect push to={{ pathname: "/login"}} />);
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

  const hTosChange = e => {
    setTos(e.target.checked);
  }

  return (
    <>
    <h1 className="signinTitle">Sign-In</h1>
    <form onSubmit={hSubmit} className="form formSignin">
      <label className="signinLabel">
        <input type="email" className="signinEmail" placeholder="              email:" value={emailValue} onChange={hEmailChange} required />
      </label>
      <label className="signinLabel">
	<input type="password" className="signinPassword" placeholder="              pass:" value={passwordValue} onChange={hPasswordChange} required />
      </label>
      <label className="signinLabel">
        <input type="checkbox" className="signinCheckbox" checked={tosValue} onChange={hTosChange} required />
	<span></span>
	<center>terms of service</center>
      </label>
      <input type="submit" className="signinSubmit" value="submit" />
    </form>
    <Link to="/login" className="formSignin loginLink">I already have an account</Link>
    { loginRedir }
    </>
  )
}

export default Signin;
