import { useState } from "react";

import Keypad from "./Keypad.js";
import Screen from "./Screen.js";

const Calc = () => {
  const [ screenValue, changeValue ] = useState(0);

  const calculate = () => {
    /* The point of this app is practice react, not to build a calculator.
     * thats why I'm using eval and not multiple functions or a math expression parser
     * DO NOT USE EVAL IN REAL APPLICATIONS */
    let res = 0;
    try {
      // eslint-disable-next-line
      res = eval(screenValue);
    } catch (er) {
      res = 0;
    }
    if (isNaN(res)) {
      res = 0;
    }
    changeValue(res);
  }

  const buttonCallback = evnt => {
    const buttonValue = evnt.target.innerText;
    switch(buttonValue) {
      case "C":
	changeValue("cleared.");
      break;

      case "=":
	calculate();
      break;

      default:
	// eslint-disable-next-line
        if (screenValue != 0) {
	  if(/c/g.test(screenValue)) {
	    changeValue(buttonValue);
	  } else {
            changeValue(screenValue + buttonValue);
	  }
	} else {
          changeValue(buttonValue);
        }
    }
  }

  return (
    <>
      <Screen value={screenValue} />
      <Keypad sharedCallback={ e => { buttonCallback(e) } } />
    </>
  )
}
export default Calc;
