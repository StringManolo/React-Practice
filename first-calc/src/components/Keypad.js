import Button from "./Button.js";

const simbolsBackground = "#333";
const simbolsColor = "orange";
const keypadBackground = "#000";

const Keypad = props => (
  <section styles={ { keypadBackground } }>
    <article>
      <Button innerText="7" sharedCallback={props.sharedCallback} />
      <Button innerText="8" sharedCallback={props.sharedCallback} />
      <Button innerText="9" sharedCallback={props.sharedCallback} />
      <Button innerText="C" sharedCallback={props.sharedCallback} backgroundColor={simbolsBackground} color={simbolsColor} />
    </article>

    <article>
      <Button innerText="4" sharedCallback={props.sharedCallback} />
      <Button innerText="5" sharedCallback={props.sharedCallback} />
      <Button innerText="6" sharedCallback={props.sharedCallback} />
      <Button innerText="+" sharedCallback={props.sharedCallback} backgroundColor={simbolsBackground} color={simbolsColor}/>
    </article>

    <article>
      <Button innerText="1" sharedCallback={props.sharedCallback} />
      <Button innerText="2" sharedCallback={props.sharedCallback} />
      <Button innerText="3" sharedCallback={props.sharedCallback} />
      <Button innerText="-" sharedCallback={props.sharedCallback} backgroundColor={simbolsBackground} color={simbolsColor}/>
    </article>

    <article>
      <Button innerText="*" sharedCallback={props.sharedCallback} />
      <Button innerText="0" sharedCallback={props.sharedCallback} />
      <Button innerText="%" sharedCallback={props.sharedCallback} />
      <Button innerText="=" sharedCallback={props.sharedCallback} backgroundColor={simbolsBackground} color={simbolsColor}/>
    </article>
  </section>
)

export default Keypad;
