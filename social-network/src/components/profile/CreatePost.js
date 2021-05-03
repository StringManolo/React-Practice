import { useState } from "react";

const CreatePost = props => {
  const [ inputValue, setInputValue ] = useState("");

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
      if (data.result === true) {
        props.render();
      } else {
        alert(data.data.error || "Server error");
      }
    })
    .catch( err => alert(err) );

  }

  const hInputChange = e => setInputValue(e.target.value); 

  return (
    <form onSubmit={hSubmit} className="createPost">
      <img className="smallProfileImage" src={props.image} alt="small user" />
      <input className="createPost input" type="text" value={inputValue} onChange={hInputChange} /> 
      <input className="createPost button" type="submit" value="Make Public" />
    </form>
  );
}

export default CreatePost;
