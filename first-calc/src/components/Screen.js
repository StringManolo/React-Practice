const Screen = props => {

  const ScreenStyles = {
    width: props.width || "232px",
    height: props.height || "35px",
    padding: "2px",
    marginLeft: "2px",
    textAlign: "right",
    backgroundColor: "#000",
    color: "#fff"
  }
  
  return (
    <input type="text" value={props.value} style={ScreenStyles}/>
  )
}

export default Screen;
