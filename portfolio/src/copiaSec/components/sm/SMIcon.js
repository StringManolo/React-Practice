const SMIcon = () => {
 
  const smStyles = {
    color: "#b3a578",
    width: "1.4em",
    fontSize: "1.8em",
    letterSpacing: "-4px",
    zIndex: "1",
  };

  const lineStyles = {
    width: "1.2em",
    height: ".1em",
    backgroundColor: "#000",
    marginTop: "-0.83em",
    zIndex: "2",
    position: "relative",
  }

  const lineStyles2 = {
    width: "1.2em",
    height: ".1em",
    backgroundColor: "#000",
    marginTop: "-0.23em",
    zIndex: "2",
    position: "relative",
  }

  return (
    <div style={ {margin: "-0.6em 0 0 -1em"} }>
      <div style={smStyles}>SM</div>
      <div style={lineStyles}></div>
      <div style={lineStyles2}></div>
    </div>
  )
}

export default SMIcon;
