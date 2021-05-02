const Promotion = props => {
  return (
    <div className="profilePromotion">
      <span className="profilePromotion title">{props.title}</span>
      <span className="profilePromotion slogan">{props.slogan}</span>
      <a className="profilePromotion url" href={props.href}>{props.innerText}</a>
    </div>
  )
}

export default Promotion;
