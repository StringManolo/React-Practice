const Button = props => (
  <button type="button" onClick={props.sharedCallback}>{props.innerText}</button>
)

export default Button;
