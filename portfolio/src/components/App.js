import { useState } from "react";

import "./App.css";

import Header from "./header/Header.js";
import Modal from "./modal/Modal.js";
import UserImage from "./images/UserImage.js";

const App = () => {

  const userImageStyles = {
    display: "block",
    /*width: "85%",*/
    height: "auto",
  }

  const mainStyles = {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
  }

  const modalStyles = {
    width: "12em",
    height: "100%",
    backgroundColor: "#fff",
    display: "flex",
    flexDirection: "column",
    position: "fixed",
    top: "0",
    right: "-3em",
    zIndex: "0",                                                    paddingTop: "70px",
    transition: "width 0.5s",
  }

  const modalStylesHidden = {
    width: "0",
    height: "100%",
    backgroundColor: "#fff",
    display: "flex",
    flexDirection: "column",
    position: "fixed",
    top: "0",
    right: "-3em",
    zIndex: "0",                                                    paddingTop: "70px",
    transition: "width 0.5s", 
  }

  const [ modalPosition, setModalPosition ] = useState(modalStylesHidden);
  const [ cross, setCross ] = useState(false);

  const moveModal = () => {
    if (cross == false) {
      setModalPosition(modalStyles)
      setCross(true);
    } else {
      setModalPosition(modalStylesHidden);
      setCross(false);
    }
  }

  return (
    <>
      <main style={ mainStyles }>
        <Header moveModal={moveModal} />
        <Modal cross={cross} position={modalPosition} />
        <UserImage styles={userImageStyles} />
      </main>
    </>
  );
}

export default App;
