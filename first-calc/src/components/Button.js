const Button = props => {

  const ButtonStyles = {
    width: props.width || "60px",
    height: props.height || "60px",
    padding: props.padding || "5px", 
    color: props.color || "#fff",
    backgroundColor: props.backgroundColor || "#000"
  };

  return (
    <button type="button" onClick={props.sharedCallback} style={ButtonStyles}>{props.innerText}</button>
  )
}

export default Button;
