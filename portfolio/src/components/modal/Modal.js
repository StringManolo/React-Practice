const Modal = ({position}) => {

  const linkStyles = {
    display: "block",
    textDecoration: "none",
    color: "#000",
    width: "4em",
    height: "2em",
    zIndex: "0",
    fontWeight: "900",
    padding: "1em",
  }

  return (
    <nav style={ position }>
      <a href="#home" style={ linkStyles }>HOME</a>
      <a href="#about" style={ linkStyles }>ABOUT</a>
      <a href="#contact" style={ linkStyles }>CONTACT</a>
    </nav>
  )
}

export default Modal;
