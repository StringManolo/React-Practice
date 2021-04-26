import { useState } from "react";
import { Link } from "react-router-dom";

const Sigin = () => {
  const [ emailValue, setEmail ] = useState("example@gmail.com");
  const [ passwordValue, setPassword ] = useState("123");
  const [ tosValue, setTos ] = useState(true);

  const hSubmit = e => {
    e.preventDefault();
    alert(`Email: ${emailValue}
Password: ${passwordValue}
Tos: ${tosValue}`);
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
    <h1 className="siginTitle">Account Creation</h1>
    <form onSubmit={hSubmit} className="form formSigin">
      <label className="siginLabel">
        Email:&nbsp; 
        <input type="email" className="siginEmail" value={emailValue} onChange={hEmailChange} required />
      </label>
      <label className="siginLabel">
	Password:&nbsp;
	<input type="password" className="siginPassword" value={passwordValue} onChange={hPasswordChange} required />
      </label>
      <label className="siginLabel">
        <input type="checkbox" checked={tosValue} onChange={hTosChange} required /> I acept the terms of service
      </label>
        <Link to="/login" className="formSigin loginLink">I already have an account</Link>
      <input type="submit" className="siginSubmit" value="submit" />
    </form>
    </>
  )
}

export default Sigin;
