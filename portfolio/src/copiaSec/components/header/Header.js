import SMIcon from "../sm/SMIcon.js";
import DiagramButton from "../buttons/DiagramButton.js";

const Header = ({moveModal}) => {
  const diagaramPosition = {
    right: "0",
    width: "2em",
    zIndex: "10",
    position: "relative",
  }

  const headerStyles = {
    width: "100%",
    padding: "2em",
    display: "flex",
    justifyContent: "space-between",
    position: "realtive",
    zIndex: "2"
  }

  return (
    <header style={ headerStyles }>
      <SMIcon />
      <DiagramButton moveModal={moveModal} styles={ diagaramPosition }/>
    </header>
  )
}

export default Header;
