import Button from "./Button.js";

const Keypad = props => (
  <section>
    <article>
      <Button innerText="7" sharedCallback={props.sharedCallback} />
      <Button innerText="8" sharedCallback={props.sharedCallback} />
      <Button innerText="9" sharedCallback={props.sharedCallback} />
      <Button innerText="C" sharedCallback={props.sharedCallback} />
    </article>

    <article>
      <Button innerText="4" sharedCallback={props.sharedCallback} />
      <Button innerText="5" sharedCallback={props.sharedCallback} />
      <Button innerText="6" sharedCallback={props.sharedCallback} />
      <Button innerText="+" sharedCallback={props.sharedCallback} />
    </article>

    <article>
      <Button innerText="1" sharedCallback={props.sharedCallback} />
      <Button innerText="2" sharedCallback={props.sharedCallback} />
      <Button innerText="3" sharedCallback={props.sharedCallback} />
      <Button innerText="-" sharedCallback={props.sharedCallback} />
    </article>

    <article>
      <Button innerText="*" sharedCallback={props.sharedCallback} />
      <Button innerText="0" sharedCallback={props.sharedCallback} />
      <Button innerText="%" sharedCallback={props.sharedCallback} />
      <Button innerText="=" sharedCallback={props.sharedCallback} />
    </article>
  </section>
)

export default Keypad;
