import { useState } from "react";

const ForgotPassword = () => {
  const [ emailValue, setEmail ] = useState("");

  const hSubmit = e => {
    e.preventDefault();

    let formData = new FormData();
    formData.append("email", emailValue);

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
  }

  const hEmailChange = e => {
    setEmail(e.target.value);
  }

  return (
    <>
      <h1 className="forgotPasswordTitle">Recover</h1>
      <form onSubmit={hSubmit} className="form formforgotPassword">
        <label className="forgotPasswordLabel">
          <input type="email" className="forgotPasswordEmail" placeholder="              email:" value={emailValue} onChange={hEmailChange} />
        </label>
        <input type="submit" className="forgotPasswordSubmit" value="submit" />
      </form>
    </>
  )
}

export default ForgotPassword;
