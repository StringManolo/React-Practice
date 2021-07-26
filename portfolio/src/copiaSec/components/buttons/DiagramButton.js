import { useState } from "react";

const DiagramButton = ({ styles, moveModal }) => {
  const defaultTopStyles = {
    width: "50px",
    height: "2px",
    transition: "width 0.1s, transform 0.3s, margin 0.1s",
    backgroundColor: "#b3a578",
    transformOrigin: "right",
    transform: "rotate(0deg)"
  };

  const defaultBottomStyles = {
    width: "50px",
    height: "2px",
    transition: "width 0.1s, transform 0.3s, margin 0.1s",
    backgroundColor: "#b3a578",
    transformOrigin: "right",
    transform: "rotate(0deg)",
    marginTop: "16px"
  };

  const [ cross, setCross ] = useState(false);
  const [ rotateTop, setRotateTop ] = useState(defaultTopStyles);
  const [ rotateBottom, setRotateBottom ] = useState(defaultBottomStyles);

  const animateDiagram = e => {
    if (cross) {
      setRotateTop(defaultTopStyles);
      setRotateBottom(defaultBottomStyles);
      setCross(false);
      moveModal();
    } else {
      setRotateTop({
        width: "40px",
	marginLeft: "10px",
        height: "2px",
	transition: "width 0.1s, transform 0.3s, margin 0.1s",
	backgroundColor: "#b3a578",
	transformOrigin: "right",
	transform: "rotate(-26deg)",
      });
      setRotateBottom({
	width: "40px",
	marginLeft: "10px",
        height: "2px",
	transition: "width 0.1s, transform 0.3s, margin 0.1s",
	backgroundColor: "#b3a578",
	transformOrigin: "right",
	transform: "rotate(26deg)",
	marginTop: "16px"
      });
      setCross(true);
      moveModal();
    }
  }

  return (
    <div onClick={ e => animateDiagram(e) } style={styles} >
      <div style={ rotateTop } />
      <div style={ rotateBottom } />
    </div>
  );
}

export default DiagramButton;

