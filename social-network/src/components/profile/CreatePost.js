import { useState } from "react";

const CreatePost = props => {
  const [ textareaValue, setTextareaValue ] = useState("");

  const hSubmit = e => {
    e.preventDefault();

    let formData = new FormData();
    formData.append("post", textareaValue);

    fetch("http://localhost:8000/profile", {
      method: "post",
      credentials: "include",
      body: formData
    })
    .then( res => res.json())
    .then( data => {
      if (data.result === true) {
        props.render();
	setTextareaValue("");
      } else {
        alert(data.data.error || "Server error");
      }
    })
    .catch( err => alert(err) );

  }

  const hTextareaChange = e => setTextareaValue(e.target.value); 

  return (
    <form onSubmit={hSubmit} className="createPost">
      <img className="smallProfileImage" src={props.image} alt="small user" />
      <textarea className="createPost textarea" placeholder=" New Post..." value={textareaValue} onChange={hTextareaChange} /> 
      <input className="createPost button" type="submit" value="Make Public" />
    </form>
  );
}

export default CreatePost;
