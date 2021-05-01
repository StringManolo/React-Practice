import { useState } from "react";

const ForgotPassword = () => {
  const [ emailValue, setEmail ] = useState("example@gmail.com");
  const [ passwordValue, setPassword ] = useState("123");

  const hSubmit = e => {
    e.preventDefault();

    let formData = new FormData();
    formData.append("email", emailValue);
    formData.append("password", passwordValue)

    alert("Send email?");
    fetch("http://localhost:8000/forgotPassword", {
      method: "post",
      /*credentials: "include", */
      body: formData
    })
    .then( res => res.json())
    .then( data => {

      if (data.result === true) {
        alert("Email send.");
      } else {
        alert("Service unavailable");
      }
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
      <h1 className="forgotPasswordTitle">Forgot Password</h1>
      <form onSubmit={hSubmit} className="form formforgotPassword">
        <label className="forgotPasswordLabel">
          Email:&nbsp;
          <input type="email" className="forgotPasswordEmail" value={emailValue} onChange={hEmailChange} />
        </label>
        <label className="forgotPasswordLabel">
          Password:&nbsp;
          <input type="password" className="forgotPasswordPassword" value={passwordValue} onChange={hPasswordChange} />
        </label>
        <input type="submit" className="forgotPasswordSubmit" value="submit" />
      </form>
    </>
  )
}

export default ForgotPassword;
