import style from './Card.module.scss'

export const Card = ({image, title, description, children, custom, action}) => {
  return (
    <div onClick={action} className={`${style.cardStyling} ${style[custom]}`}>
        <img src={`${image}`} alt="" />
        <h3>{title}</h3>
        <p>{description}</p>
        {children}
    </div>
  )
}