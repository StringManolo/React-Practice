import { useState } from "react";

const CreatePost = props => {
  const [ inputValue, setInputValue ] = useState("")

  const hSubmit = e => {
    e.preventDefault();

    let formData = new FormData();
    formData.append("post", inputValue);

    fetch("http://localhost:8000/profile", {
      method: "post",
      credentials: "include",
      body: formData
    })
    .then( res => res.json())
    .then( data => {
      alert(JSON.stringify(data, null, 2));
    })
    .catch( err => alert(err) );

  }

  const hInputChange = e => setInputValue(e.target.value); 

  return (
    <form onSubmit={hSubmit} className="createPost">
      <img className="smallProfileImage" src={props.image} alt="small user" />
      <input type="text" value={inputValue} onChange={hInputChange} /> 
      <input type="button" value="Make Public" />
    </form>
  );
}

export default CreatePost;
