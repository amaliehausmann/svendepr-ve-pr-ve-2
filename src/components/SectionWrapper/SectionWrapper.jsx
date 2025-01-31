import style from './SectionWrapper.module.scss'

export const SectionWrapper = ({children, customStyling, customStyling2}) => {
  return (
    <section className={`${style.sectionStyling} ${style[customStyling]} ${style[customStyling2]}`}>{children}</section>
  )
}