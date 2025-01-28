import style from './DestinationSideBar.module.scss'
export const DestinationSideBar = ({children}) => {
  return (
    <section className={style.sideBar}>
        {children}
    </section>
  )
}